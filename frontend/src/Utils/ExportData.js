import React from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun } from "docx";

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);

    // Set column widths
    const wscols = [
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
    ];
    ws['!cols'] = wscols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};




export const exportToCSV1 = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wscols = [{ wpx: 1000 }];
    ws["!cols"] = wscols;

    const wsrows = apiData.map(() => ({ hpx: 40 }));
    ws["!rows"] = wsrows;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
};



