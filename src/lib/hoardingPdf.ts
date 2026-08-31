import jsPDF from "jspdf";

export interface PdfHoarding {
  id: string;
  title: string;
  image: string;
  description: string;
  currentPrice: number;
  previousPrice: number;
}

async function imageUrlToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch image");
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function formatRupees(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export async function generateHoardingsPdf(hoardings: PdfHoarding[], cityName: string): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const imgWidth = 55;
  const imgHeight = 40;
  const blockHeight = imgHeight + 10;
  let y = margin;

  const drawPageHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(27, 38, 66);
    doc.text(`${cityName} - Hoarding Locations`, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120);
    const generatedOn = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    doc.text(`Generated on ${generatedOn} - Krishna Publicity`, margin, y);
    y += 10;
  };

  drawPageHeader();

  for (const hoarding of hoardings) {
    if (y + blockHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    try {
      const dataUrl = await imageUrlToDataUrl(hoarding.image);
      const mime = dataUrl.substring(dataUrl.indexOf("/") + 1, dataUrl.indexOf(";"));
      const format = mime.toUpperCase() === "JPG" ? "JPEG" : mime.toUpperCase();
      doc.addImage(dataUrl, format, margin, y, imgWidth, imgHeight, undefined, "FAST");
    } catch {
      doc.setDrawColor(220);
      doc.rect(margin, y, imgWidth, imgHeight);
      doc.setFontSize(8);
      doc.setTextColor(180);
      doc.text("Image unavailable", margin + 8, y + imgHeight / 2);
    }

    const textX = margin + imgWidth + 8;
    let textY = y + 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(27, 38, 66);
    doc.text(hoarding.title, textX, textY);
    textY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90);
    const sizeLines: string[] = doc.splitTextToSize(
      hoarding.description || "Size details not available",
      pageWidth - textX - margin
    );
    doc.text(sizeLines, textX, textY);
    textY += sizeLines.length * 5 + 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(27, 38, 66);
    const priceText = hoarding.currentPrice > 0 ? `Rate: ${formatRupees(hoarding.currentPrice)}` : "Rate: Contact for Price";
    doc.text(priceText, textX, textY);

    if (hoarding.currentPrice > 0 && hoarding.previousPrice > hoarding.currentPrice) {
      const priceTextWidth = doc.getTextWidth(priceText);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(160);
      doc.text(`(was ${formatRupees(hoarding.previousPrice)})`, textX + priceTextWidth + 4, textY);
    }

    doc.setDrawColor(230);
    doc.line(margin, y + blockHeight - 4, pageWidth - margin, y + blockHeight - 4);

    y += blockHeight;
  }

  doc.save(`${cityName.replace(/\s+/g, "-")}-Hoardings-${Date.now()}.pdf`);
}
