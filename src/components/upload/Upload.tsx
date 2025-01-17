import { TableRow } from "@/types/TableRow.types";
import { extractTableFromHtml } from "@/utils/htmlTableProcessor";
import { calculateColumnWidth, formatCellValue, isNumeric, parseFile } from "@/utils/utilities";
import Paper from "@mui/material/Paper";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useDropzone } from "react-dropzone";
import { CodDataRecord, codDataRecordSchema, UploadProps } from "./Upload.types";

export const Upload = ({ onDataUploaded }: UploadProps) => {
    const overrideNoFormatColumns = ["Match ID", "Another Column"];

    const parseTable = (table: HTMLTableElement) => {
        const headers = Array.from(table.querySelectorAll("th")).map(
            (th) => th.textContent?.trim() || "Unnamed"
        );

        // Build rows
        const rowData: TableRow[] = Array.from(table.querySelectorAll("tr"))
            .slice(1) // skip header row
            .map((tr, rowIndex) => {
                const cells = Array.from(tr.querySelectorAll("td")).map((td) => {
                    const cellValue = td.textContent?.trim();
                    return isNumeric(cellValue) ? Number(cellValue) : cellValue || "";
                });

                const row: TableRow = { id: rowIndex + 1 };
                headers.forEach((header, index) => {
                    row[header] = cells[index];
                });
                return row;
            });

        const firstRow = rowData[0] || {};
        const columns: GridColDef[] = headers.map((header) => ({
            field: header,
            headerName: header,
            width: calculateColumnWidth(header, firstRow[header] || ""),
            type: isNumeric(firstRow[header]) ? "number" : "string",
            sortable: true,
            renderCell: (params) => {
                const formattedVal = formatCellValue(params.value, header, overrideNoFormatColumns);
                return <>{String(formattedVal)}</>;
            },
        }));

        const data = rowData
            .map((row) => {
                const validationResult = codDataRecordSchema.safeParse(row);
                return validationResult.success ? validationResult.data : null;
            })
            .filter((row): row is CodDataRecord => row !== null); // Narrow the type to CodDataRecord

        return { columns, rows: rowData, table: data };
    };

    const onDrop = async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            try {
                const parsedContent = await parseFile(file);
                const extractedTable = extractTableFromHtml(parsedContent);

                if (extractedTable) {
                    const tableData = parseTable(extractedTable);
                    // Pass the extracted columns and rows to the parent
                    onDataUploaded(tableData.columns, tableData.rows, tableData.table);
                } else {
                    console.warn("No table found in the uploaded HTML file.");
                    onDataUploaded([], [], []);
                }
            } catch (error) {
                console.error("Error parsing file:", error);
                onDataUploaded([], [], []);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "text/html": [".html"],
            "application/zip": [".zip"],
        },
    });

    return (
        <Paper
            sx={{
                border: "2px dashed #ccc",
                padding: "20px",
                marginBottom: "20px",
                textAlign: "center",
            }}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <p>Drag and drop an HTML/ZIP file here, or click to select one</p>
        </Paper>
    );
};