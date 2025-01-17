import type { Meta, StoryObj } from "@storybook/react";

import SingleStat from "./SingleStat";

const meta = {
    title: "SingleStat",
    component: SingleStat,
} satisfies Meta<typeof SingleStat>;

export default meta;

type Story = StoryObj<typeof SingleStat>;

export const WithStat: Story = {
    args: {
        name: "Total Matches",
        value: "1,337",
    }
};