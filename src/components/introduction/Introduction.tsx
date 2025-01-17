import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const Introduction = () => {
    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="body1">
                This website allows you to extract Call of Duty stats from an HTML report.
            </Typography>
            <Typography variant="body1">
                Data is extracted from the latest Call of Duty title (currently Black Ops 6). All data stays on your device and is not uploaded to any server.
            </Typography>
            <Typography variant="body1">
                To obtain the report, submit a new request to &nbsp;
                <Link href="https://support.activision.com/privacy" color="inherit">
                    Activision`s Privacy & Data Protection portal
                </Link>
                .
            </Typography>
        </Paper>
    );
}