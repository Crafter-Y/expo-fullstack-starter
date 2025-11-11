import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { ModalHeader } from "./ModalHeader";

const meta = {
  title: "elements/ModalHeader",
  component: ModalHeader,
  tags: ["autodocs"],
  args: {
    onClose: fn(),
  },
  argTypes: {
    title: translationKeyArgType,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          // Element content contains only non-text characters because of the close icon ionicon
          {
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
} satisfies Meta<typeof ModalHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "category.editCategory",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the close button
    const closeButton = canvas.getByRole("button");

    // Click the close button
    await userEvent.click(closeButton);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const LongTitle: Story = {
  args: {
    title: "todos.deleteConfirmation",
  },
};

export const LongTitleMaxWidth: Story = {
  args: {
    title: "todos.deleteConfirmation",
  },
  decorators: [
    (Story) => (
      <View className="max-w-sm">
        <Story />
      </View>
    ),
  ],
};
