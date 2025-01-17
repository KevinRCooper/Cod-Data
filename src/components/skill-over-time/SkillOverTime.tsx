import React, { useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { SkillOverTimeProps } from "./SkillOverTime.types";
import Box from "@mui/material/Box";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
    yAxis: [
        {
            label: 'SKill Rating',
        },
    ],
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
    },
};

/**
 * Formats a date string into a readable format with time.
 * Example: "2024-12-06T21:59:55Z" => "Dec 6, 2024"
 */
const valueFormatter = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const SkillOverTime = ({ data = [] }: SkillOverTimeProps) => {
    const xAxisData = useMemo(
        () => data.map((d) => new Date(d["UTC Timestamp"])),
        [data]
    );

    const seriesData = useMemo(() => data.map((d) => d.Skill), [data]);

    if (data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <Box sx={{ flexGrow: 1, p: 1 }}>
            <LineChart
                slotProps={{ legend: { hidden: true } }}
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: "time",
                        valueFormatter: (value) => valueFormatter(value),
                        label: "Time Period",
                    },
                ]}
                series={[
                    {
                        curve: "catmullRom", data: seriesData, showMark: false,
                        label: "Skill",
                    },
                ]}
                grid={{ horizontal: true }}
                {...chartSetting}
            />
        </Box>
    );
};

export const SkillOverTimeBarChart = ({ data = [] }: SkillOverTimeProps) => {
    if (data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <Box sx={{ flexGrow: 1, p: 1 }}>
            <BarChart
                dataset={data}
                xAxis={[{ scaleType: "band", dataKey: "UTC Timestamp", label: "Date", valueFormatter: valueFormatter }]}
                series={[{ dataKey: "Skill" }]}
                {...chartSetting}
            />
        </Box>
    );
}
