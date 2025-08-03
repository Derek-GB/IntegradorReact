import * as XLSX from "xlsx";

export default function useExcelExport() {
  const exportToExcel = (data, columns, filename = "datos_exportados") => {
    const exportData = data.map((row) =>
      columns.reduce((acc, col) => {
        const selector = col.selector;
        acc[col.name] = typeof selector === "function" ? selector(row) : row[selector];
        return acc;
      }, {})
    );

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    const today = new Date().toISOString().split("T")[0];
    XLSX.writeFile(wb, `${filename}_${today}.xlsx`);
  };

  return { exportToExcel };
}
