import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
import {
  CategoryFormModal,
  PRESET_COLORS,
  PRESET_ICONS,
} from "./CategoryFormModal";

const SAMPLE_CATEGORY: RouterOutput["category"]["getAll"][number] = {
  id: "1",
  name: "Work",
  color: PRESET_COLORS[1],
  icon: PRESET_ICONS[2],
  _count: { todos: 3 },
};

const meta = {
  title: "todos/CategoryFormModal",
  component: CategoryFormModal,
  tags: ["autodocs"],
  args: {
    visible: true,
    error: null,
    isPending: false,
    onSubmit: fn(),
    onCancel: fn(),
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <View className="max-w-md p-4">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategoryFormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateCategory: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSubmit.mockClear();
    args.onCancel.mockClear();

    const nameInput = canvas.getByTestId(
      "category-name-input"
    ) as HTMLInputElement;
    const radioButtons = canvas.getAllByRole("radio");
    const iconButtons = radioButtons.slice(0, PRESET_ICONS.length);
    const colorButtons = radioButtons.slice(PRESET_ICONS.length);

    await userEvent.type(nameInput, "Chores");
    await userEvent.click(iconButtons[3]);
    await userEvent.click(colorButtons[4]);

    const submitButton = canvas.getByTestId("category-submit-button");
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith(
      "Chores",
      PRESET_COLORS[4],
      PRESET_ICONS[3]
    );
    await expect(args.onCancel).not.toHaveBeenCalled();
  },
};

export const EditCategory: Story = {
  args: {
    category: SAMPLE_CATEGORY,
    onDelete: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSubmit.mockClear();
    args.onDelete?.mockClear();

    const nameInput = canvas.getByTestId(
      "category-name-input"
    ) as HTMLInputElement;
    await expect(nameInput).toHaveValue(SAMPLE_CATEGORY.name);

    const radioButtons = canvas.getAllByRole("radio");
    const iconButtons = radioButtons.slice(0, PRESET_ICONS.length);
    const colorButtons = radioButtons.slice(PRESET_ICONS.length);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Updated Work");
    await userEvent.click(iconButtons[1]);
    await userEvent.click(colorButtons[0]);

    const submitButton = canvas.getByTestId("category-submit-button");
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith(
      "Updated Work",
      PRESET_COLORS[0],
      PRESET_ICONS[1]
    );

    const deleteButton = canvas.getByTestId("category-delete-button");
    await userEvent.click(deleteButton);

    await expect(args.onDelete).toHaveBeenCalledTimes(1);
  },
};

export const PendingState: Story = {
  args: {
    category: SAMPLE_CATEGORY,
    isPending: true,
    onDelete: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSubmit?.mockClear();
    args.onDelete?.mockClear();
    args.onCancel?.mockClear();

    const nameInput = canvas.getByTestId("category-name-input");
    await expect(nameInput).toHaveAttribute("aria-disabled", "true");

    const submitButton = canvas.getByTestId("category-submit-button");
    const cancelButton = canvas.getByTestId("category-cancel-button");

    const radioButtons = canvas.getAllByRole("radio");

    await expect(async () => {
      await userEvent.click(radioButtons[0]);
    }).rejects.toThrow("pointer-events: none");

    await expect(async () => {
      await userEvent.click(submitButton);
    }).rejects.toThrow();

    await expect(async () => {
      await userEvent.click(cancelButton);
    }).rejects.toThrow();

    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(args.onDelete).not.toHaveBeenCalled();
    await expect(args.onCancel).not.toHaveBeenCalled();
  },
};
