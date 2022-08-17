const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;

var button = document.querySelector("#buttonGenerate");
var dataName = document.getElementById("dataName");
var dataAge = document.getElementById("dataAge");
var dataWeight = document.getElementById("dataWeight");
var dataHeight = document.getElementById("dataHeight");
var dataAddress = document.getElementById("dataAddress");
var dataNumber = document.getElementById("dataNumber");
var dataCP = document.getElementById("dataCP");
var dataLada = document.getElementById("dataLada");
var dataCity1 = document.getElementById("dataCity1");
var dataCity2 = document.getElementById("dataCity2");
var dataDate = document.getElementById("dataDate");
var dataDiagnostico = document.getElementById("dataDiagnostico");

// function camelize(str) {
//   return str.replace(/\W+(.)/g, function (match, chr) {
//     return chr.toUpperCase();
//   });
// }

async function pdfMod() {
  const url = "pdf/template.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const courierBoldFont = await pdfDoc.embedFont(StandardFonts.CourierBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  // Draw in PDF
  // Edad
  firstPage.drawText(dataName.value.toUpperCase(), {
    x: 85,
    y: height - 156,
    size: 13,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });
  // Edad
  firstPage.drawText(dataAge.value + " AÑOS", {
    x: 67,
    y: height - 175,
    size: 13,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });
  // Peso
  firstPage.drawText(dataWeight.value + " KG", {
    x: 65,
    y: height - 269,
    size: 11,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });
  // Altura
  var alt = parseFloat(dataHeight.value / 100);
  firstPage.drawText(alt.toFixed(2) + " M", {
    x: 69,
    y: height - 285,
    size: 11,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });
  // IMC
  var IMC = alt * alt;
  IMC = parseFloat(dataWeight.value) / IMC;
  firstPage.drawText(IMC.toFixed(2) + " KG/M2", {
    x: 55,
    y: height - 301,
    size: 11,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });
  // Calle
  var DirL1 =
    dataAddress.value + " #" + dataNumber.value + ", " + dataCity1.value + ",";
  firstPage.drawText(DirL1, {
    x: 238,
    y: height - 64,
    size: 8,
    font: helveticaBoldFont,
    color: rgb(0.149, 0.2314, 0.3686),
  });
  // Calle 2
  var DirL2 = dataCP.value + ", " + dataCity2.value;
  firstPage.drawText(DirL2, {
    x: 268,
    y: height - 73,
    size: 8,
    font: helveticaBoldFont,
    color: rgb(0.149, 0.2314, 0.3686),
  });
  //Numero de telefono 1
  var numberRandom =
    dataLada.value +
    " " +
    Math.floor(Math.random() * 899) +
    " " +
    Math.floor(Math.random() * 8999);
  firstPage.drawText(numberRandom, {
    x: 210,
    y: height - 90,
    size: 8,
    font: helveticaBoldFont,
    color: rgb(0.0941, 0.7882, 0.8275),
  });
  //Numero de telefono 2
  firstPage.drawText(numberRandom, {
    x: 372,
    y: height - 90,
    size: 8,
    font: helveticaBoldFont,
    color: rgb(0.0941, 0.7882, 0.8275),
  });
  // Fecha
  firstPage.drawText(dataDate.value, {
    x: 525,
    y: height - 157,
    size: 11,
    font: courierBoldFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "testing", "application/pdf");
}

button.addEventListener("click", function () {
  var inputsVerify = [
    dataName,
    dataAge,
    dataWeight,
    dataHeight,
    dataAddress,
    dataNumber,
    dataCP,
    dataLada,
    dataCity1,
    dataCity2,
    dataDate,
    dataDiagnostico,
  ];
  //

  //
  inputsVerify.forEach((element) => {
    if (element.value == "") {
      element.classList.add("is-invalid");
    } else {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
    }
  });

  if (dataDiagnostico.value == "---") {
    dataDiagnostico.classList.add("is-invalid");
  } else {
    dataDiagnostico.classList.remove("is-invalid");
    dataDiagnostico.classList.add("is-valid");
  }

  function check(arr) {
    return arr.value !== "";
  }

  if (inputsVerify.every(check)) {
    Swal.fire({
      icon: "info",
      title: "Receta Generada",
      html: "Hey! No olvides dejar la propina ;) </br></br><a href='https://ko-fi.com/K3K1624TG' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Darme una propina' /></a> ",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#29abe0",
      confirmButtonText: "Descargar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Tu archivo se ha descargado.",
        });
        pdfMod();
      }
    });
  } else {
    console.log("Formulario incompleto");
  }
});
