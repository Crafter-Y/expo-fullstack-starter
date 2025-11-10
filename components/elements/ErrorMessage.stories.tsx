import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { ErrorMessage } from "./ErrorMessage";

const meta = {
  title: "elements/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithError: Story = {
  args: {
    error: "This is an error message",
  },
};

export const LongError: Story = {
  args: {
    error:
      "This is a much longer error message that demonstrates how the component handles multi-line text content",
  },
};

export const InSmallWindow: Story = {
  args: {
    error:
      "This is a much longer error message that demonstrates how the component handles multi-line text content",
  },
  decorators: [
    (Story) => (
      <View className="max-w-sm">
        <Story />
      </View>
    ),
  ],
};

export const NoError: Story = {
  args: {
    error: null,
  },
};
