/*Criação do componente acesso rápido*/

function createFastAcess() {
    const fastAcess = document.createElement('fastAcess');
    fastAcess.classList.add('fastAcess');
    fastAcess.innerHTML = ` <section id="fastAcess">
    <div class="fA">
    <p class="lines branco" id="acessorap">ACESSO RÁPIDO</p>
    <div class="acessoRapido">
        <a href="./index.html" class="aNoStyle">
        <div class="br-card buttonMain hover" id="cardundefined">
            <div class="card-content">
            Validar
            </div>
        </div>
        </a>
        <a href="./sobre.html" class="aNoStyle">
        <div class="br-card buttonMain hover" id="cardundefined2">
            <div class="card-content"><label id="bsobre">
            Sobre
            </label>
            </div>
        </div>
        </a>
        <a href="./duvidas.html" class="aNoStyle">
        <div class="br-card buttonMain hover" id="cardundefined3">
            <div class="card-content"><label id="bduvi">
            Dúvidas
            </label>
            </div>
        </div>
        </a>
        <a href="./informacoes.html" class="aNoStyle">
        <div class="br-card buttonMain hover" id="cardundefined4">
            <div class="card-content"><label id="bdocu">
            Informações
            </label>
            </div>
        </div>
        </a>
        <a href="./fale-conosco.html" class="aNoStyle">
        <div class="br-card buttonMain hover" id="cardundefined4">
            <div class="card-content"><label id="bmail">
            Fale Conosco
            </label>
            </div>
        </div>
        </a>
    </div>
    </div>
    </section>
    `;
    return fastAcess;
}

function init() {
    const fastAcessContainer = document.body;
    if (fastAcessContainer) {
        const fastAcess = createFastAcess();
        fastAcessContainer.appendChild(fastAcess);
    }
}

document.addEventListener('DOMContentLoaded', init);