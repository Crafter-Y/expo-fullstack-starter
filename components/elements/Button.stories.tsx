import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";

const meta = {
  title: "elements/Button",
  component: Button,
  argTypes: {
    t: translationKeyArgType,
  },
  decorators: [
    (Story) => (
      <View className="flex-1 items-start">
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
    t: "auth.signIn",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const Ghost: Story = {
  args: {
    type: "ghost",
    t: "todos.cancel",
  },
};

export const Destructive: Story = {
  args: {
    type: "destructive",
    t: "todos.delete",
  },
};

export const PrimarySmall: Story = {
  args: {
    type: "primary",
    t: "auth.signIn",
    size: "small",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    type: "primary",
    t: "auth.signIn",
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Try to click - this should throw because pointer-events: none
    await expect(async () => {
      await userEvent.click(button);
    }).rejects.toThrow("pointer-events: none");

    // Verify onPress was never called
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
