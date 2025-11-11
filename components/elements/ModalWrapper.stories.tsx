import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { useState } from "react";
import { Text, View } from "react-native";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import { Button } from "./Button";
import { ModalWrapper } from "./ModalWrapper";

const meta = {
  title: "elements/ModalWrapper",
  component: ModalWrapper,
  tags: ["autodocs"],
  args: {
    onClose: fn(),
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
          // ARIA attribute is not allowed: aria-modal=true this somehow gets added by cli tests
          {
            id: "aria-allowed-attr",
            enabled: false,
          },
        ],
      },
    },
  },
  render: (args) => {
    const [visible, setVisible] = useState(args.visible);

    return (
      <View className="flex-1 items-start">
        <Button onPress={() => setVisible(true)} type="primary" t="todos.add" />
        <ModalWrapper
          {...args}
          visible={visible}
          onClose={() => {
            setVisible(false);
            args.onClose();
          }}
        />
      </View>
    );
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "category.editCategory",
    visible: false,
    children: (
      <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This is example modal content.
        </Text>
        <Text className="text-gray-900 dark:text-white">
          You can put any content here, including forms, text, or other
          components.
        </Text>
      </View>
    ),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the button to open the modal
    const openButton = canvas.getByRole("button");
    await userEvent.click(openButton);

    // Wait a bit for the modal animation
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find the close button (X button in header)
    const closeButton = screen.getAllByRole("button")[1]; // Second button is the close button

    // Click the close button
    await userEvent.click(closeButton);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const WithLongContent: Story = {
  args: {
    title: "category.name",
    visible: false,
    children: (
      <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This modal demonstrates scrolling behavior with longer content.
        </Text>
        {Array.from({ length: 20 }).map((_, i) => (
          <Text key={i} className="text-gray-900 dark:text-white">
            Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </Text>
        ))}
      </View>
    ),
  },
};

export const InitiallyOpen: Story = {
  args: {
    title: "category.editCategory",
    visible: true,
    children: (
      <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This modal starts in an open state.
        </Text>
      </View>
    ),
  },
};
