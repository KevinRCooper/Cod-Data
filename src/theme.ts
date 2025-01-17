"use client";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9", 
    },
    secondary: {
      main: "#f48fb1",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    body1: {
      fontSize: "0.95rem",
    },
    body2: {
      fontSize: "0.85rem",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid #333",
          backgroundColor: "#1e1e1e",
        },
        cell: {
          color: "#fff",
          borderBottom: "1px solid #333",
        },
        columnHeaders: {
          backgroundColor: "#2e2e2e",
          color: "#fff",
          fontWeight: "bold",
          borderBottom: "1px solid #444",
        },
        row: {
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;
