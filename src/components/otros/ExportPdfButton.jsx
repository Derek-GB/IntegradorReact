import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SubmitButton from "../FormComponents/SubmitButton.jsx";

const ExportPdfButton = ({ data = [], headers = [], title = "Reporte", fileName = "reporte.pdf" }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    try {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text(title, 14, 15);

      const tableHeaders = headers.map(h => h.label);
      const tableData = data.map(row => headers.map(h => row[h.key]));

      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        startY: 25,
      });

      setTimeout(() => {
        doc.save(fileName);
        setLoading(false);
      }, 100);
    } catch (error) {
      console.error("Error exportando PDF:", error);
      setLoading(false);
    }
  };

  return (
    <SubmitButton
      type="button"
      loading={loading}
      className={`bg-[#F8B601] font-bold py-3 px-10 rounded-xl transition hover:bg-[#d9a100] focus:outline-none focus:ring-2 focus:ring-[#F8B601]/50 duration-200`}
      onClick={handleExport}
    >
      Exportar PDF
    </SubmitButton>
  );
};

export default ExportPdfButton;
