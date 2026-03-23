import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";

import { TodoDeleteModal } from "./TodoDeleteModal";

const meta = {
  title: "todos/TodoDeleteModal",
  component: TodoDeleteModal,
  tags: ["autodocs"],
  args: {
    todoTitle: "Buy groceries",
    error: null,
    isPending: false,
    onConfirm: fn(),
    onCancel: fn(),
  },
  decorators: [
    (Story) => (
      <View className="max-w-md p-4">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TodoDeleteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onConfirm.mockClear();
    args.onCancel.mockClear();

    const modal = canvas.getByTestId("todo-delete-modal");
    await expect(modal).toBeInTheDocument();

    const confirmButton = canvas.getByTestId("todo-delete-confirm-button");
    const cancelButton = canvas.getByTestId("todo-delete-cancel-button");

    await userEvent.click(confirmButton);
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);

    await userEvent.click(cancelButton);
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

export const WithError: Story = {
  args: {
    error: "Unable to delete this todo right now",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const errorMessage = canvas.getByTestId("todo-delete-error");
    await expect(errorMessage).toBeInTheDocument();
    await expect(errorMessage).toHaveTextContent(
      "Unable to delete this todo right now"
    );
  },
};

export const Pending: Story = {
  args: {
    isPending: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onConfirm.mockClear();
    args.onCancel.mockClear();

    const confirmButton = canvas.getByTestId("todo-delete-confirm-button");
    const cancelButton = canvas.getByTestId("todo-delete-cancel-button");

    await expect(confirmButton).toHaveAttribute("aria-disabled", "true");
    await expect(cancelButton).toHaveAttribute("aria-disabled", "true");

    await expect(async () => {
      await userEvent.click(confirmButton);
    }).rejects.toThrow("pointer-events: none");

    await expect(async () => {
      await userEvent.click(cancelButton);
    }).rejects.toThrow("pointer-events: none");

    await expect(args.onConfirm).not.toHaveBeenCalled();
    await expect(args.onCancel).not.toHaveBeenCalled();
  },
};
