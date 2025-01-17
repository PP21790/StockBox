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


export const exportToSingleLineCSV = (apiData, fileName) => {
    const fileType1 = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension1 = ".xlsx";

    // Map API data to an array of arrays with line breaks
    const aoa = apiData.map(item => [
        `Date: ${item.EntryDate || ''}\n` + // Date ke baad line break
        `Segment: ${item.segment || ''}\n` + // Segment ko next line mein daalein
        `Stock Name: ${item.Symbol || ''} | Entry Type: ${item.EntryType || ''} | Entry Price: ${item.EntryPrice || ''}`
    ]);

    // Dynamically calculate column width based on data
    const wscols = aoa[0] ? aoa[0].map(() => ({ wpx: 1000 })) : [{ wpx: 1000 }];
    
    // Set row height (adjust this according to the content)
    const rowHeight = 60;
    
    const rowConfig = aoa.map(() => ({ hpx: rowHeight }));

    // Create worksheet from array of arrays
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // Apply text wrapping for cells with line breaks
    Object.keys(ws).forEach(cell => {
        if (ws[cell].v && ws[cell].v.includes('\n')) {
            ws[cell].s = { alignment: { wrapText: true } };
        }
    });

    // Set dynamic column widths
    ws['!cols'] = wscols;
    
    // Set the row heights
    ws['!rows'] = rowConfig;

    // Create a workbook with the worksheet
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    
    // Write the workbook to an array (buffer)
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    
    // Create a Blob from the buffer and save the file
    const data = new Blob([excelBuffer], { type: fileType1 });
    FileSaver.saveAs(data, fileName + fileExtension1);
};









export const exportToWord = (apiData, fileName) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Exported Data",
                                bold: true,
                                size: 28,
                            }),
                        ],
                        spacing: { after: 300 },
                    }),
                    ...apiData.map((item, index) =>
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${index + 1}. ${Object.entries(item)
                                        .map(([key, value]) => `${key}: ${value}`)
                                        .join(", ")}`,
                                    size: 24,
                                }),
                            ],
                            spacing: { after: 200 },
                        })
                    ),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        FileSaver.saveAs(blob, `${fileName}.docx`);
    }).catch((error) => {
        console.error("Error generating DOCX file:", error);
    });
};
