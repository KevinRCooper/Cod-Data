import type { Meta, StoryObj } from "@storybook/react";

import Stats from "./Stats";

const meta = {
    title: "Stats",
    component: Stats,
} satisfies Meta<typeof Stats>;

export default meta;

type Story = StoryObj<typeof Stats>;

export const Default: Story = {
    args: {
        stats: [
            {
                name: "Total Matches",
                value: "1,337",
            },
            {
                name: "Kill/Death Ratio",
                value: "1.04",
            },
            {
                name: "Total Wins",
                value: "1,337",
            },
            {
                name: "Total Losses",
                value: "1,337",
            },
            {
                name: "Total Draws",
                value: "1,337",
            },
            {
                name: "Total Kills",
                value: "1,337",
            },
            {
                name: "Total Deaths",
                value: "1,337",
            },
            {
                name: "Total Assists",
                value: "1,337",
            },
        ]
    }
};