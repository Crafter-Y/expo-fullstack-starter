import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { ProfileInfoField } from "./ProfileInfoField";

const meta = {
  title: "profile/ProfileInfoField",
  component: ProfileInfoField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <View className="w-full max-w-md flex-1">
        <Story />
      </View>
    ),
  ],
  args: {
    onPress: fn(),
  },
  argTypes: {
    label: translationKeyArgType,
  },
} satisfies Meta<typeof ProfileInfoField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "profile.name",
    value: "John Doe",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the pressable field
    const field = canvas.getByRole("button");

    // Click the field
    await userEvent.click(field);

    // Verify onPress was called
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const NotSet: Story = {
  args: {
    label: "profile.email",
    value: "Not set",
  },
};

export const LongValue: Story = {
  args: {
    label: "profile.email",
    value: "very.long.email.address@example.subdomain.company.com",
  },
};
