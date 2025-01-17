import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const Header = () => {
    return (
        <Paper
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
                color: "#ffffff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                p: 0.5,
                textAlign: "center",
            }}
            elevation={3}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    fontSize: "1rem",
                }}
            >
                Call of Duty Data Viewer
            </Typography>
        </Paper>
    );
};