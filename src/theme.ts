'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
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
        },
        columnHeaders: {
          backgroundColor: "#2e2e2e",
          color: "#fff",
          fontWeight: "bold",
        },
        row: {
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        },
      },
    },
  },
});

export default theme;