import React from "react";
import { useDropzone } from "react-dropzone";
import { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { extractTableFromHtml } from "@/utils/htmlTableProcessor";

// If you prefer to define an interface for your row
interface ITableRow {
    id: number;
    [key: string]: number | string;
}

interface DropzoneProps {
    onDataUploaded: (columns: GridColDef[], rows: ITableRow[]) => void;
}

export default function DropzoneComponent({ onDataUploaded }: DropzoneProps) {
    const overrideNoFormatColumns = ["Match ID", "Another Column"];

    const parseHtmlFile = (file: File): Promise<Document> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target?.result) {
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(
                        event.target.result as string,
                        "text/html"
                    );
                    resolve(htmlDoc);
                } else {
                    reject(new Error("Could not read file"));
                }
            };

            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };

            reader.readAsText(file);
        });
    };

    const isNumeric = (value: unknown): boolean => {
        return typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim());
    };

    const calculateColumnWidth = (
        header: string,
        firstRowValue: unknown
    ): number => {
        const padding = 20;
        const baseWidth = 10;
        const headerLength = header.length;
        const valueLength = firstRowValue ? firstRowValue.toString().length : 0;
        const maxLength = Math.max(headerLength, valueLength);
        return maxLength * baseWidth + padding;
    };

    const formatCellValue = (value: unknown, column: string) => {
        if (overrideNoFormatColumns.includes(column)) {
            return typeof value === "undefined" ? "" : value;
        }

        if (typeof value === "number") {
            return new Intl.NumberFormat("en-US").format(value);
        }

        return (value as string) || "";
    };

    const parseTable = (table: HTMLTableElement) => {
        const headers = Array.from(table.querySelectorAll("th")).map(
            (th) => th.textContent?.trim() || "Unnamed"
        );

        // Build rows
        const rowData: ITableRow[] = Array.from(table.querySelectorAll("tr"))
            .slice(1) // skip header row
            .map((tr, rowIndex) => {
                const cells = Array.from(tr.querySelectorAll("td")).map((td) => {
                    const cellValue = td.textContent?.trim();
                    return isNumeric(cellValue) ? Number(cellValue) : cellValue || "";
                });

                const row: ITableRow = { id: rowIndex + 1 };
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
                const formattedVal = formatCellValue(params.value, header);
                return <>{formattedVal}</>;
            },
        }));

        return { columns, rows: rowData };
    };

    const onDrop = async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            try {
                const parsedContent = await parseHtmlFile(file);
                const extractedTable = extractTableFromHtml(parsedContent);

                if (extractedTable) {
                    const tableData = parseTable(extractedTable);
                    // Pass the extracted columns and rows to the parent
                    onDataUploaded(tableData.columns, tableData.rows);
                } else {
                    console.warn("No table found in the uploaded HTML file.");
                    onDataUploaded([], []);
                }
            } catch (error) {
                console.error("Error parsing file:", error);
                onDataUploaded([], []);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "text/html": [".html"] },
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
            <p>Drag and drop an HTML file here, or click to select one</p>
        </Paper>
    );
}
