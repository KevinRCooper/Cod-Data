import type { Meta, StoryObj } from "@storybook/react";

import { Upload } from "./Upload";

const meta = {
    title: "Upload",
    component: Upload,
} satisfies Meta<typeof Upload>;

export default meta;

type Story = StoryObj<typeof Upload>;

export const Default: Story = {};