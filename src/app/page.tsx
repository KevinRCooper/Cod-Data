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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DropzoneComponent from "@/components/DropzoneComponent";
import Link from "@mui/material/Link";
import { TableRow } from "@/types/TableRow.types";

export default function HomePage() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [isDropzoneVisible, setIsDropzoneVisible] = useState(true);

  const handleDataUploaded = (
    newColumns: GridColDef[],
    newRows: TableRow[]
  ) => {
    setColumns(newColumns);
    setRows(newRows);
    setIsDropzoneVisible(false);
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
      {/* Sticky Header */}
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
        {/* Introductory Section */}
        {isDropzoneVisible && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="body1" paragraph>
              This website allows you to extract Call of Duty stats from an HTML report.
            </Typography>
            <Typography variant="body1" paragraph>
              Data is extracted from the latest Call of Duty title (currently Black Ops 6). All data stays on your device and is not uploaded to any server.
            </Typography>
            <Typography variant="body1" paragraph>
              To obtain the report, submit a new request to &nbsp;
              <Link href="https://support.activision.com/privacy" color="inherit">
                Activision`s Privacy & Data Protection portal
              </Link>
              .
            </Typography>
          </Paper>
        )}

        <Grid container spacing={3} justifyContent="center">
          {isDropzoneVisible && (
            <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 8" } }}>
              <DropzoneComponent onDataUploaded={handleDataUploaded} />
            </Grid>
          )}
          {rows.length > 0 && (
            <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 8" } }}>
              <Box sx={{ mt: 4 }}>
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

      {/* Footer */}
      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 1000,
          background: "linear-gradient(90deg, #3f51b5, #5c6bc0)", // Match header gradient
          color: "#ffffff", // White text for contrast
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
          p: 1,
          textAlign: "center",
        }}
        elevation={3}
      >
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
