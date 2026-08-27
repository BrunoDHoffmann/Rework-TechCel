import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LOJA } from "./config.js";

function money(value) {
  if (value === null || value === undefined || value === "") return "—";
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(value) {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Gera e baixa um PDF de ordem de serviço para o cliente.
// includeValues controla se os valores (venda) aparecem no documento.
export function generateServicePDF(service, { includeValues }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 18;

  // Cabeçalho da loja
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(LOJA.nome, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90);
  y += 6;
  doc.text(LOJA.slogan, margin, y);
  y += 4.5;
  doc.text(`${LOJA.telefone}  •  ${LOJA.endereco}`, margin, y);
  y += 4.5;
  doc.text(LOJA.documento, margin, y);
  doc.setTextColor(0);

  // Número da OS e data (canto direito)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`OS Nº ${String(service.id).padStart(4, "0")}`, pageWidth - margin, 18, {
    align: "right",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(formatDate(service.created_at), pageWidth - margin, 24, {
    align: "right",
  });

  // Linha separadora
  y += 4;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Cliente
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Cliente:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(service.client_name || "—", margin + 20, y);
  y += 8;

  // Descrição do serviço
  doc.setFont("helvetica", "bold");
  doc.text("Descrição do serviço", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(
    service.description,
    pageWidth - margin * 2
  );
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 4;

  // Tabela de peças
  const head = includeValues
    ? [["Peça / Item", "Qtd", "Valor unit.", "Subtotal"]]
    : [["Peça / Item", "Qtd"]];

  let total = 0;
  const body = service.items.map((it) => {
    if (includeValues) {
      const hasPrice = it.unit_price !== null && it.unit_price !== undefined;
      const subtotal = hasPrice ? Number(it.unit_price) * it.quantity_used : null;
      if (subtotal !== null) total += subtotal;
      return [
        it.item_name,
        String(it.quantity_used),
        money(it.unit_price),
        money(subtotal),
      ];
    }
    return [it.item_name, String(it.quantity_used)];
  });

  autoTable(doc, {
    startY: y,
    head,
    body,
    margin: { left: margin, right: margin },
    styles: { fontSize: 10, cellPadding: 2.5 },
    headStyles: { fillColor: [15, 23, 42], textColor: 255 },
    columnStyles: includeValues
      ? {
          1: { halign: "center", cellWidth: 18 },
          2: { halign: "right", cellWidth: 32 },
          3: { halign: "right", cellWidth: 32 },
        }
      : { 1: { halign: "center", cellWidth: 25 } },
  });

  let afterTableY = doc.lastAutoTable.finalY + 8;

  // Total
  if (includeValues) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total: ${money(total)}`, pageWidth - margin, afterTableY, {
      align: "right",
    });
    afterTableY += 10;
  }

  // Rodapé
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    `Documento gerado em ${formatDate(new Date().toISOString())}`,
    margin,
    doc.internal.pageSize.getHeight() - 12
  );

  const safeClient = (service.client_name || "cliente")
    .normalize("NFD")
    .replace(/[^\w]+/g, "-")
    .toLowerCase();
  doc.save(`OS-${String(service.id).padStart(4, "0")}-${safeClient}.pdf`);
}
