from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# ── Endpoints reais do ITI (descobertos via engenharia reversa do portal) ──────
# Se o portal mudar, ajuste estes valores:
ITI_BASE         = 'https://validar.iti.gov.br/'
ITI_VALIDAR_URL  = 'https://validar.iti.gov.br/url'         # Valida via URL (JSON)
ITI_REL_SIMPLES  = 'https://validar.iti.gov.br/simples'     # Processa JSON bruto → relatório
ITI_TIMEOUT      = 120                                      # Timeout de espera pelo servidor do governo (segundos)

BASE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://validar.iti.gov.br/',
    'Origin': 'https://validar.iti.gov.br',
    'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


PDF_CACHE = {}  # url -> (bytes, filename)


import re
import os
from urllib.parse import urlparse

def extrair_nome_arquivo(resp, url):
    """Extrai o nome do arquivo a partir de Content-Disposition ou da URL."""
    cd = resp.headers.get('Content-Disposition', '')
    if 'filename=' in cd:
        m = re.search(r'filename=["\']?([^"\';]+)["\']?', cd, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    path = urlparse(url).path
    base = os.path.basename(path)
    if base and '.' in base:
        return base
    return 'documento.pdf'


def classificar_erro_requisicao(url, exc=None, status_code=None):
    """Gera diagnóstico amigável quando a URL fornecida estiver indisponível ou quebrada."""
    try:
        parsed = urlparse(url)
        dominio = parsed.netloc or url
    except Exception:
        dominio = url

    if status_code:
        if status_code == 404:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 404,
                'titulo': 'Documento ou Portal Não Encontrado (Erro 404)',
                'motivo': f'O servidor de destino ({dominio}) respondeu que o documento ou página não foi encontrado.',
                'dica': 'Certifique-se de que a URL e o endereço estão corretos ou se o link expirou no prestador.',
                'url': url
            }
        elif status_code in (500, 502, 503, 504):
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': status_code,
                'titulo': 'Portal Externo Apresentando Indisponibilidade',
                'motivo': f'O portal externo do prestador ({dominio}) está com instabilidade temporária ou fora do ar (Código HTTP {status_code}).',
                'dica': 'O servidor do prestador externo pode estar em manutenção momentânea.',
                'url': url
            }
        elif status_code in (401, 403):
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': status_code,
                'titulo': 'Acesso Restrito ao Documento',
                'motivo': f'O portal externo ({dominio}) exigiu autenticação ou bloqueou o acesso direto (Código HTTP {status_code}).',
                'dica': 'O documento pode exigir login ou credenciais específicas no portal do prestador.',
                'url': url
            }

    if exc:
        exc_str = str(exc).lower()
        if (
            'nameresolutionerror' in exc_str
            or 'getaddrinfo failed' in exc_str
            or 'errno 11001' in exc_str
            or 'name or service not known' in exc_str
            or 'errno -2' in exc_str
            or 'failed to resolve' in exc_str
            or isinstance(exc, requests.exceptions.ConnectionError)
        ):
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'DNS_ERROR',
                'titulo': 'Portal Externo Indisponível ou Endereço Incorreto',
                'motivo': f'Não foi possível localizar o servidor de "{dominio}". O portal externo do prestador pode estar fora do ar ou o endereço informado está incorreto.',
                'dica': 'Certifique-se de que a URL e o endereço estão corretos ou se o Portal Externo do Prestador está apresentando indisponibilidade.',
                'url': url
            }
        elif isinstance(exc, requests.exceptions.Timeout) or 'timed out' in exc_str:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'TIMEOUT',
                'titulo': 'Tempo Limite de Conexão Excedido',
                'motivo': f'O portal externo ({dominio}) demorou muito para responder e a conexão expirou por tempo limite.',
                'dica': 'O servidor do prestador pode estar sobrecarregado ou inacessível no momento.',
                'url': url
            }
        elif isinstance(exc, requests.exceptions.SSLError) or 'ssl' in exc_str:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'SSL_ERROR',
                'titulo': 'Falha de Certificado de Segurança SSL',
                'motivo': f'O certificado de segurança HTTPS do portal ({dominio}) é inválido ou expirou.',
                'dica': 'O portal externo do prestador requer atualização de seu certificado digital de segurança.',
                'url': url
            }
        elif 'connection refused' in exc_str:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'CONN_REFUSED',
                'titulo': 'Conexão Recusada pelo Servidor do Prestador',
                'motivo': f'O servidor externo ({dominio}) recusou ativamente a tentativa de conexão.',
                'dica': 'O portal pode estar desligado ou bloqueando acessos automáticos.',
                'url': url
            }
        else:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'CONN_ERROR',
                'titulo': 'Falha de Conexão com o Portal Externo',
                'motivo': f'Não foi possível estabelecer comunicação com o endereço informado ({dominio}).',
                'dica': 'Verifique se a URL e o endereço estão corretos ou se o Portal Externo do Prestador está apresentando indisponibilidade.',
                'url': url
            }

    return {
        'tipo': 'indisponivel',
        'urlIndisponivel': True,
        'codigo': 'UNKNOWN',
        'titulo': 'Portal Externo Indisponível ou Endereço Incorreto',
        'motivo': f'Não foi possível carregar o endereço informado ({dominio}).',
        'dica': 'Certifique-se de que a URL e o endereço estão corretos ou se o Portal Externo do Prestador está apresentando indisponibilidade.',
        'url': url
    }


def inspecionar_e_baixar_documento(url):
    """
    Inspeciona a URL fornecida:
    - Valida formato e conectividade da URL informada.
    - Se o servidor estiver indisponível, quebrado, com erro de DNS, timeout ou HTTP >= 400:
      retorna diagnóstico estruturado com urlIndisponivel = True.
    - Se for página HTML (portal externo, ex: Memed), identifica como Método 2.
    - Se for PDF (direto ou download automático, ex: Green Sem Papel, SoulMV PBH),
      baixa o PDF em memória para validação transparente imediata no ITI via /arquivo.
    """
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ('http', 'https') or not parsed.netloc:
            return {
                'tipo': 'indisponivel',
                'urlIndisponivel': True,
                'codigo': 'INVALID_URL',
                'titulo': 'Endereço URL Inválido',
                'motivo': 'O endereço informado não possui um formato web válido (deve iniciar com http:// ou https://).',
                'dica': 'Certifique-se de que o link foi copiado por completo.',
                'url': url
            }
    except Exception:
        return {
            'tipo': 'indisponivel',
            'urlIndisponivel': True,
            'codigo': 'INVALID_URL',
            'titulo': 'Endereço URL Inválido',
            'motivo': 'O endereço informado não pôde ser interpretado como uma URL válida.',
            'dica': 'Verifique o endereço copiado da receita ou QR-Code.',
            'url': url
        }

    session = requests.Session()
    session.headers.update(BASE_HEADERS)

    # Faz GET com stream=True para checar conectividade e cabeçalhos
    try:
        r = session.get(url, stream=True, timeout=20, allow_redirects=True)
    except requests.exceptions.SSLError:
        try:
            r = session.get(url, stream=True, timeout=20, allow_redirects=True, verify=False)
        except Exception as e:
            return classificar_erro_requisicao(url, exc=e)
    except Exception as e:
        return classificar_erro_requisicao(url, exc=e)

    # Checa status HTTP retornado pelo servidor do prestador
    if r.status_code >= 400:
        r.close()
        return classificar_erro_requisicao(url, status_code=r.status_code)

    ct = r.headers.get('Content-Type', '').lower()
    cd = r.headers.get('Content-Disposition', '').lower()

    # Se for expressamente uma página HTML e não indicar arquivo PDF em anexo
    if 'text/html' in ct and not ('.pdf' in cd or 'application/pdf' in ct):
        r.close()
        return {'tipo': 'html', 'metodo': 2, 'contentType': ct, 'url': url}

    # Lê os chunks para validar o conteúdo
    chunks = []
    total_len = 0
    try:
        for chunk in r.iter_content(chunk_size=8192):
            if chunk:
                chunks.append(chunk)
                total_len += len(chunk)
                if total_len > 50 * 1024 * 1024:  # Limite de segurança: 50MB
                    break
    except Exception as e:
        r.close()
        return classificar_erro_requisicao(url, exc=e)
    finally:
        r.close()

    total_bytes = b''.join(chunks)

    is_pdf = ('application/pdf' in ct) or ('.pdf' in cd) or (b'%PDF-' in total_bytes[:1024])

    if is_pdf:
        filename = extrair_nome_arquivo(r, url)
        if len(PDF_CACHE) > 50:
            PDF_CACHE.clear()
        PDF_CACHE[url] = (total_bytes, filename)
        return {
            'tipo': 'pdf',
            'metodo': 1,
            'content': total_bytes,
            'filename': filename,
            'contentType': 'application/pdf',
            'url': url
        }
    else:
        return {'tipo': 'html', 'metodo': 2, 'contentType': ct, 'url': url}


@app.route('/api/verificar-tipo-url', methods=['POST'])
def verificar_tipo_url():
    """Endpoint rápido para direcionar ao Método 1 ou Método 2 antes do ITI."""
    url_documento = request.form.get('urlDocumento', '').strip()
    if not url_documento:
        return jsonify({'error': 'URL não informada'}), 400

    info = inspecionar_e_baixar_documento(url_documento)
    if info.get('urlIndisponivel'):
        return jsonify({
            'sucesso': False,
            'urlIndisponivel': True,
            'url': url_documento,
            'tipo': 'indisponivel',
            'titulo': info.get('titulo'),
            'error': info.get('motivo'),
            'dica': info.get('dica'),
            'codigo': info.get('codigo')
        }), 200

    return jsonify({
        'sucesso': True,
        'url': url_documento,
        'tipo': info.get('tipo'),
        'metodo': info.get('metodo'),
        'contentType': info.get('contentType')
    }), 200


@app.route('/api/validar-url', methods=['POST'])
def validar_url():
    url_documento = request.form.get('urlDocumento', '').strip()
    if not url_documento:
        return jsonify({'error': 'URL não informada'}), 400

    try:
        doc_info = inspecionar_e_baixar_documento(url_documento)
    except Exception as e:
        app.logger.error(f"Erro ao acessar URL do documento: {e}")
        doc_info = classificar_erro_requisicao(url_documento, exc=e)

    # ════════════════════════════════════════════════════════════════
    # URL QUEBRADA OU PORTAL DO PRESTADOR INDISPONÍVEL
    # ════════════════════════════════════════════════════════════════
    if doc_info.get('urlIndisponivel'):
        return jsonify({
            'sucesso': False,
            'urlIndisponivel': True,
            'url': url_documento,
            'titulo': doc_info.get('titulo', 'Portal Externo Indisponível ou Endereço Incorreto'),
            'error': doc_info.get('motivo'),
            'dica': doc_info.get('dica'),
            'codigo': doc_info.get('codigo')
        }), 200

    # ════════════════════════════════════════════════════════════════
    # MÉTODO 2: Página HTML externa (portal de prestador)
    # ════════════════════════════════════════════════════════════════
    if doc_info.get('tipo') == 'html':
        return jsonify({
            'sucesso': False,
            'isHtml': True,
            'metodo': 2,
            'error': 'A URL informada direciona para uma página HTML externa e não diretamente para um PDF.',
            'dica': 'Baixe o documento PDF através da página exibida ao lado e faça o upload para validar a assinatura.'
        }), 200

    # ════════════════════════════════════════════════════════════════
    # MÉTODO 1: URL com download automático de PDF (ex: Green, SoulMV, etc.)
    # Baixa e envia os bytes para o endpoint /arquivo do ITI de forma transparente!
    # ════════════════════════════════════════════════════════════════
    pdf_bytes = doc_info['content']
    filename = doc_info.get('filename', 'documento.pdf')

    try:
        session = requests.Session()
        session.headers.update(BASE_HEADERS)
        session.get(ITI_BASE, timeout=15)

        files = {
            'signature_files[]': (filename, pdf_bytes, 'application/pdf')
        }

        r1 = session.post(
            ITI_BASE + 'arquivo',
            files=files,
            timeout=ITI_TIMEOUT
        )

        if r1.status_code == 400:
            return jsonify({'error': 'Documento sem assinatura reconhecível ou com assinatura corrompida.'}), 400
        if r1.status_code != 200:
            return jsonify({'error': f'O servidor do ITI retornou erro {r1.status_code} ao processar o arquivo.'}), r1.status_code

        bruto_json = r1.json()

        headers_json = {
            **BASE_HEADERS,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }
        r2 = session.post(ITI_REL_SIMPLES, headers=headers_json, json=bruto_json, timeout=ITI_TIMEOUT)

        if r2.status_code == 200:
            return jsonify({
                'sucesso': True,
                'metodo': 1,
                'tipo': 'pdf',
                'bruto': bruto_json,
                'tratado': r2.json()
            }), 200
        else:
            return jsonify({
                'sucesso': True,
                'metodo': 1,
                'tipo': 'pdf',
                'bruto': bruto_json,
                'tratado': None
            }), 200

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Tempo de resposta excedido ao consultar o portal ITI (timeout).'}), 408
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Erro de rede ao conectar ao ITI.', 'details': str(e)}), 503
    except Exception as e:
        return jsonify({'error': f'Erro ao validar no servidor do ITI: {str(e)}'}), 500


@app.route('/api/debug', methods=['POST'])
def debug_json():
    """Retorna o JSON bruto completo do ITI para inspecionar os campos."""
    url_documento = request.form.get('urlDocumento')
    if not url_documento:
        return jsonify({'error': 'URL não informada'}), 400
    try:
        session = requests.Session()
        session.headers.update(BASE_HEADERS)
        session.get(ITI_BASE, timeout=15)

        headers_json = {**BASE_HEADERS,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
        }
        r1 = session.post(ITI_VALIDAR_URL, headers=headers_json, json={'url': url_documento}, timeout=ITI_TIMEOUT)
        bruto = r1.json() if r1.ok else {'status': r1.status_code, 'body': r1.text[:500]}

        tratado = None
        if r1.ok:
            r2 = session.post(ITI_REL_SIMPLES, headers=headers_json, json=bruto, timeout=ITI_TIMEOUT)
            tratado = r2.json() if r2.ok else {'status': r2.status_code, 'body': r2.text[:500]}

        return jsonify({'bruto': bruto, 'tratado': tratado}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/api/validar-arquivo', methods=['POST'])
def validar_arquivo():
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo recebido no servidor local'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Arquivo sem nome'}), 400

    try:
        # 1: Sessão e headers
        session = requests.Session()
        session.headers.update(BASE_HEADERS)
        session.get(ITI_BASE, timeout=15)

        # 2: Envia o arquivo para /arquivo
        files = {
            'signature_files[]': (file.filename, file.read(), file.content_type)
        }
        
        r1 = session.post(
            ITI_BASE + 'arquivo',
            files=files,
            timeout=ITI_TIMEOUT
        )

        if r1.status_code == 400:
            return jsonify({'error': 'Documento sem assinatura reconhecível ou com assinatura corrompida.'}), 400
        if r1.status_code != 200:
            return jsonify({'error': f'O servidor do ITI retornou erro {r1.status_code} ao processar o arquivo.'}), r1.status_code

        bruto_json = r1.json()

        # 3: Pede o relatório final em /simples
        headers_json = {**BASE_HEADERS, 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}
        r2 = session.post(ITI_REL_SIMPLES, headers=headers_json, json=bruto_json, timeout=ITI_TIMEOUT)
        
        if r2.status_code == 200:
            return jsonify({
                'sucesso': True,
                'bruto': bruto_json,
                'tratado': r2.json()
            })
        else:
            return jsonify({'error': f'Falha ao gerar relatório (HTTP {r2.status_code})'}), 500

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Tempo de resposta excedido ao consultar o portal ITI.'}), 408
    except Exception as e:
        return jsonify({'error': f'Erro inesperado no servidor local: {str(e)}'}), 500

@app.route('/api/pdf-proxy')
def pdf_proxy():
    """Busca o PDF da URL original e serve inline (sem forçar download)."""
    from flask import Response
    url_doc = request.args.get('url', '').strip()
    if not url_doc:
        return jsonify({'error': 'Parâmetro url ausente'}), 400

    tipo = request.args.get('tipo', '').strip().lower()
    if tipo == 'html':
        from flask import redirect
        return redirect(url_doc, code=302)

    # 1. Se o PDF já foi baixado em memória durante a validação transparente, serve de imediato!
    if url_doc in PDF_CACHE:
        cached_content, cached_filename = PDF_CACHE[url_doc]
        response = Response(cached_content, status=200, content_type='application/pdf')
        response.headers['Content-Disposition'] = f'inline; filename="{cached_filename}"'
        return response

    try:
        session = requests.Session()
        session.headers.update(BASE_HEADERS)
        try:
            r = session.get(url_doc, timeout=30, stream=True)
        except requests.exceptions.SSLError:
            r = session.get(url_doc, timeout=30, stream=True, verify=False)

        content_type = r.headers.get('Content-Type', '')
        if 'html' in content_type.lower():
            from flask import redirect
            return redirect(url_doc, code=302)

        if 'pdf' not in content_type.lower() and 'image' not in content_type.lower():
            content_type = 'application/pdf'

        response = Response(
            r.iter_content(chunk_size=8192),
            status=r.status_code,
            content_type=content_type,
        )
        response.headers['Content-Disposition'] = 'inline'
        return response

    except requests.exceptions.Timeout:
        return Response(
            '<div style="font-family:sans-serif;padding:30px;text-align:center;color:#991b1b;background:#fef2f2;border-radius:8px;margin:20px;">'
            '<h3 style="margin-bottom:8px;">Tempo Limite Excedido</h3>'
            '<p style="font-size:14px;color:#7f1d1d;">O portal externo do prestador demorou muito para responder.</p>'
            '</div>',
            status=504,
            content_type='text/html'
        )
    except Exception as e:
        return Response(
            f'<div style="font-family:sans-serif;padding:30px;text-align:center;color:#991b1b;background:#fef2f2;border-radius:8px;margin:20px;">'
            f'<h3 style="margin-bottom:8px;">Não foi possível carregar a visualização</h3>'
            f'<p style="font-size:14px;color:#7f1d1d;">Falha ao conectar ao endereço do prestador externo.</p>'
            f'</div>',
            status=502,
            content_type='text/html'
        )


if __name__ == '__main__':
    import socket
    import sys
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass
    try:
        ip = socket.gethostbyname(socket.gethostname())
    except Exception:
        ip = '127.0.0.1'
    print(f"\n[+] Servidor rodando! Acesse de outros micros da rede:")
    print(f"    -> http://{ip}:5000\n")
    print(f"    -> http://localhost:5000\n")
    app.run(host='0.0.0.0', debug=True, port=5000)