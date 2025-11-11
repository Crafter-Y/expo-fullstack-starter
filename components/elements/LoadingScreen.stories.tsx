import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { LoadingScreen } from "./LoadingScreen";

const meta = {
  title: "elements/LoadingScreen",
  component: LoadingScreen,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
