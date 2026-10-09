// Função principal de tradução (para demais elementos da página)
function translate() {
  $(document).ready(function () {
    var data = {
      espanhol: {
        spanIndex:
          "Submete ahora mismo tu documento al servicio oficial de validación de firmas electrónicas del gobierno y descubre en línea, de manera instantánea, el estado de las firmas electrónicas ICP-Brasil, GOV.BR o provenientes de acuerdos internacionales de reconocimiento mutuo para satisfacer tus necesidades de seguridad y confiabilidad.",
        spanIndex2:
          "También puedes descargar la aplicación VALIDAR QR CODE, en Android o iOS, para validar documentos y certificados de atributo accesibles mediante código QR. Todo según lo establecido en la Ordenanza ITI Nº 22 de 28 de septiembre de 2023.",
        spanIndex3:
          "Es importante destacar que ninguna información o archivo se almacena en los entornos operativos del ITI. Los resultados de la validación se limitan exclusivamente a identificar al titular del certificado digital utilizado y confirmar si el documento firmado no ha sufrido ninguna alteración después de la firma.",
        detachedL: "Firma resaltada",
        qrCodeI: "Solo se enviarán códigos QR de documentos firmados",
        qrCodeBtn1: "Leer Código QR",
        buttaum: "Elije el Archivo",
        urlselectorbutton: "Pegar URL",
        assDestaButa: "Archivo de firmas destacadas",
        // Estes textos poderão ser removidos daqui se você for usar a função translateTerms() para os termos.
        labelCheckbox:
          "Estoy de acuerdo con los  terminos de uso y política de privacidad",
        termoUsoC: "términos de uso y política de privacidad",
        submitValidar: "Validar",
      },
      portuga: {
        spanIndex:
          "Submeta agora mesmo seu documento ao serviço oficial de validação de assinaturas eletrônicas do governo e descubra online, e instantaneamente, o status de assinaturas eletrônicas ICP-Brasil, GOV.BR ou provenientes de acordos internacionais de reconhecimento mútuo para atender às suas necessidades de segurança e confiabilidade.",
        spanIndex2:
          "Você também pode baixar o aplicativo VALIDAR QR CODE, em Android ou iOS, para validar documentos e certificados de atributo acessíveis por QR Code. Tudo nos termos da Portaria ITI Nº 22 de 28 de setembro de 2023.",
        spanIndex3:
          "É importante ressaltar que nenhuma informação ou arquivo são armazenados nos ambientes operacionais do ITI. Os resultados da validação limitam-se exclusivamente a identificar o titular do certificado digital utilizado e confirmar se o documento assinado não sofreu nenhuma adulteração após a assinatura.",
        detachedL: "Assinatura Destacada",
        qrCodeI: "Só serão submetidos QR Codes de documentos assinados",
        qrCodeBtn1: "Ler QR Code",
        buttaum: "Escolher Arquivo",
        urlselectorbutton: "Colar URL",
        assDestaButa: "Arquivo de Assinatura Destacada",
        labelCheckbox:
          "Concordo com os termos de uso e política de privacidade.",
        termoUsoC: "termos de uso e política de privacidade.",
        submitValidar: "Validar",
      },
      ingles: {
        spanIndex:
          "Submit your document right now to the official government electronic signature validation service and discover online and instantly the status of ICP-Brasil, GOV.BR electronic signatures, or those from international agreements of mutual recognition to meet your security and reliability needs.",
        spanIndex2:
          "You can also download the VALIDATE QR CODE app on Android or iOS to validate documents and attribute certificates accessible via QR Code. All in accordance with Ordinance ITI No. 22 of September 28, 2023.",
        spanIndex3:
          "It's important to note that no information or files are stored in ITI's operational environments. The validation results are exclusively limited to identifying the holder of the used digital certificate and confirming that the signed document has not undergone any alterations after the signature.",
        detachedL: "Highlighted Signature",
        qrCodeI: "Only QR Codes of signed documents will be submitted",
        qrCodeBtn1: "Read QR Code",
        buttaum: "Choose File",
        urlselectorbutton: "Paste URL",
        assDestaButa: "Highlighted Signature Archive",
        // Estes textos serão tratados separadamente pela função translateTerms()
        labelCheckbox: "I agree with the ",
        termoUsoC: "terms of use and privacy policy",
        submitValidar: "Validate",
      },
    };

    var attr = sessionStorage.getItem("language");

    // Função auxiliar para atualizar elementos pelo id
    function updateElement(id, text) {
      var element = document.getElementById(id);
      if (element) {
        element.textContent = text;
        // Se o elemento não for <span> ou <button>, adiciona aria-label (opcional)
        if (
          element.tagName.toLowerCase() !== "span" &&
          element.tagName.toLowerCase() !== "button"
        ) {
          element.setAttribute("aria-label", text);
        }
      }
    }

    updateElement("spanIndex", data[attr].spanIndex);
    updateElement("spanIndex2", data[attr].spanIndex2);
    updateElement("spanIndex3", data[attr].spanIndex3);
    updateElement("detachedL", data[attr].detachedL);
    updateElement("qrCodeI", data[attr].qrCodeI);
    updateElement("qrCodeBtn1", data[attr].qrCodeBtn1);
    updateElement("buttaum", data[attr].buttaum);
    updateElement("urlselectorbutton", data[attr].urlselectorbutton);
    updateElement("assDestaButa", data[attr].assDestaButa);
    // Se desejar, remova estes dois da função translate() para deixar apenas para translateTerms():
    // updateElement("labelCheckbox", data[attr].labelCheckbox);
    // updateElement("termoUsoC", data[attr].termoUsoC);
    updateElement("submitValidar", data[attr].submitValidar);
  });
}

// Função específica para traduzir somente os termos de uso
function translateTerms() {
  var termsData = {
    espanhol: {
      label: "Estoy de acuerdo con los",
      link: "términos de uso y política de privacidad",
    },
    portuga: {
      label: "Concordo com os ",
      link: "termos de uso e política de privacidade",
    },
    ingles: {
      label: "I agree with the",
      link: "terms of use and privacy policy",
    },
  };

  var lang = sessionStorage.getItem("language") || "portuga";

  var labelElem = document.getElementById("labelCheckbox");
  var linkElem = document.getElementById("teremosUsoC");

  if (labelElem) {
    labelElem.textContent = termsData[lang].label;
  }
  if (linkElem) {
    linkElem.textContent = termsData[lang].link;
  }
}

// Chama as funções quando o DOM estiver pronto
$(document).ready(function () {
  translate();
  translateTerms();
});

// Atualiza a tradução quando o idioma é alterado
$(document).ready(function () {
  document.getElementById("selectorPT").addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorPT").classList.add("active");
    sessionStorage.setItem("language", "portuga");
    translate();
    translateTerms();
  });

  document.getElementById("selectorES").addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorES").classList.add("active");
    sessionStorage.setItem("language", "espanhol");
    translate();
    translateTerms();
  });

  document.getElementById("selectorIN").addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById("selectorIN").classList.add("active");
    sessionStorage.setItem("language", "ingles");
    translate();
    translateTerms();
  });
});
