import type { Meta, StoryObj } from "@storybook/react";

import { Introduction } from "./Introduction";

const meta = {
    title: "Introduction",
    component: Introduction,
} satisfies Meta<typeof Introduction>;

export default meta;

type Story = StoryObj<typeof Introduction>;

export const Default: Story = {};