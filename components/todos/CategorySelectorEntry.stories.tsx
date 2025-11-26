import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
import { View } from "react-native";
import { CategorySelectorEntry } from "./CategorySelectorEntry";

const SAMPLE_CATEGORY: RouterOutput["category"]["getAll"][number] = {
  id: "1",
  name: "Work",
  color: "#2563EB",
  icon: "💼",
  _count: { todos: 3 },
};

const meta = {
  title: "todos/CategorySelectorEntry",
  component: CategorySelectorEntry,
  tags: ["autodocs"],
  args: {
    category: SAMPLE_CATEGORY,
    selectedCategory: SAMPLE_CATEGORY.id,
    isDark: false,
    showActions: false,
    onSelectCategory: fn(),
    onEditCategory: fn(),
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-md">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategorySelectorEntry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selectable: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSelectCategory.mockClear();

    const entryButton = canvas.getByTestId(
      `category-selector-entry-${SAMPLE_CATEGORY.id}`
    );
    const checkIcon = canvas.getByTestId("category-selector-entry-check");

    await expect(checkIcon).toBeInTheDocument();

    await userEvent.click(entryButton);

    await expect(args.onSelectCategory).toHaveBeenCalledTimes(1);
    await expect(args.onSelectCategory).toHaveBeenCalledWith(
      SAMPLE_CATEGORY.id
    );
  },
};

export const WithActions: Story = {
  args: {
    showActions: true,
    selectedCategory: undefined,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSelectCategory.mockClear();
    args.onEditCategory?.mockClear();

    const wrapper = canvas.getByTestId(
      `category-selector-entry-wrapper-${SAMPLE_CATEGORY.id}`
    );
    const entryButton = canvas.getByTestId(
      `category-selector-entry-${SAMPLE_CATEGORY.id}`
    );
    const actionButton = canvas.getByTestId(
      `category-selector-entry-action-${SAMPLE_CATEGORY.id}`
    );

    await userEvent.unhover(wrapper);

    await expect(actionButton.style.opacity).toBe("0");

    await userEvent.hover(wrapper);

    await expect(actionButton.style.opacity).toBe("1");

    await userEvent.click(actionButton);

    await expect(args.onEditCategory).toHaveBeenCalledTimes(1);
    await expect(args.onEditCategory).toHaveBeenCalledWith(SAMPLE_CATEGORY);
    await expect(args.onSelectCategory).not.toHaveBeenCalled();

    await userEvent.click(entryButton);

    await expect(args.onSelectCategory).toHaveBeenCalledTimes(1);
  },
};
