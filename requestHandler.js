// // PROD && HOMOL
validarArquivo = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "arquivo";
validarURL = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "url";
relSimples = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "simples";
relConformidade = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "conformidade";
downloadPdf = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "downloadPdf";
apiEmail = window.location.href.replace(/([a-z|A-Z]+\.html)$/, "") + "upload";

// // LOCALHOST
// validarArquivo = "http://localhost:3001/validarfile"; //http://localhost:3001/validarfile
// validarURL = "http://localhost:3001/validarurl"; //http://localhost:3001/validarurl
// relSimples = "http://localhost:3001/relsimples"; //http://localhost:3001/relsimples
// relConformidade = "http://localhost:3001/relconformidade"; //http://localhost:3001/relconformidade
// downloadPdf = "http://localhost:3001/downloadPdf"; //http://localhost:3001/downloadPdf
// apiEmail = "http://localhost:3012/upload"; //http://localhost:3012/upload

var extensoesValidasArquivo = ["pdf", "xml", "p7s", "json"];
var extensoesValidasArquivoDest = ["p7s", "jws", "xml", "p7m", "json"];
var jsonRelConformTratado, e403, e406;

$(document).ready(function () {
  checkboxTermos = document.getElementById("acceptTerms");
  checkboxDestacada = document.getElementById("detached");

  //Validações para envio do(s) arquivo(s)
  $("#validateSignature").on("click", function () {
    if (!checkboxTermos.checked) {
      return Swal.fire({
        icon: "warning",
        title: "Aviso",
        html:
          "Para prosseguir, você precisa concordar com os " +
          '<strong id="termosPopupURL" onclick="modalTermos()">termos de uso do serviço.</strong>',
      });
    }

    arquivo = $("#signature_files").prop("files");
    arquivoDest = $("#signature_filesDetached").prop("files");

    if (checkboxDestacada.checked) {
      arquivosSeparados = [];
      arquivoX = [];

      if (
        (!arquivo || arquivo.length == 0) &&
        (!arquivoDest || arquivoDest.length == 0)
      ) {
        swal.fire({
          icon: "warning",
          title: "Aviso",
          html: "Insira o documento assinado, seguido de sua assinatura destacada",
        });
      } else {
        nomeArquivoDest = arquivoDest[0].name;
        secoesNome = nomeArquivoDest.split(".");
        extensaoArquivoDest = secoesNome[secoesNome.length - 1];
        extensaoArquivoDest = extensaoArquivoDest.toLowerCase();
        if (extensoesValidasArquivoDest.includes(extensaoArquivoDest)) {
          // if (processarExtensão(arquivo)) {
          arquivosSeparados.splice(0, 2);
          arquivosSeparados.push(arquivo[0], arquivoDest[0]);
          // if (extensaoArquivoDest === "p7s" || extensaoArquivoDest === "P7S") {
          //   Swal.fire({
          //     icon: "warning",
          //     title: "Aviso",
          //     html: "Momentaneamente o serviço VALIDAR não está processando alguns arquivos em formato p7s. Nosso time técnico já está atuando para a correção.",
          //     confirmButtonText: 'Prosseguir com Validação'
          //   }).then((result) => { if (result.isConfirmed) uploadArquivo(arquivosSeparados); });
          // } else {
          uploadArquivo(arquivosSeparados);
          // }
          // }
        } else {
          swal.fire({
            icon: "warning",
            title: "Aviso",
            html: "Somente arquivos <b>.xml</b>, <b>.json</b>, <b>.p7m</b>, <b>.p7s</b> e <b>.jws</b> serão aceitos no campo de assinatura destacada.",
          });
        }
      }
    } else {
      if (!arquivo || arquivo.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Aviso",
          text: "Nenhum arquivo foi selecionado.",
        });
        return;
      }

      if (processarExtensão(arquivo)) uploadArquivo(arquivoX);
    }
  });
});

function processarExtensão(arquivo) {
  var nomeArquivo = arquivo[0].name;
  var secoesNome = nomeArquivo.split(".");
  var extensaoArquivo = secoesNome[secoesNome.length - 1];

  arquivoX = arquivo;

  if (extensaoArquivo === "PDF") {
    const nomeArquivoNovo = `${secoesNome[0]}.pdf`;
    const arquivoRenomeado = new File([arquivo[0]], nomeArquivoNovo, {
      type: arquivo[0].type,
    });

    arquivoX = [arquivoRenomeado];
    extensaoArquivo = extensaoArquivo.toLowerCase();
  }

  extensaoArquivo = extensaoArquivo.toLowerCase();
  if (extensoesValidasArquivo.includes(extensaoArquivo)) {
    if (extensaoArquivo === "p7s" || extensaoArquivo === "P7S") {
      // Swal.fire({
      //   icon: "warning",
      //   title: "Aviso",
      //   html: "Momentaneamente o serviço VALIDAR não está processando alguns arquivos em formato p7s. Nosso time técnico já está atuando para a correção.",
      //   confirmButtonText: 'Prosseguir com Validação',
      //   customClass: {
      //     confirmButton: 'okButton'
      //   }
      // });

      // document.querySelector('.okButton').onclick = function () {
      uploadArquivo(arquivoX);
      // };
    } else {
      return arquivoX;
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Aviso",
      html: "Somente arquivos <b>.pdf</b>, <b>.xml</b>, <b>.p7s</b> e <b>.json</b> serão aceitos no campo de documento.",
    });

    return false;
  }
}

async function pegarDoc() {
  const { value: result } = await Swal.fire({
    title: ":-( Algo deu errado.",
    html: `
      <style>
        .swal2-input {
          width: 80%;
          margin: 10px auto;
        }
        .consent-container {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
       
        #label1 {
          padding-top:28px;
          margin-left:2px;
        }
      </style>
      <p>Mas queremos te ajudar. Envie seu(s) documento(s) para análise pela equipe técnica.</p>
      <input type="text" id="nameInput" class="swal2-input" placeholder="Seu nome">
      <input type="email" id="emailInput" class="swal2-input" placeholder="Seu email"><br><br>
      <input type="file" id="fileInput" name="document" accept=".pdf,.doc,.docx"/><br>
      <div class="consent-container">
        <input type="checkbox" id="consentCheckbox">
        <label id="label1" for="consentCheckbox">Li o <strong><a href="termosArmazenamentoLGPD.html" target="_blank">Termo de Uso</strong></a>, autorizo acesso ao(s) documento(s) e concordo em receber e-mail de resposta técnica.</label>
      </div>
    `,
    showCancelButton: true,
    cancelButtonText: "Sair",
    confirmButtonText: "Enviar",
    preConfirm: () => {
      const nameInput = Swal.getPopup().querySelector("#nameInput");
      const emailInput = Swal.getPopup().querySelector("#emailInput");
      const fileInput = Swal.getPopup().querySelector("#fileInput");
      const consentCheckbox = Swal.getPopup().querySelector("#consentCheckbox");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
      if (!name) {
        Swal.showValidationMessage("Por favor, insira seu nome");
        return false;
      }
      if (!nameRegex.test(name)) {
        Swal.showValidationMessage("O nome contém caracteres inválidos");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        Swal.showValidationMessage("Por favor, insira seu email");
        return false;
      }
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("Por favor, insira um email válido");
        return false;
      }

      // Validação do Arquivo
      if (!fileInput.files.length) {
        Swal.showValidationMessage("Por favor, selecione um arquivo");
        return false;
      }

      // Validação do Consentimento
      if (!consentCheckbox.checked) {
        Swal.showValidationMessage(
          "Você precisa autorizar o acesso aos documentos"
        );
        return false;
      }

      return {
        name: name,
        email: email,
        file: fileInput.files[0],
      };
    },
  });

  if (result) {
    Swal.fire({
      title: "Enviando...",
      text: "Seu documento está sendo enviado para análise.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await sendDocumentForAnalysis(result.name, result.email, result.file);
  }
}

async function sendDocumentForAnalysis(name, email, file) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("document", file);

  try {
    const response = await fetch(apiEmail, {
      method: "POST",
      body: formData,
    });

    if (response.status === 409) {
      const data = await response.json();
      Swal.fire("Arquivo Repetido", data.message, "warning");
      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao enviar documento para análise");
    }

    Swal.fire("Enviado!", "Seu documento foi enviado para análise.", "success");
  } catch (error) {
    console.error("Error:", error);
    Swal.fire(
      "Erro",
      `Houve um erro ao enviar seu documento: ${error.message}`,
      "error"
    );
  }
}

httpsStatusHandle = async (response) => {
  e403 = false;

  if (response.status != 200 && response.status != 406) {
    $("#validateSignature").css("display", "");
    $("#loadingNew")
      .attr("style", "display: none !important;")
      .addClass("fade-in");

    let reqDocHeader = response.headers.get("req-doc");

    const handleSwalAndDocUpload = async (options) => {
      await Swal.fire(options);
      if (reqDocHeader) {
        await pegarDoc();
      }
    };

    switch (response.status) {
      case 415:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Erro",
          html: "Não foi possível baixar o arquivo da URL fornecida",
        });
        break;

      case 206:
        const data = await response.json();
        const assValidadas = data.qtds[0];
        const assTotal = data.qtds[1];

        await handleSwalAndDocUpload({
          icon: "info",
          title: "Uma parte das assinaturas foi processada",
          html: `O documento enviado possui muitas assinaturas e excedeu o tempo limite de processamento. Por isso, apenas <strong>${assValidadas}</strong> de <strong>${assTotal}</strong> assinaturas puderam ser validadas com sucesso. Para obter mais informações, veja o <strong>relatório de conformidade parcial</strong>.`,
          confirmButtonText: "Ver relatório",
          showCancelButton: true,
          cancelButtonText: "Ok",
          footer:
            '<a href="./duvidas.html#13" target="_blank">Entenda o motivo</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.setItem("230243157156", JSON.stringify(data.json));
            sessionStorage.removeItem("230243157156S");
            window.location.href = "./relatorioDeConformidadeParcial.html";
          }
        });
        break;

      case 400:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Aviso",
          html: "Você submeteu um documento sem assinatura reconhecível ou com assinatura corrompida.",
          footer:
            '<a href="./duvidas.html#14" target="_blank">Saiba o que fazer</a>',
        });
        break;

      case 404:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Recurso Não Encontrado",
          html: "O recurso solicitado não foi encontrado.",
        });
        break;

      case 403:
        e403 = true;
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Não autorizado",
          html: "Verifique o código e tente novamente",
        });
        break;

      case 408:
      case 502:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Falha na requisição",
          html: "Houve uma instabilidade no sistema, tente novamente mais tarde.",
        });
        break;

      case 503:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Falha de conexão",
          html: "Não foi possível estabelecer conexão com o servidor. Verifique sua conexão ou tente novamente mais tarde.",
        });
        break;

      case 422:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Aviso",
          html: "Você submeteu um documento inválido.",
        });
        break;

      case 500:
      default:
        await handleSwalAndDocUpload({
          icon: "error",
          title: "Aviso",
          html: "Ocorreu um erro na validação do seu arquivo",
        });
        break;
    }

    return false;
  }
  return response;
};

qrcodeScan = (urlScan, urlQr) => {
  fetch(urlScan)
    .then((response) => httpsStatusHandle(response))
    .then((response) => response.json())
    .then((response) => {
      try {
        if (response["prescription"]["signatureFiles"][0]["url"] == undefined) {
          Swal.fire({
            icon: "error",
            title: "Aviso",
            html: "A URL do QR Code não pôde ser identificada",
            footer: `<a href="./duvidas.html#20" target="_blank">Saiba o que fazer</a>`,
          });
        } else {
          sessionStorage.setItem("urlQr", urlQr);
          uploadArquivoURL(
            response["prescription"]["signatureFiles"][0]["url"]
          );
        }
      } catch (erro) {
        try {
          if (response["url"] == undefined) {
            Swal.fire({
              icon: "error",
              title: "Aviso",
              html: "A URL do QR Code não pôde ser identificada",
              footer: `<a href="./duvidas.html#20" target="_blank">Saiba o que fazer</a>`,
            });
          } else {
            sessionStorage.setItem("urlQr", response["url"]);
            uploadArquivoURL(response["url"]);
          }
        } catch (erro) {
          // $('#loadingNew').css('display', 'none');
          // $('#validateSignature').css('display', 'inline');

          Swal.fire({
            icon: "error",
            title: "Aviso",
            html: "Utilize um QR Code compatível.",
            footer: `<a href="./duvidas.html#20" target="_blank">Ler Orientações</a>`,
          });
        }
      }
    })
    .catch((error) => {
      // console.log("catch")
      // $('#loadingNew').css('display', 'none');
      // $('#validateSignature').css('display', 'inline');
      if (!e403) {
        Swal.fire({
          icon: "error",
          title: "Aviso",
          html: "Utilize um QR Code compatível.",
          footer: `<a href="./duvidas.html#20" target="_blank">Ler Orientações</a>`,
        });
      }
    });
};

urlPopup = () => {
  Swal.fire({
    title: "Insira sua URL",
    input: "text",
    html:
      "Ao enviar você concorda com os " +
      '<strong id="termosPopupURL" onclick="modalTermos()">termos de uso do serviço.</strong>',
    inputAttributes: {
      autocapitalize: "off",
      id: "urlPdfBox",
    },
    showCancelButton: true,
    confirmButtonText: "Enviar",
    didOpen: () => {
      const confirmButton = document.querySelector(".swal2-confirm");
      confirmButton.id = "enviarUrlb"; // Adiciona um ID personalizado
    },
    cancelButtonText: "Voltar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("acceptTerms").click();
      urlToDownload = $("#urlPdfBox").val();
      if (urlToDownload.length > 17) {
        response = uploadArquivoURL(urlToDownload);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          html: "Por favor digite uma URL",
        });
      }
    }
  });
};

//REQUISIÇÕES

let switchToLoadingNew = false;

uploadArquivo = async (arquivos) => {
  e406 = false;
  document.querySelector(".br-loading").setAttribute("data-progress", 2);
  $("#validateSignature").css("display", "none");
  $(".loading").addClass("fade-in").css("display", "block");

  // Tempo para a animação de fade-out do validateSignature

  const formData = new FormData();

  if (checkboxDestacada.checked) {
    formData.append("signature_files[]", arquivos[1]);
    formData.append("detached_files[]", arquivos[0]);
  } else {
    formData.append("signature_files[]", arquivos[0]);
  }

  const options = {
    method: "POST",
    body: formData,
    mode: "cors",
  };

  var loadingTimer = setTimeout(() => {
    loadingTimer = setTimeout(function () {
      $(".loading").removeClass("fade-in").addClass("fade-out");
      loadingTimer = setTimeout(function () {
        $(".loading").css("display", "none").removeClass("fade-out");
        $("#loadingNew")
          .attr("style", "display: flex !important;")
          .addClass("fade-in");
        loadingTimer = setTimeout(function () {
          $("#loadingNew").removeClass("fade-in");
          switchToLoadingNew = true;
          incrementProgress();
        }, 500);
        // Tempo para a animação de fade-in do loadingNew
      }, 500); // Tempo para a animação de fade-out do loading
    }, 500);
  }, 4500);

  await fetch(validarArquivo, options)
    .then((response) => {
      // console.log(response.data)
      clearTimeout(loadingTimer);
      if (switchToLoadingNew) {
        clearTimeout(progressInterval);
        document
          .querySelector(".br-loading")
          .setAttribute("data-progress", 100);
      } else {
        $(".loading").removeClass("fade-in").addClass("fade-out");
        setTimeout(function () {
          $(".loading").css("display", "none").removeClass("fade-out");
        }, 500);
      }
      $("#validateSignature").addClass("fade-in");

      return response;
    })
    .then((response) => httpsStatusHandle(response))
    .then((response) => {
      if (!response) return null;
      if (response.status == 406) {
        e406 = true;
      }
      return response.json();
    })
    .then(async (jsonResponse) => {
      if (!jsonResponse) return;
      jsonBruto = jsonResponse;
      if (e406) {
        jsonTratado = false;
        toRelatorioSimples();
      }
      jsonTratado = await relatorioSimples(jsonBruto);
      if (switchToLoadingNew) {
        setTimeout(function () {
          toRelatorioSimples();
        }, 800);
      } else {
        toRelatorioSimples();
      }
    })
    .catch((error) => {
      // setTimeout(function () {
      $("#validateSignature").css("display", "inline").removeClass("fade-in");
      // }, 500);
      console.error(error);

      let errorMessage, errorTitle, errorIcon;

      clearTimeout(loadingTimer);
      if (switchToLoadingNew) clearTimeout(progressInterval);
      $("#loadingNew")
        .attr("style", "display: none !important;")
        .addClass("fade-in");
      $(".loading").css("display", "none").removeClass("fade-out");

      if (error.message === "Failed to fetch" || error.status == 503) {
        // Erro de rede
        errorMessage =
          "Não foi possível estabelecer conexão com o servidor. Verifique sua conexão ou tente novamente mais tarde.";
        errorTitle = "Falha de conexão";
        errorIcon = "error";
      } else {
        // Outros tipos de erros
        errorMessage = "Ocorreu um erro. Tente novamente mais tarde.";
        errorTitle = "Erro";
        errorIcon = "error";
      }
      Swal.fire({
        icon: errorIcon,
        title: errorTitle,
        text: errorMessage,
      });
    });
};

uploadArquivoURL = async (url) => {
  document.querySelector(".br-loading").setAttribute("data-progress", 2);
  $("#validateSignature").css("display", "none");
  $(".loading").addClass("fade-in").css("display", "block");

  var loadingTimer = setTimeout(() => {
    loadingTimer = setTimeout(function () {
      $(".loading").removeClass("fade-in").addClass("fade-out");
      loadingTimer = setTimeout(function () {
        $(".loading").css("display", "none").removeClass("fade-out");
        $("#loadingNew")
          .attr("style", "display: flex !important;")
          .addClass("fade-in");
        loadingTimer = setTimeout(function () {
          $("#loadingNew").removeClass("fade-in");
          switchToLoadingNew = true;
          incrementProgress();
        }, 500); // Tempo para a animação de fade-in do loadingNew
      }, 500); // Tempo para a animação de fade-out do loading
    }, 500);
  }, 4500);

  const options = {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };

  await fetch(validarURL, options)
    .then((response) => {
      clearTimeout(loadingTimer);
      if (switchToLoadingNew) {
        clearTimeout(progressInterval);
        document
          .querySelector(".br-loading")
          .setAttribute("data-progress", 100);
      } else {
        $(".loading").removeClass("fade-in").addClass("fade-out");
        setTimeout(function () {
          $(".loading").css("display", "none").removeClass("fade-out");
        }, 500);
      }
      $("#validateSignature").addClass("fade-in");

      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      return response;
    })
    .then((response) => httpsStatusHandle(response))
    .then((response) => {
      if (!response) return null;
      if (response.status == 406) {
        e406 = true;
      }
      return response.json();
    })
    .then(async (jsonResponse) => {
      if (!jsonResponse) return;
      jsonBruto = jsonResponse;
      if (e406) {
        jsonTratado = false;
        toRelatorioSimples();
      }
      jsonTratado = await relatorioSimples(jsonBruto);
      if (switchToLoadingNew) {
        setTimeout(function () {
          toRelatorioSimples();
        }, 800);
      } else {
        toRelatorioSimples();
      }
    })
    .catch((error) => {
      // setTimeout(function () {
      $("#validateSignature").css("display", "inline").removeClass("fade-in");
      // }, 500);
      console.error(error);

      let errorMessage, errorTitle, errorIcon;

      clearTimeout(loadingTimer);
      if (switchToLoadingNew) clearTimeout(progressInterval);
      $("#loadingNew")
        .attr("style", "display: none !important;")
        .addClass("fade-in");
      $(".loading").css("display", "none").removeClass("fade-out");

      if (error.message === "Failed to fetch" || error.status == 503) {
        // Erro de rede
        errorMessage =
          "Não foi possível estabelecer conexão com o servidor. Verifique sua conexão ou tente novamente mais tarde.";
        errorTitle = "Falha de conexão";
        errorIcon = "error";
      } else {
        // Outros tipos de erros
        errorMessage = "Ocorreu um erro. Tente novamente mais tarde.";
        errorTitle = "Erro";
        errorIcon = "error";
      }
      Swal.fire({
        icon: errorIcon,
        title: errorTitle,
        text: errorMessage,
      });
    });
};

function incrementProgress() {
  const loadingElement = document.querySelector(".br-loading");
  let currentProgress = parseInt(
    loadingElement.getAttribute("data-progress"),
    10
  );

  progressInterval = setInterval(() => {
    if (currentProgress < 100) {
      currentProgress++;
      loadingElement.setAttribute("data-progress", currentProgress);
    } else {
      clearInterval(progressInterval);
    }
  }, 3000);
}

toRelatorioSimples = () => {
  sessionStorage.setItem("230243157156", JSON.stringify(jsonBruto));
  sessionStorage.setItem("230243157156S", JSON.stringify(jsonTratado));
  window.location.href = "./relatorio.html";
};

relatorioSimples = (jsonData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
  };

  return fetch(relSimples, options)
    .then((response) => httpsStatusHandle(response))
    .then((response) => response.json());
};

relatorioConformidade = (jsonData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
  };

  return fetch(relConformidade, options)
    .then((response) => httpsStatusHandle(response))
    .then((response) => response.json())
    .then((response) => (jsonRelConformTratado = response))
    .then((response) => tratamento(response));
};

getPdf = () => {
  const requestBody = {
    data: JSON.stringify(jsonRelConformTratado),
    language: sessionStorage.getItem("language"),
  };
  // console.log(JSON.stringify(jsonRelConformTratado));

  const options = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
  };

  return fetch(downloadPdf, options)
    .then((response) => {
      // console.log(response)
      return response.blob();
    }) // converte a resposta para um blob
    .then((blob) => {
      // Cria um link para o blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // O atributo download indica que o link é para download ao invés de navegação

      regex = /\.[a-z|A-Z]+/g;
      nomeArquivo = jsonRelConformTratado.nomeArquivo.replace(regex, "");

      a.download = `Relatorio - ${nomeArquivo}.pdf`;
      document.body.appendChild(a);
      a.click();
      // Limpeza
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => console.error("Erro ao baixar o arquivo:", error));
};
