"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import DropzoneComponent from "@/components/DropzoneComponent";


export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Call of Duty Data
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 8"}}}>
          <DropzoneComponent />
        </Grid>
        <Grid sx={{ gridColumn: { xs: "1 / -1", md: "span 6"}}}>
          <Box sx={{ mt: 4 }}>
            <TableContainer component={Paper}>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
