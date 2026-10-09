function filterSearchCustom() {
  var inputTexto = document.getElementById("inputFilter").value.trim();
  var options = [
    {
      name: "Validar",
      link: "https://validar.iti.gov.br/index.html",
    },
    {
      name: "Sobre",
      link: "https://validar.iti.gov.br/sobre.html",
    },
    {
      name: "Dúvidas",
      link: "https://validar.iti.gov.br/duvidas.html",
    },
    {
      name: "Informações",
      link: "https://validar.iti.gov.br/informacoes.html",
    },
    {
      name: "Fale conosco",
      link: "https://validar.iti.gov.br/fale-conosco.html",
    },
    {
      name: "Órgãos do Gover",
      link: "https://www.gov.br/pt-br/orgaos-do-governo",
    },
    {
      name: "Acesso á informação",
      link: "https://www.gov.br/acessoainformacao/pt-br",
    },
    {
      name: "Legislação",
      link: "https://www4.planalto.gov.br/legislacao",
    },
    {
      name: "Acessibilidade",
      link: "https://www.gov.br/governodigital/pt-br/acessibilidade-digital",
    },
  ];
  var optionsFound = options.filter(function (result) {
    return result.name.toLowerCase().includes(inputTexto.toLowerCase());
  });

  var createDiv = document.getElementById("createDiv");
  createDiv.innerHTML = "";

  if (inputTexto !== "") {
    if (optionsFound.length > 0) {
      var ul = document.createElement("ul");
      ul.classList.add("padDing");
      optionsFound.forEach(function (result) {
        var div = document.createElement("div");
        div.classList.add("br-list");
        var a = document.createElement("a");
        a.classList.add("br-item");
        a.textContent = result.name;
        a.href = result.link;
        div.appendChild(a);
        ul.appendChild(div);
      });

      createDiv.appendChild(ul);

      document.addEventListener("click", function (event) {
        var isClickInside = createDiv.contains(event.target);

        if (!isClickInside) {
          createDiv.innerHTML = "";
        }
      });
    }
  } else {
    createDiv.textContent = "";
  }
}
