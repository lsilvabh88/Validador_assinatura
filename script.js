document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validation-form');
    const urlInput = document.getElementById('urlDocumento');
    const validateBtn = document.getElementById('validate-btn');
    const loadingState = document.getElementById('loading-state');
    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('result-text');
    const pdfPanel = document.getElementById('pdf-panel');
    const pdfFrame = document.getElementById('pdf-frame');
    const pdfLoading = document.getElementById('pdf-loading');
    const mainEl = document.querySelector('main');

    async function fetchWithRetry(url, options, maxRetries = 3) {
        let attempt = 1;
        while (attempt <= maxRetries) {
            if (attempt > 1) {
                loadingState.innerHTML = `<div class="spinner"></div> Consultando servidor do governo... Tentativa ${attempt}/${maxRetries}`;
            } else {
                loadingState.innerHTML = `<div class="spinner"></div> Consultando servidor do governo...`;
            }
            
            try {
                const response = await fetch(url, options);
                
                // Se o status for de sucesso ou um erro não retentável (ex: 400 Bad Request)
                if (response.ok || (response.status !== 408 && response.status < 500)) {
                    const data = await response.json();
                    return { response, data };
                }
                
                if (attempt === maxRetries) {
                    return { customError: "Os servidores estão ocupados, tente usar o ambiente do validar.iti diretamente." };
                }
            } catch (err) {
                if (attempt === maxRetries) {
                    return { customError: "Os servidores estão ocupados, tente usar o ambiente do validar.iti diretamente." };
                }
            }
            attempt++;
            await new Promise(r => setTimeout(r, 2000)); // Espera 2s antes de tentar novamente
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const urlValue = urlInput.value.trim();
        if (!urlValue) { showError('Por favor, insira uma URL válida do documento.'); return; }

        resultArea.className = 'result-area hidden';
        loadingState.classList.remove('hidden');
        validateBtn.disabled = true;

        try {
            const formData = new URLSearchParams();
            formData.append('urlDocumento', urlValue);

            const result = await fetchWithRetry(`${window.location.origin}/api/validar-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });

            if (result.customError) {
                showError('Falha na validação', result.customError);
                showPdf(urlValue);
                return;
            }

            const response = result.response;
            const data = result.data;

            if (response.ok && data.sucesso) {
                showResult(data);
                showPdf(urlValue);
            } else {
                showError(data.error || 'Erro desconhecido.', data.dica || '');
                showPdf(urlValue); // Mostra o HTML/Iframe de qualquer jeito para o usuário baixar o PDF
                
                // Adiciona botão para validar por arquivo localmente
                resultText.innerHTML += `
                    <div style="margin-top: 15px; text-align: center;">
                        <button type="button" onclick="document.getElementById('fileUpload').click()" style="display: inline-block; background: #2a9fd6; color: #fff; padding: 10px 15px; text-decoration: none; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">Validar documento por upload de arquivo</button>
                    </div>
                `;
            }
        } catch (err) {
            showError('Não foi possível obter resposta da validação.', 'Verifique se a URL do documento é válida, acessível e se o servidor local e o portal do ITI estão respondendo.');
            showPdf(urlValue); // Mostra o iframe também em caso de falha de rede
            
            resultText.innerHTML += `
                <div style="margin-top: 15px; text-align: center;">
                    <button type="button" onclick="document.getElementById('fileUpload').click()" style="display: inline-block; background: #2a9fd6; color: #fff; padding: 10px 15px; text-decoration: none; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">Validar documento por upload de arquivo</button>
                </div>
            `;
            console.error(err);
        } finally {
            loadingState.classList.add('hidden');
            validateBtn.disabled = false;
        }
    });

    // ── Extrai CN= de uma string Distinguished Name ───────────────────────────
    // "CN=NOME DO PROFISSIONAL:08121742676, OU=..." → "NOME DO PROFISSIONAL"
    function extractCN(dn) {
        if (!dn || typeof dn !== 'string') return '';
        const m = dn.match(/(?:^|,\s*)CN=([^,]+)/i);
        if (!m) return '';
        return m[1].split(':')[0].split(';')[0].trim();
    }

    // ── Extrai CPF mascarado ou completo de qualquer string ───────────────────
    function extractCPF(dn) {
        if (!dn || typeof dn !== 'string') return '';
        const m = dn.match(/\*{3}\.\d{3}\.\d{3}-\*{2}|\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}/);
        return m ? m[0] : '';
    }

    function formatNow() {
        const d = new Date();
        return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR');
    }

    function showResult(data) {
        resultArea.classList.remove('hidden');

        // ── Ícones SVG (sem emoji) ────────────────────────────────────────────
        const ICON_OK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="vertical-align:middle;display:inline-block;flex-shrink:0"><circle cx="8" cy="8" r="8" fill="#16a34a"/><path d="M4.5 8.2l2.3 2.4 4.7-4.8" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const ICON_WARN = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="vertical-align:middle;display:inline-block;flex-shrink:0"><path d="M8 1.5L14.9 13.5H1.1L8 1.5z" fill="#f59e0b"/><rect x="7.2" y="6" width="1.6" height="4" rx="0.8" fill="white"/><rect x="7.2" y="11" width="1.6" height="1.6" rx="0.8" fill="white"/></svg>`;

        // O ITI retorna:
        //   data.bruto  → JSON bruto do /url (estrutura complexa)
        //   data.tratado → JSON processado do /simples (estrutura limpa)
        const t = data.tratado;  // preferimos o tratado — campos diretos
        const b = data.bruto;

        // ── Campos do arquivo (vêm do JSON tratado) ───────────────────────────
        const nomeArquivo = (t && t.nomeArquivo) || (b && b.fileName) || '';
        const hash = (t && t.hash) || (b && b.document && b.document.hash) || '';
        const dataValidacao = (t && t.dataValidacao) || formatNow();

        // ── Array de assinaturas ──────────────────────────────────────────────
        // No JSON tratado (/simples): t.assinaturas → [{nome, cpf, data, numSerial, status, certificadora}]
        let assinaturas = [];
        if (t && Array.isArray(t.assinaturas) && t.assinaturas.length > 0) {
            assinaturas = t.assinaturas;
        } else if (b) {
            assinaturas = findSignatures(b);
        }

        const todasAprovadas = assinaturas.length > 0 && assinaturas.every(s => isApproved(s));

        resultArea.classList.add(todasAprovadas ? 'success' : (assinaturas.length > 0 ? 'warning' : 'success'));

        let html = `<div class="res-header ${todasAprovadas ? 'success-header' : 'warn-header'}" style="display:flex;align-items:center;gap:6px;">
            ${todasAprovadas ? ICON_OK : ICON_WARN} Validação concluída pelo ITI
        </div>`;

        // ── Seção 1: Arquivo ──────────────────────────────────────────────────
        if (nomeArquivo || hash || dataValidacao) {
            html += `<div class="res-section">
                <div class="sec-title">Informações gerais do arquivo</div>
                <div class="info-grid">
                    ${nomeArquivo ? `<div class="info-row"><span class="info-key">Nome do arquivo</span><span class="info-val link-style">${esc(nomeArquivo)}</span></div>` : ''}
                    ${hash ? `<div class="info-row"><span class="info-key">Hash</span><span class="info-val mono">${esc(hash)}</span></div>` : ''}
                    ${dataValidacao ? `<div class="info-row"><span class="info-key">Data da validação</span><span class="info-val">${esc(dataValidacao)}</span></div>` : ''}
                </div>
            </div>`;
        }

        // ── Seção 2: Assinaturas ──────────────────────────────────────────────
        assinaturas.forEach((sig, idx) => {
            const aprovada = isApproved(sig);

            // Campos EXATOS do JSON /simples do ITI
            const assinadoPor = sig.nome || sig.subjectName || sig.signerName ||
                sig.commonName || sig.titular ||
                extractCN(sig.assinante) || extractCN(sig.subjectDN) ||
                sig.name || '';

            const cpf = sig.cpf || sig.signerCpf ||
                extractCPF(sig.assinante) || extractCPF(sig.subjectDN) || '';

            const serieCert = sig.numSerial || sig.serialNumber || sig.certSerialNumber ||
                sig.serie || sig.issuerSerial || '';

            const dataAss = sig.data || sig.dataAssinatura || sig.signingTime ||
                sig.sigDate || sig.signDate || '';

            const status = sig.status || sig.statusAssinatura || sig.signatureStatus ||
                sig.resultado || sig.indication || '';

            const certificadora = sig.certificadora || sig.tipoAssinatura || sig.signatureType ||
                sig.type || '';

            html += `<div class="res-section">
                <div class="sec-title" style="display:flex;align-items:center;gap:6px;">${aprovada ? ICON_OK : ICON_WARN} Informações da Assinatura${assinaturas.length > 1 ? ` #${idx + 1}` : ''}</div>
                <div class="sig-layout">
                    <div class="info-grid">
                        ${assinadoPor ? `<div class="info-row"><span class="info-key">Assinado por</span><span class="info-val bold link-style">${esc(assinadoPor)}</span></div>` : ''}
                        ${cpf ? `<div class="info-row"><span class="info-key">CPF</span><span class="info-val">${esc(cpf)}</span></div>` : ''}
                        ${serieCert ? `<div class="info-row"><span class="info-key">Nº de série do certificado</span><span class="info-val mono link-style">${esc(serieCert)}</span></div>` : ''}
                        ${dataAss ? `<div class="info-row"><span class="info-key">Data da assinatura</span><span class="info-val link-style">${esc(dataAss)}</span></div>` : ''}
                        ${certificadora ? `<div class="info-row"><span class="info-key">Certificadora</span><span class="info-val">${esc(certificadora)}</span></div>` : ''}
                    </div>
                </div>
                <div class="badge-img-container" style="text-align:center; margin-top: 1rem; width: 100%;">
                    <img src="${checkQualificada(b, idx) ? 'media/Assinatura_Qualificada.png' : 'media/Assinatura_Avancada.png'}" alt="Selo de Assinatura" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">
                </div>
                ${status ? `<div class="status-line ${aprovada ? 'status-ok' : 'status-warn'}">${esc(status)}</div>` : ''}
            </div>`;
        });

        if (assinaturas.length === 0) {
            const raw = JSON.stringify(t || b, null, 2);
            html += `<div class="res-section">
                <div class="sec-title">📋 Dados retornados (debug)</div>
                <pre class="pre-result">${esc(raw.substring(0, 4000))}</pre>
            </div>`;
        }

        resultText.innerHTML = html;
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Verifica se a assinatura é Qualificada (ICP-Brasil) ou Avançada
    function checkQualificada(bruto, idx) {
        if (!bruto) return false;
        try {
            const b0 = Array.isArray(bruto) ? bruto[0] : bruto;
            const sigs = b0?.verifierReport?.signatures?.signature;
            if (!sigs) return false;
            
            const sigRaw = Array.isArray(sigs) ? sigs[idx] : sigs;
            if (!sigRaw) return false;
            
            const signer = sigRaw?.certification?.signer;
            if (!signer) return false;
            
            const certs = signer?.certificates?.certificate;
            const cert0 = Array.isArray(certs) ? certs[0] : certs;
            if (!cert0) return false;
            
            const subjectName = cert0.subjectName || '';
            const isICP = subjectName.includes('O=ICP-Brasil');
            const isValidPath = signer?.certPathValidity?.result === 'SUCCESS';
            const isValidSig = cert0.validSignature === true;
            
            return isICP && isValidPath && isValidSig;
        } catch(e) {
            return false;
        }
    }

    // Busca recursivamente arrays de assinaturas (fallback para JSON bruto)
    function findSignatures(obj, depth = 0) {
        if (!obj || depth > 5) return [];
        if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object') {
            const keys = Object.keys(obj[0]).map(k => k.toLowerCase());
            if (keys.some(k => ['nome', 'cpf', 'serial', 'status', 'nome', 'subjectname', 'signingtime', 'numserial'].includes(k))) {
                return obj;
            }
        }
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            for (const key of Object.keys(obj)) {
                const found = findSignatures(obj[key], depth + 1);
                if (found.length > 0) return found;
            }
        }
        return [];
    }

    function isApproved(sig) {
        if (!sig) return false;
        const s = (sig.status || sig.statusAssinatura || sig.signatureStatus ||
            sig.resultado || sig.indication || '').toString().toLowerCase();
        return s.includes('aprovad') || s.includes('valid') ||
            s.includes('passed') || s.includes('ok') || s === 'approved';
    }

    function formatNow() {
        return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) + ' BRT';
    }

    function showError(message, dica = '') {
        resultArea.classList.remove('hidden');
        resultArea.classList.add('error');
        resultText.innerHTML = `
            <div class="res-header error-header">❌ Erro na validação</div>
            <div class="res-section">
                <p>${esc(message)}</p>
                ${dica ? `<p style="margin-top:.75rem;font-size:.85rem;color:#92400e;background:rgba(245,158,11,.1);padding:.6rem .9rem;border-radius:8px;">💡 ${esc(dica)}</p>` : ''}
            </div>`;
    }

    function esc(str) {
        if (typeof str !== 'string') return String(str ?? '');
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ── Exibe o PDF original no painel lateral ───────────────────────────────
    function showPdf(url) {
        mainEl.classList.add('split-view');
        pdfPanel.classList.add('visible');

        pdfLoading.style.display = 'flex';
        pdfFrame.style.display = 'none';
        pdfFrame.src = '';

        const proxyUrl = `${window.location.origin}/api/pdf-proxy?url=${encodeURIComponent(url)}`;
        pdfFrame.src = proxyUrl;

        pdfFrame.onload = () => {
            pdfLoading.style.display = 'none';
            pdfFrame.style.display = 'block';
        };

        pdfFrame.onerror = () => {
            pdfLoading.innerHTML = '<p style="color:#9b1c1c;text-align:center;font-size:.85rem;">Não foi possível exibir o documento.<br>Verifique se a URL é acessível.</p>';
        };
    }
    
    // ── Exibe o PDF através de um arquivo local ───────────────────────────────
    function showPdfFile(file) {
        // Apenas renderiza se for um PDF
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            mainEl.classList.remove('split-view');
            pdfPanel.classList.remove('visible');
            return;
        }
        
        mainEl.classList.add('split-view');
        pdfPanel.classList.add('visible');
        
        pdfLoading.style.display = 'none';
        pdfFrame.style.display = 'block';
        
        const objectUrl = URL.createObjectURL(file);
        pdfFrame.src = objectUrl;
    }

    // ── Lógica para Validação por Upload de Arquivo ─────────────────────────
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Reset UI
            resultArea.classList.add('hidden');
            resultArea.classList.remove('error');
            loadingState.classList.remove('hidden');
            mainEl.classList.remove('split-view');
            pdfPanel.classList.remove('visible');

            const formData = new FormData();
            formData.append('file', file);

            try {
                const result = await fetchWithRetry('/api/validar-arquivo', {
                    method: 'POST',
                    body: formData
                });
                
                if (result.customError) {
                    showError('Falha na validação', result.customError);
                    return;
                }

                const response = result.response;
                const data = result.data;
                if (response.ok && data.sucesso) {
                    showResult(data);
                    showPdfFile(file); // Mostra o PDF do arquivo local no iframe
                } else {
                    showError(data.error || 'Erro desconhecido ao validar arquivo.', '');
                }
            } catch (err) {
                showError('Falha ao enviar arquivo para validação.', 'Verifique a conexão com o servidor.');
                console.error(err);
            } finally {
                loadingState.classList.add('hidden');
                fileUpload.value = ''; // reseta o input
            }
        });
    }

});
