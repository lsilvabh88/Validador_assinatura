// Click de botões

function escondeFile() {
  document.getElementById("formFile").click();
}

function escondeEnviaDuvida() {
  document.getElementById("emailduvida").click();
}

function manutencao() {
  Swal.fire({
    icon: "warning",
    title: "Função em manutenção",
  });
}

function avaliarBotao() {
  window.open("./avaliar.html");
}

// js que faz o scroll suave para as seções definidas do site
function scrollToSection(sectionId) {
  var targetSection = document.querySelector(sectionId);

  if (targetSection) {
    var scrollOffset = targetSection.offsetTop - window.innerHeight / 2;
    window.scrollTo({ top: scrollOffset, behavior: "smooth" });
    targetSection.classList.add("highlight");

    setTimeout(function () {
      targetSection.classList.remove("highlight");
    }, 3300);
  }
}

// Obtém o hash da URL e rola até a seção correspondente quando a página é carregada
$(document).ready(function () {
  var hash = window.location.hash;
  if (hash) {
    scrollToSection(hash);
  }
});

function clickSocial(id) {
  switch (id) {
    case "twitter":
      window.open("https://twitter.com/itigovbr");
      break;
    case "youtube":
      window.open("https://www.youtube.com/user/itidigital");
      break;
    case "face":
      window.open("https://www.facebook.com/itigovbr");
      break;
    case "linkedin":
      window.open("https://br.linkedin.com/company/itigovbr");
      break;
    case "insta":
      window.open("https://instagram.com/itigovbr?igshid=YmMyMTA2M2Y=");
      break;
  }
}
function modalTermos() {
  var lin = sessionStorage.getItem("language");
  if (lin == "portuga") {
    Swal.fire({
      width: "1000px",
      html: '<h3><b>TERMO DE USO E POLÍTICA DE PRIVACIDADE</b></h3><br><p>Este termo foi atualizado em 07/11/2023 em conformidade com a <a href="https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303">(Portaria ITI n° 22, de 28 de setembro de 2023)</a></p><h5 class="mt-3"><b>Informações nesse documento</b></h5><p>Neste Termo, o usuário do serviço VALIDAR encontrará informações sobre:</p><ul class = "text-left"><li><p class="m-0">Aceitação do Termo;</p></li><li><p class="m-0">Descrição do serviço;</p></li><li><p class="m-0">Legislação aplicável;</p></li><li><p class="m-0">Tratamento de dados;</p></li><li><p class="m-0">Resultados obtidos;</p></li><li><p class="m-0">Responsabilidades do usuário;</p></li><li><p class="m-0">Garantias do ITI;</p></li><li><p class="m-0">Responsabilidades do ITI.</p></li></ul><br><h5><b>Aceitação do Termo</b></h5><p>Ao utilizar o serviço, você confirma que leu, compreendeu o Termo de Uso e Política de Privacidade aplicáveis ao serviço solicitado e concorda em ficar a eles vinculado</p><br><h5><b>Descrição do serviço</b></h5><p>Lançado em 19 de dezembro de 2022, o VALIDAR unifica e substitui outros dois portais de serviços: o www.assinaturadigital.iti.gov.br e o www.verificador.iti.gov.br.</p><p>O serviço permite conferir apenas o status de uma assinatura eletrônica, seja ela do tipo avançada ou qualificada, quanto à integridade e autoria, em documentos assinados digitalmente por certificados emitidos no âmbito da ICP-Brasil ou por outras infraestruturas que sejam oficialmente reconhecidas no Brasil, como a assinatura avançada produzida no âmbito do portal GOV.BR, não sendo possível conferir a veracidade do conteúdo dos documentos submetidos.</p><p>Este serviço também compreende a submissão de documentos cujas assinaturas eletrônicas tenham sido providas por infraestruturas de chaves públicas oficiais de outros países.</p><br><h5 class="mt-3"><b>REQUISITOS</b></h5><p>Os seguintes requisitos são considerados pelo serviço de validação:</p><ul class = "text-left"><li><p class="m-0">Validar o estado criptográfico da assinatura eletrônica;</p></li><li><p class="m-0">Verificar se a cadeia de confiança de certificação, incluindo o certificado digital do titular, estava válida na referência temporal adotada no momento da criação da assinatura;</p></li><li><p class="m-0">Confirmar a validade da assinatura eletrônica da Autoridade Certificadora que emitiu o certificado do signatário e de toda a cadeia de certificação até a Autoridade Certificadora Raiz de uma determinada âncora de confiança;</p></li></ul><br><h5><b>Legislação aplicável</b></h5><p>O VALIDAR atende os dispositivos legais, tal como a regulamentação da ICP-Brasil e as definições contidas tanto na Medida Provisória nº 2.200-2, de 24 de agosto de 2001, quanto na Lei nº 14.063, de 23 de setembro de 2020 e no Decreto nº 10.543, de 13 de novembro de 2020. Obedece ainda ao Acordo de Reconhecimento Mútuo de Assinaturas Digitais do Mercosul e a eventuais outros acordos, convênios e tratados de reconhecimento técnico de assinaturas eletrônicas de que o Brasil seja signatário.</p><p>Ressalta-se ainda que o serviço também considera as assinaturas providas por certificados digitais procedentes da cadeia de confiança da Adobe. Isso acontece porque o ITI representa o Brasil no programa Adobe Approved Trust List, conforme acordo assinado entre ITI e aquela empresa.</p><p>Além disso, apenas são passíveis de verificação os arquivos produzidos nos formatos CMS CAdES, XAdES e PAdES nas modalidades embarcadas ou destacadas, conforme previsto na Resolução CG ICP-Brasil nº 182, de 18 de fevereiro de 2021 e na Portaria Conjunta ITI/CC/PR SGD/SEDGG/ME nº 1, de 08 de setembro de 2021.</p><p>A Resolução CG ICP-Brasil 182/2021 traz uma visão geral sobre assinaturas digitais, define os principais conceitos e lista os demais documentos que compõem as normas da ICP-Brasil sobre o assunto. Já a Portaria Conjunta ITI/CC/PR SGD/SEDGG/ME 1/2021 estabelece os padrões criptográficos referenciais para as assinaturas eletrônicas avançadas nas comunicações que envolvam a administração pública federal direta, autárquica e fundacional.</p><br><h5><b>Tratamento de dados</b></h5><p>Durante a navegação, o portal VALIDAR utiliza cookies próprios (primários), ou seja, dos domínios validar.iti.gov.br e validar.iti.br, para registrar as configurações e preferências de navegação dos usuários e gerar relatórios estatísticos através do Google Analytics, e também cookies de terceiros para complementar essas estatísticas. A configuração do Google Analytics para os domínios citados não permite que dados pessoais e o documento assinado objeto de validação sejam armazenados e/ou repassados a terceiros.</p><p>O serviço descarta o documento submetido à verificação tão logo finalize a validação das assinaturas e, para isso, precisa calcular o hash (resumo criptográfico) do documento e compará-lo com o hash da assinatura. Dados obtidos através de documentos enviados por usuários através dos canais de atendimento, entre os quais Fala.BR e e-mail institucional do ITI, são tratados exclusivamente para analisar a dúvida do usuário e descartados na sequência.</p><p>Para a finalidade de informar o resultado da verificação dos documentos assinados eletronicamente, o portal VALIDAR realiza o tratamento dos seguintes dados pessoais dos documentos enviados pelos usuários:</p><ul class ="text-left"><li><p class="m-0">Nome;</p></li><li><p class="m-0">CPF;</p></li><li><p class="m-0">Registro Profissional, quando o documento contiver atributo de identificação profissional.</p></li></ul><p>O ITI se compromete a apresentar o CPF do(s) signatário(s) de forma anonimizada a fim de proteger os dados do cidadão.</p><br><h5><b>Resultados obtidos</b></h5><p>O resultado bem-sucedido da verificação de arquivo assinado digitalmente com certificado ICP-Brasil ou GOV.BR, quando submetido ao VALIDAR, poderá resultar nas seguintes situações: Aprovado, Reprovado ou Indeterminado, em conformidade com a norma ETSI EN 319 102-1 V1.1.1. (2016-05), e legislação aplicável, sendo:</p><p><b>Aprovado</b>: Assinatura em conformidade com a regulamentação da ICP-Brasil, no caso de assinaturas eletrônicas qualificadas, ou em conformidade com a regulamentação GOV.BR para assinaturas eletrônicas avançadas;</p><p><b>Reprovado</b>: Assinatura não mantém conformidade com a regulamentação da ICP Brasil, no caso de assinaturas eletrônicas qualificadas, ou não mantém conformidade com a regulamentação GOV.BR para assinaturas eletrônicas avançadas;</p><p><b>Indeterminado</b>: Informações disponíveis são insuficientes para afirmar se a assinatura está em conformidade ou não com as regulamentações da ICP-Brasil, no caso de assinaturas eletrônicas qualificadas, ou com a regulamentação GOV.BR para assinaturas eletrônicas avançadas.</p><p>A consulta poderá resultar nas seguintes mensagens de erro:</p><ul class="text-left"><li><p class="m-0">Documento sem assinatura ou com assinatura corrompida;</p></li><li><p class="m-0">QR Code gerado com erro;</p></li><li><p class="m-0">O formato de arquivo não é suportado, por favor envie um arquivo no formato pdf, xml ou p7s;</p></li><li><p class="m-0">A API está fora do ar, por favor tente novamente mais tarde.</p></li></ul><p>Os documentos eletrônicos em formato PDF admitem o recurso Modification Detection and Prevention (DocMDP) determinado pela ISO-32000-1/2008 (Document management - Portable document format, Part 1: PDF 1.7), que, quando corretamente implementado, permite verificar se o documento foi ou não modificado após a assinatura. Por isso, caso o software utilizado para assinar documentos PDF não tenha implementado esse recurso, o resultado poderá ser reconhecido como “Indeterminado” pelo VALIDAR.</p><p>Ressaltamos que essa capacidade de indeterminar a assinatura de um documento modificado após assinatura foi inserida em março de 2022 no antigo serviço https://verificador.iti.gov.br de modo opcional. No entanto, com a extinção do Verificador (e sua unificação ao Validar) tal critério, antes opcional, passou a ser obrigatório. Com isso, é possível que assinaturas antes consideradas válidas passem a obter, como resultado, a mensagem "assinatura indeterminada"</p><p> Esses resultados não implicam, necessariamente, que o arquivo assinado digitalmente seja aprovado ou reprovado ou que as declarações nele constantes e seu signatário sejam verdadeiros ou não.</p><br><h5><b>Responsabilidades do usuário</b></h5><p>O usuário se responsabiliza pela conformidade dos documentos, dados e procedimentos e reconhece que a imprecisão destes poderá causar a impossibilidade de se obter a validação de documentos eletrônicos através do serviço.</p><p>Durante a utilização do serviço, a fim de não sobrecarregar o serviço de informação ao cidadão, o usuário se compromete a consultar se as suas dúvidas já foram sanadas e disponibilizadas no link:<a href="duvidas.html"> https://validar.iti.gov.br/duvidas.html</a>.</p><p>O usuário do serviço se compromete à leitura e atendimento dos requisitos constantes na Cartilha de Uso e no Guia de Boas Práticas, sendo responsável pelas consequências no descuido ou erros decorrentes da sua não-observância.</p><p>O usuário é responsável pela reparação de todos e quaisquer danos, diretos ou indiretos (inclusive decorrentes do desrespeito de quaisquer direitos de outros usuários, de terceiros, inclusive direitos de propriedade intelectual, de segredo e de personalidade), que sejam causados ao ITI, à Administração Pública, a qualquer outro usuário, ou, ainda, a qualquer terceiro, inclusive no ato do descumprimento do estabelecido nestes Termos de Uso ou de qualquer ato praticado a partir de seu acesso ao serviço.</p><br><h5><b>Garantias do ITI</b></h5><p>O Instituto Nacional de Tecnologia da Informação - ITI, como provedor do serviço, se isenta de garantias expressas ou tácitas, incluindo, sem limitações, quaisquer garantias implícitas de comerciabilidade relacionada ao arquivo contendo assinatura eletrônica qualificada ou avançada submetida ao serviço.</p><p>O usuário que aceita este termo fica ciente da forma como o serviço se apresenta, independentemente da versão disponibilizada, não podendo reclamar por falhas ou falta de função, sendo que qualquer pedido de correção devidamente evidenciada poderá ser encaminhado ao ITI, que fará análises, sem, entretanto, garantir a alteração ou prestação de suporte técnico.</p><br><h5><b>Responsabilidades do ITI</b></h5><p>O ITI se compromete em cumprir todas as legislações relativas ao uso correto dos dados pessoais do cidadão, bem como a garantir todos os direitos e garantias legais dos usuários.</p><p>Se compromete ainda a divulgar, em local de fácil acesso, no âmbito de suas competências, informações de interesse coletivo ou geral produzidas ou custodiadas.</p><p>O ITI não se responsabiliza pelo conteúdo do documento eletrônico submetido ao portal VALIDAR ou comprometimentos que dele resultem, ou pela eventual atualização das bases de dados de terceiros, quando disponíveis, para complementar alguma informação relevante contida nos documentos submetidos.</p><p>Em nenhuma hipótese o ITI será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, exemplares ou consequentes, (incluindo, sem limitação, fornecimento de bens ou serviços substitutos, perda de uso ou dados, lucros cessantes ou interrupção de atividades), causados por quaisquer motivos e sob qualquer teoria de responsabilidade, seja responsabilidade contratual, restrita, ilícito civil, ou qualquer outra, como decorrência de uso do VALIDAR, mesmo que tenham sido avisados da possibilidade de tais danos.</p><p>O VALIDAR se destina ao uso aberto e livre de ônus tanto para pessoas físicas quanto para pessoas jurídicas, não implicando em compromisso ou vínculo comercial entre as entidades envolvidas.</p><p>Ao aceitar esse Termo, o usuário declara ciência de possíveis indisponibilidades ou instabilidades decorrentes de manutenções, ajustes ou mesmo correções, realizadas sem a necessidade de aviso prévio, justificativa de motivos e prazos a fim de corrigir falhas e para verificar a conformidade ao Padrão Brasileiro de Assinaturas Digitais (PBAD), descrito no conjunto normativo DOC-ICP-15, padrões correlatos e legislações aplicáveis.</p><p>O usuário que aceita este termo toma ciência da forma como o VALIDAR se apresenta, independentemente da versão disponibilizada. Por isso, não pode reclamar por falhas ou falta de função, sendo que qualquer pedido de correção devidamente evidenciada poderá ser encaminhado ao ITI. Nesses casos, o Instituto buscará fazer análises, sem, entretanto, garantir a alteração ou prestação de suporte técnico.</p><p>O ITI resguarda-se no direito de propor quaisquer ações cíveis, penais e administrativas relacionadas ao não cumprimento do disposto neste Termo. Fica eleito, desde já, o foro federal da cidade de Brasília-DF, em detrimento de qualquer outro, por mais especial que seja.</p><p>Fica, por fim, reservado ao ITI o direito de alterar o presente Termo a qualquer momento sem prévio aviso.</p><p>Versão 1.1</P>',
      confirmButtonText: "Estou de acordo",
      showCancelButton: true,
      cancelButtonText: "Fechar",
      customClass: {
        popup: "swal-popup",
        content: "swal-content",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("acceptTerms").click();
      }
    });
  } else if (lin == "espanhol") {
    Swal.fire({
      width: "1000px",
      html: '<h3><b>TÉRMINOS DE USO Y POLÍTICA DE PRIVACIDAD</b></h3><br><p>Este término está de acuerdo <a href="https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303">(Ordenanza ITI N° 22, del 28 de septiembre de 2023)</a></p><h5 class="mt-3"><b>Información en este documento</b></h5><p>En estos términos, el usuario del servicio VALIDAR encontrará información sobre:</p><ul class = "text-left"><li><p class="m-0">Aceptación de los términos;</p></li><li><p class="m-0">Descripción del servicio;</p></li><li><p class="m-0">Ley aplicable;</p></li><li><p class="m-0">Tratamiento de datos;</p></li><li><p class="m-0">Resultados obtenidos;</p></li><li><p class="m-0">Responsabilidades del usuario;</p></li><li><p class="m-0">Garantías del ITI;</p></li><li><p class="m-0">Responsabilidades del ITI.</p></li></ul><br><h5><b>Aceptación de los términos</b></h5><p>Al utilizar el servicio, usted confirma haber leído y comprendido los Términos de Uso y la Política de Privacidad aplicables al servicio solicitado, y acepta quedar vinculado a ellos.</p><br><h5><b>Descripción del servicio</b></h5><p>Lanzado el 19 de diciembre de 2022, VALIDAR unifica y reemplaza otros dos portales de servicios: www.assinaturadigital.iti.gov.br y www.verificador.iti.gov.br.</p><p>El servicio permite verificar únicamente el estado de una firma electrónica, ya sea avanzada o cualificada, en cuanto a su integridad y autoría, en documentos firmados digitalmente mediante certificados emitidos en el ámbito de ICP-Brasil u otras infraestructuras reconocidas oficialmente en Brasil, como la firma avanzada producida en el portal GOV.BR. No es posible verificar la veracidad del contenido de los documentos presentados.</p><p>Este servicio también incluye la presentación de documentos cuyas firmas electrónicas han sido proporcionadas por infraestructuras de clave pública oficiales de otros países.</p><br><h5><b>Ley aplicable</b></h5><p>VALIDAR cumple con las disposiciones legales, como la regulación de ICP-Brasil y las definiciones contenidas tanto en la Medida Provisional nº 2.200-2 del 24 de agosto de 2001, como en la Ley nº 14.063 del 23 de septiembre de 2020 y en el Decreto nº 10.543 del 13 de noviembre de 2020. También se ajusta al Acuerdo de Reconocimiento Mutuo de Firmas Digitales del Mercosur y otros acuerdos, convenios y tratados de reconocimiento técnico de firmas electrónicas de los cuales Brasil sea signatario.</p><p>Cabe destacar que el servicio también considera las firmas proporcionadas por certificados digitales emitidos por la cadena de confianza de Adobe. Esto se debe a que el ITI representa a Brasil en el programa Adobe Approved Trust List, según el acuerdo firmado entre ITI y esa empresa.</p><p>Además, solo se pueden verificar archivos producidos en los formatos CMS CAdES, XAdES y PAdES en las modalidades integradas o destacadas, según lo establecido en la Resolución CG ICP-Brasil nº 182 del 18 de febrero de 2021 y en el Decreto Conjunto ITI/CC/PR SGD/SEDGG/ME nº 1 del 08 de septiembre de 2021.</p><p>La Resolución CG ICP-Brasil 182/2021 ofrece una visión general de las firmas digitales, define los conceptos principales y enumera otros documentos que forman parte de las normas de ICP-Brasil sobre el tema. Por su parte, el Decreto Conjunto ITI/CC/PR SGD/SEDGG/ME 1/2021 establece los estándares criptográficos de referencia para las firmas electrónicas avanzadas en las comunicaciones que involucren a la administración pública federal directa, autónoma y fundamental.</p><br><h5><b>Tratamiento de datos</b></h5><p>Durante la navegación, el portal VALIDAR utiliza cookies propios (primarios), es decir, de los dominios validar.iti.gov.br y validar.iti.br, para registrar las configuraciones y preferencias de navegación de los usuarios y generar informes estadísticos a través de Google Analytics, así como cookies de terceros para complementar estas estadísticas. La configuración de Google Analytics para los dominios mencionados no permite que se almacenen y/o transmitan datos personales y el documento firmado objeto de validación a terceros.</p><p>El servicio descarta el documento enviado para su verificación tan pronto como finaliza la validación de las firmas, para lo cual es necesario calcular el hash (resumen criptográfico) del documento y compararlo con el hash de la firma. Los datos obtenidos a través de documentos enviados por los usuarios a través de los canales de atención, como Fala.BR y el correo electrónico institucional del ITI, se tratan exclusivamente para analizar la consulta del usuario y se descartan posteriormente.</p><p>Con el fin de informar el resultado de la verificación de los documentos firmados electrónicamente, el portal VALIDAR realiza el tratamiento de los siguientes datos personales de los documentos enviados por los usuarios:</p><ul class ="text-left"><li><p class="m-0">Nombre;</p></li><li><p class="m-0">CPF (número de identificación personal en Brasil);</p></li><li><p class="m-0">Registro profesional, cuando el documento contenga atributos de identificación profesional.</p></li></ul><p>El ITI se compromete a presentar el CPF del(os) firmante(s) de forma anonimizada para proteger los datos del ciudadano.</p><br><h5><b>Resultados obtenidos</b></h5><p>El resultado exitoso de la verificación de un archivo firmado digitalmente con certificado ICP-Brasil o GOV.BR, cuando se envía a VALIDAR, puede dar lugar a las siguientes situaciones: <b>Aprobado, Reprobado</b> o <b>Indeterminado</b>, de acuerdo con la norma ETSI EN 319 102-1 V1.1.1. (2016-05), y la legislación aplicable, que son las siguientes:</p><p><b>Aprobado</b>: la firma cumple con la normativa de ICP-Brasil en el caso de firmas electrónicas cualificadas, o cumple con la normativa de GOV.BR para firmas electrónicas avanzadas;</p><p><b>Reprobado</b>: la firma no cumple con la normativa de ICP-Brasil en el caso de firmas electrónicas cualificadas, o no cumple con la normativa de GOV.BR para firmas electrónicas avanzadas;</p><p><b>Indeterminado</b>: la información disponible es insuficiente para afirmar si la firma cumple o no con las normativas de ICP-Brasil en el caso de firmas electrónicas cualificadas, o con la normativa de GOV.BR para firmas electrónicas avanzadas.</p><p>La consulta puede resultar en los siguientes mensajes de error:</p><ul class="text-left"><li><p class="m-0">Documento sin firma o con firma corrupta;</p></li><li><p class="m-0">Código QR generado con error;</p></li><li><p class="m-0">El formato de archivo no es compatible, por favor envía un archivo en formato pdf, xml o p7s;</p></li><li><p class="m-0">La API no está disponible, por favor intenta nuevamente más tarde.</p></li></ul><p>Los documentos electrónicos en formato PDF admiten la función de Detección y Prevención de Modificaciones (DocMDP) establecida por la norma ISO-32000-1/2008 (Gestión de documentos: Formato de documento portátil, Parte 1: PDF 1.7), la cual, cuando se implementa correctamente, permite verificar si el documento ha sido modificado o no después de la firma. Por lo tanto, si el software utilizado para firmar documentos PDF no ha implementado esta función, el resultado puede ser reconocido como "Indeterminado" por VALIDAR.</p><p>Queremos destacar que esta capacidad de indeterminar una firma en un documento modificado después de la firma se introdujo en marzo de 2022 en el antiguo servicio https://verificador.iti.gov.br de forma opcional. Sin embargo, con la extinción de Verificador (y su integración a Validar), este criterio, antes opcional, se ha vuelto obligatorio. Por lo tanto, es posible que las firmas que antes se consideraban válidas ahora obtengan como resultado el mensaje "firma indeterminada".</p><p>Estos resultados no implican necesariamente que el archivo firmado digitalmente sea aprobado o rechazado, ni que las declaraciones contenidas en él y su firmante sean verdaderas o falsas.</p><br><h5><b>Responsabilidades del usuario</b></h5><p>El usuario es responsable de la conformidad de los documentos, datos y procedimientos, y reconoce que la imprecisión de los mismos puede hacer que sea imposible validar los documentos electrónicos a través del servicio.</p><p>Durante el uso del servicio, con el fin de no sobrecargar el servicio de información al ciudadano, el usuario se compromete a consultar si sus preguntas ya han sido respondidas y están disponibles en el siguiente enlace: <a href="duvidas.html">https://validar.iti.gov.br/duvidas.html</a>.</p><p>El usuario comprende que los documentos solo pueden ser validados si provienen de certificados digitales ICP-Brasil que sean válidos en el momento del envío, o de firmas GOV.BR o de acuerdos transfronterizos. El usuario del servicio también se compromete a leer y cumplir con los requisitos establecidos en la Cartilla de Uso y en la Guía de Buenas Prácticas, siendo responsable de las consecuencias derivadas de su falta de atención o errores debido a su incumplimiento.</p><p>El usuario es responsable de indemnizar todos y cada uno de los daños, directos o indirectos (incluyendo los derivados de la violación de los derechos de otros usuarios, terceros, incluyendo los derechos de propiedad intelectual, de secreto y de personalidad), que sean causados al ITI, a la Administración Pública, a cualquier otro usuario o a cualquier tercero, incluso en caso de incumplimiento de lo establecido en estos Términos de Uso o de cualquier acto realizado a partir de su acceso al servicio.</p><br><h5><b>Garantías del ITI</b></h5><p>El Instituto Nacional de Tecnología de la Información - ITI, como proveedor del servicio, se exime de cualquier garantía expresa o implícita, incluyendo, sin limitaciones, cualquier garantía implícita de comerciabilidad relacionada con el archivo que contiene la firma electrónica cualificada o avanzada enviada al servicio.</p><p>El usuario que acepta estos términos está consciente de cómo se presenta el servicio, independientemente de la versión disponible, y no puede reclamar fallas o falta de funcionalidad. Cualquier solicitud de corrección debidamente fundamentada puede ser enviada al ITI, el cual realizará análisis sin garantizar cambios o soporte técnico.</p><br><h5><b>Responsabilidades del ITI</b></h5><p>El ITI se compromete a cumplir con todas las leyes relacionadas con el uso correcto de los datos personales del ciudadano, así como a garantizar todos los derechos y garantías legales de los usuarios.</p><p>También se compromete a divulgar, en un lugar de fácil acceso y dentro de sus competencias, información de interés colectivo o general producida o custodiada.</p><p>El ITI no se responsabiliza por el contenido del documento electrónico enviado al portal VALIDAR o por los compromisos derivados del mismo, ni por la eventual actualización de las bases de datos de terceros, cuando estén disponibles, para complementar alguna información relevante contenida en los documentos enviados.</p><p>En ningún caso el ITI será responsable de ningún daño directo, indirecto, incidental, especial, ejemplar o consecuencial (incluyendo, sin limitación, la provisión de bienes o servicios sustitutos, la pérdida de uso o datos, la pérdida de beneficios o la interrupción de actividades), causados por cualquier motivo y bajo cualquier teoría de responsabilidad, ya sea responsabilidad contractual, responsabilidad civil restringida, responsabilidad extracontractual o cualquier otra, como resultado del uso de VALIDAR, incluso si se les ha informado de la posibilidad de dichos daños.</p><p>VALIDAR está destinado al uso abierto y gratuito tanto para personas físicas como jurídicas, sin implicar ningún compromiso o relación comercial entre las entidades involucradas.</p><p>Ao aceptar este Término, el usuario declara su conocimiento de posibles indisponibilidades o inestabilidades resultantes de mantenimientos, ajustes o correcciones realizados sin necesidad de previo aviso, justificación de motivos y plazos, con el fin de corregir fallas y verificar la conformidad con el Estándar Brasileño de Firmas Digitales (PBAD), descrito en la normativa DOC-ICP15-x, estándares relacionados y legislaciones aplicables.</p><p>El usuario que acepta este término reconoce la forma en que VALIDAR se presenta, independientemente de la versión disponible. Por lo tanto, no puede quejarse de fallas o falta de función, y cualquier solicitud de corrección debidamente fundamentada puede ser enviada al ITI. En estos casos, el Instituto realizará análisis, sin embargo, no garantizará cambios o soporte técnico.</p><p>El ITI se reserva el derecho de emprender acciones civiles, penales y administrativas relacionadas con el incumplimiento de lo establecido en este Término. Se elige, desde ya, el foro federal de la ciudad de Brasília-DF, en detrimento de cualquier otro, por más especial que sea.</p><p>Finalmente, el ITI se reserva el derecho de modificar este Término en cualquier momento sin previo aviso.</p><p>La presente versión de este Término se actualizó el <a href="https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303"> https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303.</a></p>',
      confirmButtonText: "Estoy de acuerdo",
      showCancelButton: true,
      cancelButtonText: "Cerca",
      customClass: {
        popup: "swal-popup",
        content: "swal-content",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("acceptTerms").click();
      }
    });
  } else if (lin == "ingles") {
    Swal.fire({
      width: "1000px",
      html: '<h3><b>Terms of Use and Privacy Policy</b></h3><br><p>This term is in accordance <a href="https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303">(Ordinance ITI No. 22, dated September 28, 2023)</a></p><h5 class="mt-3"><b>Information in this document</b></h5><p>In this Terms of Use, the user of the VALIDAR service will find information about:</p><ul class="text-left"><li><p class="m-0">Acceptance of the Terms;</p></li><li><p class="m-0">Description of the service;</p></li><li><p class="m-0">Applicable legislation;</p></li><li><p class="m-0">Data processing;</p></li><li><p class="m-0">Results obtained;</p></li><li><p class="m-0">User responsibilities;</p></li><li><p class="m-0">ITI warranties;</p></li><li><p class="m-0">ITI responsibilities.</p></li></ul><br><h5><b>Acceptance of the Terms</b></h5><p>By using the service, you confirm that you have read, understood the applicable Terms of Use and Privacy Policy, and agree to be bound by them.</p><br><h5><b>Description of the service</b></h5><p>Launched on December 19, 2022, VALIDAR unifies and replaces two other service portals: www.assinaturadigital.iti.gov.br and www.verificador.iti.gov.br.</p><p>The service allows for verifying only the status of an electronic signature, whether advanced or qualified, regarding integrity and authorship, in digitally signed documents by certificates issued within the scope of ICP-Brasil or by other infrastructures officially recognized in Brazil, such as the advanced signature produced within the GOV.BR portal. It is not possible to verify the veracity of the content of the submitted documents.</p><p>This service also includes the submission of documents whose electronic signatures have been provided by official public key infrastructures of other countries.</p><br><h5><b>Applicable legislation</b></h5><p>VALIDAR complies with legal provisions, such as the regulation of ICP-Brasil and the definitions contained in both Provisional Measure No. 2,200-2 of August 24, 2001, and Law No. 14,063 of September 23, 2020, and Decree No. 10,543 of November 13, 2020. It also complies with the Mutual Recognition Agreement of Digital Signatures of Mercosur and any other agreements, conventions, and treaties of technical recognition of electronic signatures of which Brazil is a signatory.</p><p>It should be noted that the service also considers signatures provided by digital certificates from the Adobe trust chain. This is because ITI represents Brazil in the Adobe Approved Trust List program, as per the agreement signed between ITI and that company.</p><p>In addition, only files produced in CMS CAdES, XAdES, and PAdES formats in embedded or detached modes, as provided in CG ICP-Brasil Resolution No. 182 of February 18, 2021, and Joint Ordinance ITI/CC/PR SGD/SEDGG/ME No. 1 of September 8, 2021, are subject to verification.</p><p>CG ICP-Brasil Resolution 182/2021 provides an overview of digital signatures, defines key concepts, and lists other documents that make up the ICP-Brasil standards on the subject. Joint Ordinance ITI/CC/PR SGD/SEDGG/ME 1/2021 establishes the reference cryptographic standards for advanced electronic signatures in communications involving the direct federal public administration, autarkic entities, and foundations.</p></p><br><h5><b>Data processing</b></h5><p>During navigation, the VALIDAR portal uses its own (primary) cookies, that is, from the domains validar.iti.gov.br and validar.iti.br, to record users  browsing settings and preferences and generate statistical reports through Google Analytics. It also uses third-party cookies to complement these statistics. The Google Analytics configuration for the mentioned domains does not allow personal data and the signed document subject to validation to be stored and/or passed on to third parties.</p><p>The service discards the document submitted for verification as soon as the signature validation is completed. To do so, it needs to calculate the hash (cryptographic digest) of the document and compare it with the hash of the signature. Data obtained through documents submitted by users through the service channels, including Fala.BR and ITI institutional email, are exclusively processed to analyze the users query and subsequently discarded.</p><p>For the purpose of informing the result of the verification of electronically signed documents, the VALIDAR portal processes the following personal data from the documents submitted by users:</p><ul class="text-left"><li><p class="m-0">Name;</p></li><li><p class="m-0">CPF (Brazilian Individual Taxpayer Registry number);</p></li><li><p class="m-0">Professional Registration, when the document contains a professional identification attribute.</p></li></ul><p>ITI commits to present the CPF(s) of the signer(s) in an anonymized manner in order to protect the individuals data.</p><br><h5><b>Results obtained</b></h5><p>The successful result of verifying a digitally signed file with an ICP-Brasil or GOV.BR certificate, when submitted to VALIDAR, may result in the following situations: <b>Approved, Rejected</b>, or <b>Indeterminate</b>, in accordance with the ETSI EN 319 102-1 V1.1.1 standard (2016-05) and applicable legislation, as follows:</p><p><b>Approved</b>: Signature in compliance with the ICP-Brasil regulations, in the case of qualified electronic signatures, or in compliance with the GOV.BR regulations for advanced electronic signatures;</p><p><b>Rejected</b>: Signature does not comply with the ICP-Brasil regulations, in the case of qualified electronic signatures, or does not comply with the GOV.BR regulations for advanced electronic signatures;</p><p><b>Indeterminate</b>: Available information is insufficient to assert whether the signature is compliant or not with the ICP-Brasil regulations, in the case of qualified electronic signatures, or with the GOV.BR regulations for advanced electronic signatures.</p><p>The query may result in the following error messages:</p><ul class="text-left"><li><p class="m-0">Document without a signature or with a corrupted signature;</p></li><li><p class="m-0">QR Code generated with an error;</p></li><li><p class="m-0">The file format is not supported, please send a file in PDF, XML, or P7S format;</p></li><li><p class="m-0">The API is offline, please try again later.</p></li></ul><p>Electronic documents in PDF format support the Modification Detection and Prevention (DocMDP) feature determined by ISO-32000-1/2008 (Document management - Portable document format, Part 1: PDF 1.7), which, when properly implemented, allows checking whether the document has been modified after the signature. Therefore, if the software used to sign PDF documents has not implemented this feature, the result may be recognized as "Indeterminate" by VALIDAR.</p><p>We emphasize that this capability to indetermine the signature of a document modified after signing was introduced in March 2022 in the former service https://verificador.iti.gov.br as an optional feature. However, with the extinction of Verificador (and its unification with Validar), this criterion, previously optional, became mandatory. As a result, signatures that were previously considered valid may now receive the "indeterminate signature" message as a result.</p><p>These results do not necessarily imply that the digitally signed file is approved or rejected or that the statements contained therein and their signer are true or false.</p><br><h5><b>User responsibilities</b></h5><p>The user is responsible for the compliance of the documents, data, and procedures and acknowledges that the inaccuracy of these may result in the impossibility of obtaining validation of electronic documents through the service.</p><p>During the use of the service, in order to avoid overloading the citizen information service, the user agrees to check if their questions have already been answered and made available at the following link: <a href="duvidas.html">https://validar.iti.gov.br/duvidas.html</a>.</p><p>The user understands that the documents can only be validated if they come from ICP-Brasil digital certificates that are valid at the time of submission or GOV.BR signatures or originate from cross-border agreements. The user of the service also undertakes to read and comply with the requirements set forth in the "Cartilha de Uso" and the "Guia de Boas Práticas" (Best Practices Guide), being responsible for the consequences of neglect or errors resulting from non-compliance.</p><p>The user is responsible for the repair of any and all damages, direct or indirect (including those resulting from the violation of any rights of other users, third parties, including intellectual property rights, trade secrets, and personality rights), caused to ITI, the Public Administration, any other user, or any third party, including non-compliance with these Terms of Use or any act performed based on their access to the service.</p><br><h5><b>ITI Guarantees</b></h5><p>The National Institute of Information Technology - ITI, as the service provider, disclaims any express or implied warranties, including, without limitation, any implied warranties of merchantability related to the file containing the qualified or advanced electronic signature submitted to the service.</p><p>The user who accepts these terms is aware of how the service is presented, regardless of the version made available, and cannot complain about failures or lack of functionality. However, any duly evidenced request for correction may be sent to ITI, which will conduct analyses without guaranteeing any changes or provision of technical support.</p><br><h5><b>ITI Responsibilities</b></h5><p>The ITI is committed to complying with all legislation related to the correct use of citizens personal data, as well as ensuring all rights and legal guarantees of users.</p><p>It also commits to disclose, in an easily accessible location within its competencies, information of collective or general interest produced or held.</p><p>The ITI is not responsible for the content of the electronic document submitted to the VALIDAR portal or any commitments resulting from it, or for the eventual updating of third-party databases, when available, to complement any relevant information contained in the submitted documents.</p><p>In no event shall the ITI be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, without limitation, procurement of substitute goods or services, loss of use or data, loss of profits, or interruption of business), arising out of any cause and under any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise), arising in any way from the use of VALIDAR, even if advised of the possibility of such damages.</p><p>VALIDAR is intended for open and free use, both for individuals and legal entities, without implying any commitment or commercial relationship between the entities involved.</p><p>By accepting this Agreement, the user acknowledges the possibility of unavailability or instability resulting from maintenance, adjustments, or even corrections made without prior notice, justification, or deadlines to correct errors and ensure compliance with the Brazilian Digital Signature Standard (PBAD), as described in normative DOC-ICP15-x, related standards, and applicable legislation.</p><p>The user who accepts this Agreement acknowledges the way VALIDAR is presented, regardless of the version made available, and cannot complain about failures or lack of functionality. However, any duly evidenced request for correction may be submitted to the ITI. In such cases, the Institute will seek to conduct analyses without guaranteeing any changes or provision of technical support.</p><p>The ITI reserves the right to propose any civil, criminal, and administrative actions related to non-compliance with the provisions of this Agreement. The federal court of the city of Brasília-DF is elected as the competent jurisdiction, to the detriment of any other, however special it may be.</p><p>Finally, the ITI reserves the right to modify this Agreement at any time without prior notice.</p><p>This version of the Agreement was last updated on <a href="https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303"> https://www.in.gov.br/en/web/dou/-/portaria-iti-n-22-de-28-de-setembro-de-2023-513844303.</a></p>',
      confirmButtonText: "I agree",
      showCancelButton: true,
      cancelButtonText: "Close",
      customClass: {
        popup: "swal-popup",
        content: "swal-content",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("acceptTerms").click();
      }
    });
  }
}

function clickcheckBox() {
  chkbx = document.getElementById("acceptTerms");
  if ((chkbx.checked = true)) {
    chkbx.disabled = true;
  }
}

$(document).ready(function () {
  $(document).on("click", "#botaoVisualizarDoc", function () {
    Swal.fire({
      icon: "warning",
      text: "Você será redirecionado para uma URL externa fornecida pelo provedor do documento.",
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        urlqr = sessionStorage.getItem("urlQr");
        var windowFeatures = "width=1000,height=1000";
        window.open(urlqr, "_blank", windowFeatures);
      }
    });
  });
});

//

//cookies

cake = localStorage.getItem("cake");
if (cake == null) {
  document.write(
    '<div class="cookie p-4" id="cookie"><div class="divCookie row justify-content-center"><div class="cookieText col">Utizamos cookies para garantir uma análise de dados. Ao aceitar nossos cookies, você estará concordando em ter certos dados de navegação analisados de forma anônima, para melhoria de nosso serviço. No entanto, se você optar por rejeitar cookies, os cookies que não forem estritamente necessários serão desativados. Para saber mais, consulte nossos termos de uso.</div><div class="buttonDiv col-7 align-self-center"><button class="br-button secondary mt-3 mt-sm-0 ml-sm-3 deny grabt" type="button" onclick="cookiebuttonNone()">Rejeitar cookies</button><button type="button" onclick="cookiebutton()" class="br-button secondary mt-3 mt-sm-0 ml-sm-3 deny grabt">Aceitar cookies</button></div></div></div>'
  );
}
function cookiebutton() {
  localStorage.setItem("cake", "on");
  location.reload();
}
function cookiebuttonNone() {
  localStorage.setItem("cake", "off");
  document.getElementById("cookie").style.display = "none";
}

//

//file selector

var ifilee = 0;
$(document).ready(function () {
  $("#signature_files").change(function () {
    document.getElementById("filebox").innerHTML = "";
    var i = $(this).prev("filebox").clone();
    var file = $("#signature_files")[0].files[0].name;
    $("#filebox").append("Arquivo escolhido: <strong>" + file + "</strong>");
  });

  $("#detached").click(function () {
    if ($(this).prop("checked")) {
      Swal.fire({
        icon: "warning",
        title: "Aviso",
        html: "Antes de prosseguir, confirme se de fato a assinatura que deseja submeter é uma assinatura do tipo destacada.",
        confirmButtonText: "Confirmar",
        footer: `<a href="./duvidas.html#15" target="_blank">Como saber</a>`,
        didOpen: () => {
          const confirmButton = document.querySelector(".swal2-confirm");
          confirmButton.id = "confirmButton"; // Adiciona um ID personalizado
        },
      }).then((result) => {
        if (result.isConfirmed) {
          $("#signature_files_detached").toggle("slow");
          $("#fileselectorbutton").attr(
            "title",
            $(this).is(":checked")
              ? "Formatos aceitos: Todos"
              : "Formatos aceitos: pdf, xml ou p7s"
          );
        } else {
          $(this).prop("checked", false);
        }
      });
    } else {
      $("#signature_files_detached").toggle("slow");
    }
  });

  $("#signature_files_detached").change(function () {
    document.getElementById("fileboxDestacada").innerHTML = "";
    var i = $(this).prev("fileboxDestacada").clone();
    var file = $("#signature_filesDetached")[0].files[0].name;
    $("#fileboxDestacada").append(
      "Arquivo escolhido: <strong>" + file + "</strong>"
    );
  });

  $(document).on("click", "#btnFloating", function () {
    // $('.bnt-accordion-gov').toggle('slow')
    var attr = $(".bnt-accordion-gov").attr("active");

    if (typeof attr !== "undefined" && attr !== false) {
      $(".bnt-accordion-gov").removeAttr("active");
      $(".bnt-accordion-gov").attr("id", "fechado");
      $("#btnFloating").text("Expandir Elementos");
      // Scroll até o topo da página
      $("html, body").animate({ scrollTop: 0 }, "fast");
    } else {
      $(".bnt-accordion-gov").attr("active", "");
      $(".bnt-accordion-gov").attr("id", "aberto");
      $("#btnFloating").text("Fechar Elementos");
    }
  });
});

//

//Reinicia as checkbox
$(document).ready(function () {
  $("#detached").prop("checked", false);
  $("#acceptTerms").prop("checked", false);
});
//

/*$(document).ready(function () {
  $('.cpf').mask('000.000.000-00');
  $('.phone').mask('(99) 99999-9999');
  $('.cnpj').mask('00.000.000/0000-00');

});*/

function imprimir() {
  window.print();
}

function preImpressao() {
  sessionStorage.setItem("imprimir", true);
  window.location.reload();
}

// Função apara ajuste do botão de pesquisar
function screenAdjustment() {
  const headerElement = document.querySelector("header");
  const cssBugHeader = document.getElementById("createDiv");

  if (headerElement.classList.contains("sticky")) {
    if (cssBugHeader.childElementCount > 0) {
      document.getElementById("search").classList.add("active");
    }
    cssBugHeader.classList.add("cssBug");
  } else {
    cssBugHeader.classList.remove("cssBug");
  }
}

window.addEventListener("scroll", screenAdjustment);

// Função para rodar o carousel a cada 10 segundos
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("relatorio.html")) {
    return;
  }
  var carousel = document.querySelector(".br-carousel");
  var nextButton = carousel.querySelector(".carousel-btn-next");
  var prevButton = carousel.querySelector(".carousel-btn-prev");
  var slides = carousel.querySelectorAll(".carousel-page");

  var currentSlideIndex = 0;

  function showSlide(index) {
    slides.forEach(function (slide, i) {
      if (i === index) {
        slide.setAttribute("active", "active");
      } else {
        slide.removeAttribute("active");
      }
    });
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
  }

  nextButton.addEventListener("click", function () {
    setTimeout(function () {
      nextSlide();
    }, 50);
  });

  prevButton.addEventListener("click", function () {
    setTimeout(function () {
      prevSlide();
    }, 50);
  });

  function autoRotate() {
    setInterval(function () {
      nextSlide();
    }, 10000); // 10 s segundos
  }

  autoRotate();
});
