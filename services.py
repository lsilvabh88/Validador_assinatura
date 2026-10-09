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

BASE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://validar.iti.gov.br/',
    'Origin': 'https://validar.iti.gov.br',
    'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/api/validar-url', methods=['POST'])
def validar_url():
    url_documento = request.form.get('urlDocumento')
    if not url_documento:
        return jsonify({'error': 'URL não informada'}), 400

    try:
        # ── Passo 0: Cria sessão para obter cookies do portal ITI ──────────────
        session = requests.Session()
        session.headers.update(BASE_HEADERS)

        # Faz GET na página principal para pegar cookies de sessão (necessário para o ITI aceitar a requisição)
        session.get(ITI_BASE, timeout=15)

        # ── Passo 1: Envia a URL para o endpoint /url do ITI ──────────────────
        headers_json = {**BASE_HEADERS,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
        }

        r1 = session.post(
            ITI_VALIDAR_URL,
            headers=headers_json,
            json={'url': url_documento},
            timeout=40
        )

        app.logger.info(f"ITI /url status: {r1.status_code}, body: {r1.text[:300]}")

        # Trata erros HTTP conhecidos do ITI
        if r1.status_code == 415:
            return jsonify({'error': 'Não foi possível baixar o arquivo da URL fornecida. Verifique se a URL aponta diretamente para um PDF assinado.'}), 415
        if r1.status_code == 400:
            return jsonify({'error': 'Documento sem assinatura reconhecível ou com assinatura corrompida.'}), 400
        if r1.status_code == 422:
            return jsonify({'error': 'Documento inválido.'}), 422
        if r1.status_code == 500:
            return jsonify({
                'error': 'O servidor do ITI retornou erro interno (500). Possíveis causas: URL do documento inacessível ao servidor do governo, documento expirado ou formato não suportado.',
                'dica': 'Certifique-se de que a URL do documento está acessível publicamente na internet.'
            }), 500
        if not r1.ok:
            return jsonify({'error': f'Servidor ITI retornou erro: {r1.status_code}', 'details': r1.text[:300]}), r1.status_code

        json_bruto = r1.json()
        print("\n" + "="*60)
        print("JSON BRUTO do ITI (/url):")
        print(json.dumps(json_bruto, indent=2, ensure_ascii=False)[:5000])
        print("="*60 + "\n")

        # ── Passo 2: Envia JSON bruto para /simples para obter relatório tratado ──
        r2 = session.post(
            ITI_REL_SIMPLES,
            headers=headers_json,
            json=json_bruto,
            timeout=40
        )

        app.logger.info(f"ITI /simples status: {r2.status_code}")

        if r2.ok:
            json_tratado = r2.json()
            return jsonify({
                'sucesso': True,
                'bruto': json_bruto,
                'tratado': json_tratado
            }), 200
        else:
            # Retorna pelo menos o bruto se /simples falhar
            return jsonify({'sucesso': True, 'bruto': json_bruto, 'tratado': None}), 200

    except requests.exceptions.ConnectionError:
        return jsonify({'error': 'Sem conexão com o servidor do ITI. Verifique sua internet.'}), 503
    except requests.exceptions.Timeout:
        return jsonify({'error': 'O servidor do ITI demorou demais para responder. Tente novamente.'}), 408
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Erro de rede.', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Erro interno no servidor proxy.', 'details': str(e)}), 500


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
        r1 = session.post(ITI_VALIDAR_URL, headers=headers_json, json={'url': url_documento}, timeout=40)
        bruto = r1.json() if r1.ok else {'status': r1.status_code, 'body': r1.text[:500]}

        tratado = None
        if r1.ok:
            r2 = session.post(ITI_REL_SIMPLES, headers=headers_json, json=bruto, timeout=40)
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
            timeout=40
        )

        if r1.status_code == 400:
            return jsonify({'error': 'Documento sem assinatura reconhecível ou com assinatura corrompida.'}), 400
        if r1.status_code != 200:
            return jsonify({'error': f'O servidor do ITI retornou erro {r1.status_code} ao processar o arquivo.'}), r1.status_code

        bruto_json = r1.json()

        # 3: Pede o relatório final em /simples
        headers_json = {**BASE_HEADERS, 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}
        r2 = session.post(ITI_REL_SIMPLES, headers=headers_json, json=bruto_json, timeout=30)
        
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

    try:
        session = requests.Session()
        session.headers.update(BASE_HEADERS)
        r = session.get(url_doc, timeout=30, stream=True)

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
        return jsonify({'error': 'Timeout ao buscar o documento.'}), 408
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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