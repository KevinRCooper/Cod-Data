import type { Meta, StoryObj } from "@storybook/react";
import { SkillOverTime } from "./SkillOverTime";
import { mockData } from "./SkillOverTime.mock";

const meta: Meta<typeof SkillOverTime> = {
    title: "Skill Over Time",
    component: SkillOverTime,
};

export default meta;

type Story = StoryObj<typeof SkillOverTime>;

export const NoData: Story = {};

export const WithData: Story = {
    args: {
        data: mockData.data,
    },
};
