import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
import { useColorScheme } from "nativewind";
import { useState } from "react";
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
    selectedCategory: "",
    isDark: false,
    showActions: false,
    onSelectCategory: fn(),
    onEditCategory: fn(),
  },
  decorators: [
    (Story) => (
      <View className="items-start">
        <Story />
      </View>
    ),
  ],
  render: (args) => {
    const [selectedCategory, setSelectedCategory] = useState(
      args.selectedCategory
    );
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <CategorySelectorEntry
        {...args}
        selectedCategory={selectedCategory}
        isDark={isDark}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          args.onSelectCategory(id);
        }}
      />
    );
  },
} satisfies Meta<typeof CategorySelectorEntry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSelectCategory.mockClear();

    const entryButton = canvas.getByTestId(
      `category-selector-entry-${SAMPLE_CATEGORY.id}`
    );

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
    selectedCategory: "",
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

    await userEvent.hover(wrapper);

    await waitFor(() => {
      expect(actionButton.style.opacity).toBe("1");
    });

    await userEvent.unhover(wrapper);

    await waitFor(() => {
      expect(actionButton.style.opacity).toBe("0");
    });

    await userEvent.click(actionButton);

    await expect(args.onEditCategory).toHaveBeenCalledTimes(1);
    await expect(args.onEditCategory).toHaveBeenCalledWith(SAMPLE_CATEGORY);
    await expect(args.onSelectCategory).not.toHaveBeenCalled();

    await userEvent.click(entryButton);

    await expect(args.onSelectCategory).toHaveBeenCalledTimes(1);
  },
};
