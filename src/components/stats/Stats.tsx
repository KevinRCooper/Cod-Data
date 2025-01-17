import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import SingleStat from './single-stat/SingleStat';

type Stat = {
    name: string;
    value: string | number;
};

type StatsProps = {
    stats: Stat[];
};

const Stats = ({ stats }: StatsProps) => {
    return (
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}  p={1}>
            <Grid container spacing={1} sx={{ justifyContent: "center"}}>
                {stats.map((stat, index) => (
                    <Grid key={index} size={{ xs:12, sm: 4, md: 3}}>
                        <SingleStat name={stat.name} value={stat.value} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Stats;