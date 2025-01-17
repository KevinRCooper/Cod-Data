"use client";
import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "@mui/material/Link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { TableRow } from "@/types/TableRow.types";

/* New components you extracted */
import { Introduction } from "@/components/introduction/Introduction";
import { Upload } from "@/components/upload/Upload";
import { SkillOverTime } from "@/components/skill-over-time/SkillOverTime";
import { CodData } from "@/components/upload/Upload.types";

/* 
  NOTE: We are NOT directly using <Header/> or <Footer/> here
  because they each return a <Paper> with position: "sticky".
  Instead, we copy the internal content from them 
  and place it inside these existing sticky <Paper> blocks.
*/

export default function HomePage() {
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

  const getSkillData = (table: CodData) => {
    return table
      .map((record) => ({
        ["UTC Timestamp"]: record["UTC Timestamp"],
        Skill: record.Skill,
      }))
      .reverse(); // Reverse array order to show chronological
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
      {/* Sticky Header (same as your original) */}
      <Paper
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
          color: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          p: 2,
          textAlign: "center",
        }}
        elevation={3}
      >
        {/* The internal content from your new <Header/> component */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.5px",
            fontSize: "1.75rem",
          }}
        >
          Call of Duty Data Extractor
        </Typography>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {/* Intro Section */}
        {isDropzoneVisible && (
          /* <Introduction /> ALREADY returns a Paper, so we call it directly */
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
              <Box sx={{ mt: 4 }}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <SkillOverTime data={getSkillData(data ?? [])} />
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
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Sticky Footer (same as your original) */}
      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 1000,
          background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
          color: "#ffffff",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
          p: 1,
          textAlign: "center",
        }}
        elevation={3}
      >
        {/* The internal content from your new <Footer/> component */}
        <Typography variant="body2" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
          <Link
            href="https://github.com/KevinRCooper/Cod-Data"
            target="_blank"
            rel="noopener"
            color="inherit"
            underline="hover"
          >
            Application Repository
          </Link>{" "}
          |{" "}
          <Link
            href="https://github.com/KevinRCooper/call-of-duty-data"
            target="_blank"
            rel="noopener"
            color="inherit"
            underline="hover"
          >
            Data Analysis Repository
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
