function translateheaders() {
  $(document).ready(function () {
    var data = {
      espanhol: {
        menub1: "Órganos del Gobierno",
        menub2: "Acceso a la información",
        menub3: "Legislación",
        menub4: "Accesibilidad",
        menusubtitulo: "Servicio de validación de firmas electrónicas",
        menul1: "Sobre",
        menul2: "Información",
        menul2a: "Actualizaciones del servicio",
        menul2b: "Manual de uso",
        menul2c: "Glosario",
        menul2d: "Dudas",
        menul2e: "Guía de buenas prácticas",
        menul2f: "Directrices para desarrolladores",
        menul2g: "Glosario de resultados",
        menul3: "Servicios",
        menul3a: "Firmar electrónicamente",
        menul3b: "Validar firma",
        menul4: "Contáctanos",
        menul5: "Redes Sociales",
        acessorap: "ACCESO RÁPIDO",
        bsobre: "Sobre",
        bduvi: "Dudas",
        bdocu: "Información",
        bmail: "Contáctanos",
        arrobaiti: "REDES SOCIALES",
        funcTema: "Tema Oscuro/Claro",
        funcDuv: "Dudas",
        rapido: "Acesso Rápido",
        funcSistema: "Funcionalidades del Sistema",
        selectorES: "Lenguaje Español",
        selectorPT: "Lenguaje Portugués",
        selectorIN: "Lenguaje Inglés",
      },
      portuga: {
        menub1: "Órgãos do Governo",
        menub2: "Acesso à informação",
        menub3: "Legislação",
        menub4: "Acessibilidade",
        menusubtitulo: "Serviço de validação de assinaturas eletrônicas",
        menul1: "Sobre",
        menul2: "Informações",
        menul2a: "Atualizações no serviço",
        menul2b: "Cartilha de uso",
        menul2c: "Glossário",
        menul2d: "Dúvidas",
        menul2e: "Guia de boas práticas",
        menul2f: "Orientações ao desenvolvedor",
        menul2g: "Glossário dos resultados",
        menul3: "Serviços",
        menul3a: "Assinar eletronicamente",
        menul3b: "Validar assinatura",
        menul4: "Fale conosco",
        menul5: "Redes Sociais",
        acessorap: "ACESSO RÁPIDO",
        bsobre: "Sobre",
        bduvi: "Dúvidas",
        bdocu: "Informações",
        bmail: "Fale Conosco",
        arrobaiti: "REDES SOCIAIS",
        black: "Tema Escuro/Claro",
        funcDuv: "Dúvidas",
        rapido: "Acesso Rápido",
        funcSistema: "Funcionalidades do Sistema",
        selectorES: "LinguagemEspanhol",
        selectorPT: "LinguagemPortuguês",
        selectorIN: "LinguagemInglês",
      },
      ingles: {
        menub1: "Government agencies",
        menub2: "Access to information",
        menub3: "Legislation",
        menub4: "Accessibility",
        menusubtitulo: "Electronic signature validation service",
        menul1: "About",
        menul2: "Information",
        menul2a: "Service updates",
        menul2b: "User manual",
        menul2c: "Glossary",
        menul2d: "FAQ",
        menul2e: "Best Practices Guide",
        menul2f: "Developer guidelines",
        menul2g: "Results glossary",
        menul3: "Services",
        menul3a: "Sign electronically",
        menul3b: "Validate signature",
        menul4: "Contact us",
        menul5: "Social Media",
        acessorap: "DIRECT ACCESS",
        bsobre: "About",
        bduvi: "FAQ",
        bdocu: "Information",
        bmail: "Contact us",
        arrobaiti: "SOCIAL MEDIA",
        funcTema: "Dark/Light Theme",
        funcDuv: "FAQ",
        rapido: "Direct Access",
        funcSistema: "System Features",
        selectorES: "Language Spanish",
        selectorPT: "Language Portuguese",
        selectorIN: "Language English",
      },
    };
    var attr = sessionStorage.getItem("language");
    var menub1 = document.querySelector("#menub1");
    var menub2 = document.querySelector("#menub2");
    var menub3 = document.querySelector("#menub3");
    var menub4 = document.querySelector("#menub4");
    var menusubtitulo = document.querySelector("#menusubtitulo");
    var menul1 = document.querySelector("#menul1");
    var menul2 = document.querySelector("#menul2");
    var menul2a = document.querySelector("#menul2a");
    var menul2b = document.querySelector("#menul2b");
    var menul2c = document.querySelector("#menul2c");
    var menul2d = document.querySelector("#menul2d");
    var menul2e = document.querySelector("#menul2e");
    var menul2f = document.querySelector("#menul2f");
    var menul2g = document.querySelector("#menul2g");
    var menul3 = document.querySelector("#menul3");
    var menul3a = document.querySelector("#menul3a");
    var menul3b = document.querySelector("#menul3b");
    var menul4 = document.querySelector("#menul4");
    var menul5 = document.querySelector("#menul5");
    var acessorap = document.querySelector(".lines");
    var botao2 = document.querySelector("#bsobre");
    var botao3 = document.querySelector("#bduvi");
    var botao4 = document.querySelector("#bdocu");
    var botao5 = document.querySelector("#bmail");
    var arrobaiti = document.querySelector("#arrobaiti");
    var black = document.querySelector("#black");
    var funcDuv = document.querySelector("#funcDuv");
    var rapido = document.querySelector("#rapido");
    var funcSistema = document.querySelector("#funcSistema");

    acessorap.textContent = data[attr].acessorap;
    botao2.textContent = data[attr].bsobre;
    botao3.textContent = data[attr].bduvi;
    botao4.textContent = data[attr].bdocu;
    botao5.textContent = data[attr].bmail;
    arrobaiti.textContent = data[attr].arrobaiti;
    menub1.textContent = data[attr].menub1;
    menub2.textContent = data[attr].menub2;
    menub3.textContent = data[attr].menub3;
    menub4.textContent = data[attr].menub4;
    menusubtitulo.textContent = data[attr].menusubtitulo;
    menul1.textContent = data[attr].menul1;
    menul2.textContent = data[attr].menul2;
    menul2a.textContent = data[attr].menul2a;
    menul2b.textContent = data[attr].menul2b;
    menul2c.textContent = data[attr].menul2c;
    menul2d.textContent = data[attr].menul2d;
    menul2e.textContent = data[attr].menul2e;
    menul2f.textContent = data[attr].menul2f;
    menul2g.textContent = data[attr].menul2g;
    menul3.textContent = data[attr].menul3;
    menul3a.textContent = data[attr].menul3a;
    menul3b.textContent = data[attr].menul3b;
    menul4.textContent = data[attr].menul4;
    menul5.textContent = data[attr].menul5;
    funcTema.textContent = data[attr].funcTema;
    funcDuv.textContent = data[attr].funcDuv;
    rapido.textContent = data[attr].rapido;
    funcSistema.textContent = data[attr].funcSistema;
  });
}

$(document).ready(function () {
  document.getElementById("selectorPT").addEventListener("click", () => {
    langEL = document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorES").classList.add("active");
    sessionStorage.setItem("language", "portuga");
    translateheaders();
  });
  document.getElementById("selectorES").addEventListener("click", () => {
    langEL = document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorPT").classList.add("active");
    sessionStorage.setItem("language", "espanhol");
    translateheaders();
  });

  document.getElementById("selectorIN").addEventListener("click", () => {
    langEL = document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorIN").classList.add("active");
    sessionStorage.setItem("language", "ingles");
    translateheaders();
  });
});
