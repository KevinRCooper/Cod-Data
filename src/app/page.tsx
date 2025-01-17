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
import { SkillOverTime } from "@/components/skill-over-time/SkillOverTime";
import Stats from "@/components/stats/Stats";
import { Upload } from "@/components/upload/Upload";
import { CodData } from "@/components/upload/Upload.types";
import { getAverageDamageDone, getAverageDamageTaken, getAverageDeathsPerMatch, getAverageKillsPerMatch, getAveragePercentageOfTimeMoving, getAverageScore, getAverageSkill, getHighestPrestige, getHighestStreak, getKillDeathRatio, getMostPlayedGameType, getMostPlayedMap, getTotalDeaths, getTotalKills, getTotalMatches, getWinLossRatio } from "@/utils/stats";

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

  const getSkillData = (table: CodData) => {
    return table
      .map((record) => ({
        ["UTC Timestamp"]: record["UTC Timestamp"],
        Skill: record.Skill,
      }))
      .reverse(); // Reverse array order as data comes in reverse chronological order
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
                <Stats stats={[
                  { name: "Matches", value: getTotalMatches(data ?? []) },
                  { name: "Avg. Skill", value: getAverageSkill(data ?? []) },
                  { name: "Win/Loss Ratio", value: getWinLossRatio(data ?? []) },
                  { name: "Avg. Score Per Match", value: getAverageScore(data ?? []) },
                  { name: "Kills", value: getTotalKills(data ?? []) },
                  { name: "Avg. Kills Per Match", value: getAverageKillsPerMatch(data ?? []) },
                  { name: "Deaths", value: getTotalDeaths(data ?? []) },
                  { name: "Avg. Deaths Per Match", value: getAverageDeathsPerMatch(data ?? []) },
                  { name: "Kill/Death Ratio", value: (getKillDeathRatio(data ?? [])) },
                  { name: "Highest Streak", value: getHighestStreak(data ?? []) },
                  { name: "Avg. % Of Time Moving", value: getAveragePercentageOfTimeMoving(data ?? []) },
                  { name: "Avg. Damage Done", value: getAverageDamageDone(data ?? []).toLocaleString() },
                  { name: "Avg. Damage Taken", value: getAverageDamageTaken(data ?? []).toLocaleString() },
                  { name: "Most Played Map", value: getMostPlayedMap(data ?? []) },
                  { name: "Most Played Game Type", value: getMostPlayedGameType(data ?? []) },
                  { name: "Highest Prestige", value: getHighestPrestige(data ?? []) },
                ]} />
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
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
