import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const Footer = () => {
    return (
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
    );
}