import { getAccuracy, getAverageDamageDone, getAverageDamageTaken, getAverageDeathsPerMatch, getAverageKillsPerMatch, getAveragePercentageOfTimeMoving, getAverageScore, getAverageSkill, getHighestPrestige, getHighestStreak, getKillDeathRatio, getLongestLosingStreak, getLongestWinStreak, getMostPlayedGameType, getMostPlayedMap, getOverallTimePlayed, getTotalDeaths, getTotalKills, getTotalLosses, getTotalMatches, getTotalWins, getWinLossRatio } from '@/utils/stats';
import { Stack, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { SkillOverTime } from '../skill-over-time/SkillOverTime';
import { CodData } from '../upload/Upload.types';
import SingleStat from './single-stat/SingleStat';

type Stat = {
    name: string;
    value: string | number;
};

type StatsProps = {
    stats: Stat[];
};

const getSkillData = (table: CodData) => {
    return table
        .map((record) => ({
            ["UTC Timestamp"]: record["UTC Timestamp"],
            Skill: record.Skill,
        }))
        .reverse(); // Reverse array order as data comes in reverse chronological order
};

export const Stats = ({ stats }: StatsProps) => {
    return (
        <Box sx={{ flexGrow: 1, overflow: "hidden" }} p={1}>
            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                {stats.map((stat, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                        <SingleStat name={stat.name} value={stat.value} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export type StatsGroupProps = {
    data: CodData;
};
const StatsGroup = ({ data }: StatsGroupProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Check if the screen width is above the iPad breakpoint
    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isDesktop ? 'row' : 'column',
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                allowScrollButtonsMobile
                aria-label="stats tabs"
                sx={{
                    borderRight: isDesktop ? 1 : 0,
                    borderBottom: isDesktop ? 0 : 1,
                    borderColor: 'divider',
                }}
            >
                <Tab label="General Overview" />
                <Tab label="Performance" />
                <Tab label="Combat Stats" />
                <Tab label="Lifetime Stats" />
            </Tabs>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {value === 0 && (
                    <Stats stats={[
                        { name: "Matches", value: getTotalMatches(data ?? []) },
                        { name: "Win/Loss Ratio", value: getWinLossRatio(data ?? []) },
                        { name: "Top Game Type", value: getMostPlayedGameType(data ?? []) },
                        { name: "Most Played Map", value: getMostPlayedMap(data ?? []) },
                    ]} />
                )}
                {value === 1 && (
                    <Stack spacing={2}>
                        <Stats stats={[
                            { name: "Avg. Skill", value: getAverageSkill(data ?? []) },
                            { name: "Avg. Score Per Match", value: getAverageScore(data ?? []) },
                            { name: "Accuracy", value: `${getAccuracy(data ?? [])}%` },
                            { name: "Avg. Damage Done", value: getAverageDamageDone(data ?? []).toLocaleString() },
                            { name: "Avg. Damage Taken", value: getAverageDamageTaken(data ?? []).toLocaleString() },
                            { name: "Avg. % Of Time Moving", value: getAveragePercentageOfTimeMoving(data ?? []) },
                        ]} />
                        <SkillOverTime data={getSkillData(data ?? [])} />
                    </Stack>

                )}
                {value === 2 && (
                    <Stats stats={[
                        { name: "Avg. Kills Per Match", value: getAverageKillsPerMatch(data ?? []) },
                        { name: "Avg. Deaths Per Match", value: getAverageDeathsPerMatch(data ?? []) },
                        { name: "Kill/Death Ratio", value: getKillDeathRatio(data ?? []) },
                        { name: "Highest Streak", value: getHighestStreak(data ?? []) },
                        { name: "Longest Win Streak", value: getLongestWinStreak(data ?? []) },
                        { name: "Longest Losing Streak", value: getLongestLosingStreak(data ?? []) },
                    ]} />
                )}
                {value === 3 && (
                    <Stats stats={[
                        { name: "Lifetime Game Hours", value: getOverallTimePlayed(data ?? []) },
                        { name: "Highest Prestige", value: getHighestPrestige(data ?? []) },
                        { name: "Lifetime Kills", value: getTotalKills(data ?? []) },
                        { name: "Lifetime Deaths", value: getTotalDeaths(data ?? []) },
                        { name: "Lifetime Wins", value: getTotalWins(data ?? []) },
                        { name: "Lifetime Losses", value: getTotalLosses(data ?? []) },
                    ]} />
                )}
            </Box>
        </Box>
    );
};
export default StatsGroup;
