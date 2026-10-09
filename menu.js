function createMenu() {
  const menu = document.createElement("div");
  menu.classList.add("br-menu");
  menu.setAttribute("id", "main-navigation");
  menu.innerHTML = `
    <div class="row">
    <div class="br-menu" id="main-navigation">
      <div class="menu-container">
        <div class="menu-panel">
          <div class="menu-header">
            <div class="menu-title">
              <img src=" ./imagens/govbr.svg" alt="Imagem ilustrativa"/>
              <span class="branco">
                Instituto Nacional de Tecnologia da Informação
              </span>
            </div>
            <div class="menu-close">
              <button class="br-button circle" type="button" aria-label="Fechar o menu" data-dismiss="menu"><i class="fas fa-times branco" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <nav class="menu-body">
          <a class="menu-item divider" onclick="window.location.href='./sobre.html';">
              <span class="content branco" id="menul1" tabindex="0" aria-label="sobre">
                Sobre
              </span>
            </a>
            <div class="menu-folder">
              <a class="menu-item">
                <span id="menul2" class="content branco" tabindex="0" aria-label="Informações" onclick="window.location.href='informacoes.html';">
                  Informações
                </span>
              </a>
              <ul>
                <li>
                  <a class="menu-item" href="atualizacao.html">
                    <span class="content branco"  id="menul2a">
                      Atualizações no serviço
                    </span>
                  </a>
                </li>
                
                <li>
                  <a class="menu-item" href="./Docs/cartilha-de-uso.pdf" target="_blank">
                    <span class="content branco" id="menul2b">
                      Cartilha de uso
                    </span>
                  </a>
                </li>
                <li>
                  <a class="menu-item" href="https://www.gov.br/iti/pt-br/centrais-de-conteudo/glossario">
                    <span class="content branco" id="menul2c">
                      Glossário
                    </span>
                  </a>
                </li>
                <li>
                  <a class="menu-item" href="./duvidas.html">
                    <span class="content branco" id="menul2d">
                      Dúvidas
                    </span>
                  </a>
                </li>
                <li>
                  <a class="menu-item" href="guia.html">
                    <span class="content branco" id="menul2e">
                      Guia de boas práticas
                    </span>
                  </a>
                </li>
                <li>
                  <a class="menu-item" href="guia-desenvolvedor.html">
                    <span class="content branco" id="menul2f">
                      Orientações ao desenvolvedor
                    </span>
                  </a>
                </li>
                <li>
                <a class="menu-item" href="./glossarioRelatorioDeConformidade.html">
                  <span class="content branco" id="menul2g">
                    Glossário dos Resultados
                  </span>
                </a>
              </li>
              </ul>
            </div>
            <div class="menu-folder">
              <a class="menu-item">
                <span id="menul3" class="content branco" tabindex="0" aria-label="serviços" onclick="window.location.href='servicos.html';">
                  Serviços
                </span>
              </a>
              <ul>
                <li>
                  <a class="menu-item" href="https://assinador.iti.br">
                    <span class="content branco" id="menul3a">
                      Assinar eletronicamente
                    </span>
                  </a>
                </li>
                <li>
                  <a class="menu-item" href="index.html">
                    <span class="content branco" id="menul3b">
                      Validar assinatura
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <a class="menu-item divider" onclick="window.location.href='./fale-conosco.html';">
              <span class="content branco" aria-label="Fale conosco" tabindex="0" id="menul4">
                Fale conosco
              </span>
            </a>
          </nav>
          <div class="menu-footer">
            <div class="social-network">
              <div class="social-network-title branco" id="menul5">
                Redes Sociais
              </div>
              <div class="d-flex">
                <a class="br-button circle" href="https://www.facebook.com/itigovbr" aria-label="Compartilhar por Facebook">
                  <i class="fab fa-facebook-f branco" aria-hidden="true"></i>
                </a>
                <a class="br-button circle" href="https://twitter.com/itigovbr" aria-label="Compartilhar por Twitter">
                  <i class="fab fa-twitter branco" aria-hidden="true"></i>
                </a>
                <a class="br-button circle" href="https://br.linkedin.com/company/itigovbr" aria-label="Compartilhar por Linkedin">
                  <i class="fab fa-linkedin-in branco" aria-hidden="true"></i>
                </a>
                <a class="br-button circle" href="https://www.youtube.com/user/itidigital" aria-label="Compartilhar por Youtube">
                  <i class="fab fa-youtube branco" aria-hidden="true"></i>
                </a>
                <a class="br-button circle" href="https://www.instagram.com/itigovbr" aria-label="Compartilhar por Instagram">
                  <i class="fab fa-instagram branco" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-scrim" data-dismiss="menu" tabindex="0"></div>
      </div>
    </div>
    <!-- <div class="col">
      <div class="d-flex align-items-center">
        <div>
          <button class="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation"><i class="fas fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <div class="ml-3">Acionar menu</div>
      </div>
    </div> -->
  </div>
          `;
  return menu;
}

function init() {
  const menuContainer = document.body;
  if (menuContainer) {
    const menu = createMenu();
    menuContainer.prepend(menu);
  }
}

document.addEventListener("DOMContentLoaded", init);
