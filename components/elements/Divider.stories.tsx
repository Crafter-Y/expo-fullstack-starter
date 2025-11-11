import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Text, View } from "react-native";

import { Divider } from "./Divider";

const meta = {
  title: "elements/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <View className="flex-1">
        <Text className="mb-2 text-gray-900 dark:text-gray-100">
          Content above divider
        </Text>
        <Story />
        <Text className="mt-2 text-gray-900 dark:text-gray-100">
          Content below divider
        </Text>
      </View>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithMargin: Story = {
  args: {
    className: "my-4",
  },
};

export const WithPadding: Story = {
  args: {
    className: "mx-8",
  },
};
