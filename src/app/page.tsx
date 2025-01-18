"use client";
import * as React from "react";
import { useState } from "react";

import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { TableRow } from "@/types/TableRow.types";

import { Introduction } from "@/components/introduction/Introduction";
import StatsGroup from "@/components/stats/Stats";
import { Upload } from "@/components/upload/Upload";
import { CodData } from "@/components/upload/Upload.types";

const HomePage = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [isDropzoneVisible, setIsDropzoneVisible] = useState(true);
  const [data, setData] = useState<CodData | null>(null);

  const handleDataUploaded = (
    newColumns: GridColDef[],
    newRows: TableRow[],
    table: CodData
  ) => {
    setColumns(newColumns);
    setRows(newRows);
    setIsDropzoneVisible(false);
    setData(table);
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
    link.setAttribute("download", "cod_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {/* Intro Section */}
        {isDropzoneVisible && (
          <Introduction />
        )}

        <Grid container spacing={3} justifyContent="center">
          {isDropzoneVisible && (
            <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 8" } }}>
              <Upload onDataUploaded={handleDataUploaded} />
            </Grid>
          )}

          {rows.length > 0 && (
            <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 8" } }}>
              {/* Visualization + Table */}
              <Paper sx={{ p: 0, mb: 3 }}>
                <StatsGroup data={data ?? []} />
              </Paper>

              <TableContainer component={Paper}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={exportToCSV}
                  >
                    Export Data
                  </Button>
                </Box>
                <Box sx={{ height: 750, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 100]}
                    checkboxSelection
                    sx={{
                      border: 0,
                      "& .MuiDataGrid-cell": {
                        lineHeight: "1.5rem",
                        alignItems: "center",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Box>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
