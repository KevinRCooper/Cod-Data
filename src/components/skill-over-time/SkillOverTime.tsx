// SkillOverTime.tsx
import React, { useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { SkillOverTimeProps } from "./SkillOverTime.types";
import Stack from "@mui/material/Stack";

const CHART_HEIGHT = 300;

/**
 * Formats a date string into a readable format with time.
 * Example: "2024-12-06T21:59:55Z" => "Dec 6, 2024, 21:59"
 */
const valueFormatter = (dateTime: string): string => {
    const date = new Date(dateTime);
    // Show date + 24-hour time (no seconds). Feel free to tweak as needed.
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
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
        <Stack sx={{ width: '100%' }}>
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: "time",
                        valueFormatter: (value) => valueFormatter(value),
                        label: "Date",
                    },
                ]}
                series={[
                    {
                        data: seriesData,
                        label: "Skill Level",
                    },
                ]}
                /* width={CHART_WIDTH} */
                height={CHART_HEIGHT}
                grid={{ vertical: false, horizontal: true }}
            />
        </Stack>
    );
};
