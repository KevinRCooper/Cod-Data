import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { extractTableFromHtml } from "@/utils/htmlTableProcessor";

export default function DropzoneComponent() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const overrideNoFormatColumns = ["Match ID", "Another Column"];

  const parseHtmlFile = (file: File): Promise<Document> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(event.target.result as string, "text/html");
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

  const calculateColumnWidth = (header: string, firstRowValue: unknown): number => {
    const padding = 20;
    const baseWidth = 10;

    const headerLength = header.length;
    const valueLength = firstRowValue ? firstRowValue.toString().length : 0;

    const maxLength = Math.max(headerLength, valueLength);
    return maxLength * baseWidth + padding;
  };

  const parseTable = (table: HTMLTableElement) => {
    const headers = Array.from(table.querySelectorAll("th")).map((th) =>
      th.textContent?.trim() || "Unnamed"
    );

    const rows = Array.from(table.querySelectorAll("tr"))
      .slice(1)
      .map((tr, rowIndex) => {
        const cells = Array.from(tr.querySelectorAll("td")).map((td) => {
          const cellValue = td.textContent?.trim();
          return isNumeric(cellValue) ? Number(cellValue) : cellValue || "";
        });

        const row: Record<string, unknown> = { id: rowIndex + 1 };
        headers.forEach((header, index) => {
          row[header] = cells[index];
        });
        return row;
      });

    const firstRow = rows[0] || {};
    const columns: GridColDef[] = headers.map((header) => ({
      field: header,
      headerName: header,
      width: calculateColumnWidth(header, firstRow[header] || ""),
      type: isNumeric(firstRow[header]) ? "number" : "string",
      sortable: true,
      renderCell: (params) => formatCellValue(params.value, header),
    }));

    return { columns, rows };
  };

  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const parsedContent = await parseHtmlFile(file);
        const extractedTable = extractTableFromHtml(parsedContent);

        if (extractedTable) {
          const tableData = parseTable(extractedTable);
          setColumns(tableData.columns);
          setRows(tableData.rows);
        } else {
          console.warn("No table found in the uploaded HTML file.");
          setColumns([]);
          setRows([]);
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        setColumns([]);
        setRows([]);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/html": [".html"] },
  });

  const formatCellValue = (value: unknown, column: string) => {
    if (overrideNoFormatColumns.includes(column)) {
      return value;
    }

    if (typeof value === "number") {
      return new Intl.NumberFormat("en-US").format(value);
    }

    return value;
  };

  const exportToCSV = () => {
    if (columns.length === 0 || rows.length === 0) {
      console.warn("No data available to export.");
      return;
    }

    const csvHeaders = columns.map((col) => col.headerName).join(",");
    const csvRows = rows.map((row) =>
      columns.map((col) => `"${row[col.field]}"`).join(",")
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px", marginBottom: "20px" }}>
        <input {...getInputProps()} />
        <p>Drag `n` drop an HTML file here, or click to select one</p>
      </div>
      {rows.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>
      )}
      {rows.length > 0 ? (
        <Paper sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 100]}
            checkboxSelection
            sx={{
              border: 0,
              "& .MuiDataGrid-cell": { lineHeight: "1.5rem", alignItems: "center" },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5", fontWeight: "bold" },
            }}
          />
        </Paper>
      ) : (
        <p>No table extracted yet. Please upload a valid HTML file.</p>
      )}
    </div>
  );
}
