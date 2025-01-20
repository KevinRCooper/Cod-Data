"use client";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type StatCardProps = {
  title: string;
  subTitle: string;
  content: string;
  highlightedStat: string | number;
};

type Config = Array<StatCardProps>;
const config: Config = [{ title: "Matches", subTitle: "Gameplay", content: "Details on overall matches that come from all game modes.", highlightedStat: 400 },
{ title: "Skill", subTitle: "Rank", content: "Your player skill is calculated on your performance in the game.", highlightedStat: 105 },
{ title: "K/D", subTitle: "Kill/Death Ratio", content: "A metric that compares the number of kills to deaths.", highlightedStat: 1.25 },
{ title: "Modes", subTitle: "Game Types", content: "Stastics on the game modes you play.", highlightedStat: "Most Played Domination" },
{ title: "Maps", subTitle: "Multiplayer", content: "Data based on the maps you've played.", highlightedStat: "Most Played Nuketown" },
{ title: "Operators", subTitle: "Skins", content: "Data based on the operators you play.", highlightedStat: "Most Used Replacer" },];

const Dashboard = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.6), /* Top dark overlay */
        rgba(0, 0, 0, 0.6)
      ), 
      url("/background.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "center",
        p: 2, 
        boxSizing: "border-box", 
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center", p: 1 }}>
        {config.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'start',
  color: "#ffffff",
  backgroundColor: "#000000",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  opacity: 0.85,
}));

const StatCard = ({ title, subTitle, content, highlightedStat }: StatCardProps) => {
  return (
    <Item elevation={3}>
      <Box p={2} sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <hr />
        <Typography variant="h6" color="#f96800">
          {subTitle}
        </Typography>
        <Typography variant="h6" sx={{ marginY: 2 }}>
          {content}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "#f96800",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }} variant="body1" color="#000000">
          {highlightedStat}
        </Typography>
      </Box>
    </Item>
  );
};
