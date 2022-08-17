const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;

async function pdfMod() {
  var dataIMC =
    parseFloat(dataWeight) / (parseFloat(dataHeight) * parseFloat(dataHeight));

  const url = "demo.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const courierFont = await pdfDoc.embedFont(StandardFonts.CourierBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  firstPage.drawText(dataName, {
    x: 87,
    y: height - 156,
    size: 12,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  firstPage.drawText(dataAge + " AÑOS", {
    x: 67,
    y: height - 174,
    size: 12,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  firstPage.drawText(dataWeight + "KG", {
    x: 64,
    y: height - 274,
    size: 12,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  firstPage.drawText(dataHeight + "M", {
    x: 69,
    y: height - 288,
    size: 12,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  firstPage.drawText(dataIMC.toFixed(2).toString() + "KG/M2", {
    x: 55,
    y: height - 303,
    size: 12,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  firstPage.drawText("12-06-22", {
    x: 525,
    y: height - 156,
    size: 11,
    font: courierFont,
    color: rgb(0, 0, 0, 100),
  });

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "RecetaF.pdf", "application/pdf");
}
