qrHandler = async () => {
  const codeReader = new ZXing.BrowserQRCodeReader();
  const videoInputDevices = await codeReader.listVideoInputDevices();
  try {
    const controls = await codeReader.decodeFromVideoDevice(undefined, "video", (result, err, controls) => {
      document.getElementById("test-area-qr-code-webcam").style.display = "initial";
      document.getElementById("video").style.display = "initial";
      if (result) {
        sessionStorage.setItem("QRcode", result)
        onScanSuccess(result.text, result)
        codeReader.cancel
        controls.stop()
      }
    })
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Aviso',
      html: 'Não foi possível localizar a câmera do dispositivo.',
      confirmButtonText: 'Fechar'
    })
  };


  function onScanSuccess(decodedText, decodedResult) {
    // if (decodedText.indexOf("sw=") == -1) {
    Swal.fire({
      // icon: 'warning',
      title: "QR Code escaneado",
      allowOutsideClick: false,
      text: "Insira o código de acesso",
      html: `<input type="text" placeholder="Insira o código" name="serialcode" id="serialcode" class="text-center" required>`,
      preConfirm: () => {
        const serialcode = Swal.getPopup().querySelector("#serialcode").value;
        if (!serialcode) {
          Swal.showValidationMessage(`O código de acesso é necessário`);
        }
        return { serialcode: serialcode };
      },
      showConfirmButton: true,
      confirmButtonText: "Validar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const codeAccess = document.querySelector("#serialcode").value;
        defurl =
          decodedText +
          "?_secretCode=" +
          codeAccess +
          "&_format=application/validador-iti+json";
        // console.log(codeAccess)
        qrcodeScan(defurl, decodedText);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        location.reload();
      }
    });
    // } else {
    //   qrcodeScan(decodedText, decodedText);
    // }

    // }
  }

  function onScanFailure(error) { }

  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    {
      fps: 10,
      rememberLastUsedCamera: false,
      qrbox: { width: 250, height: 250 },
    },
    /* verbose= */ false
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
