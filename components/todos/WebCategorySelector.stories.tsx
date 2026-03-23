import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { useState } from "react";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
import { useColorScheme } from "nativewind";
import { WebCategorySelector } from "./WebCategorySelector";

const SAMPLE_CATEGORIES: RouterOutput["category"]["getAll"] = [
  {
    id: "work",
    name: "Work",
    color: "#2563EB",
    icon: "🏠",
    _count: { todos: 3 },
  },
  {
    id: "personal",
    name: "Personal",
    color: "#DC2626",
    icon: null,
    _count: { todos: 5 },
  },
];

const meta = {
  title: "todos/WebCategorySelector",
  component: WebCategorySelector,
  tags: ["autodocs"],
  args: {
    categories: SAMPLE_CATEGORIES,
    selectedCategory: "all",
    isDark: false,
    onSelectCategory: fn(),
    onAddCategory: fn(),
    onEditCategory: fn(),
  },
  decorators: [
    (Story) => (
      <View className="max-w-xs p-4">
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
      <WebCategorySelector
        {...args}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          args.onSelectCategory(id);
        }}
        isDark={isDark}
      />
    );
  },
} satisfies Meta<typeof WebCategorySelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onSelectCategory.mockClear();
    args.onAddCategory.mockClear();
    args.onEditCategory?.mockClear();

    const allEntry = canvas.getByTestId("category-selector-entry-all");
    const uncategorizedEntry = canvas.getByTestId(
      "category-selector-entry-uncategorized"
    );
    const workEntry = canvas.getByTestId(
      `category-selector-entry-${SAMPLE_CATEGORIES[0].id}`
    );
    const workWrapper = canvas.getByTestId(
      `category-selector-entry-wrapper-${SAMPLE_CATEGORIES[0].id}`
    );
    const workAction = canvas.getByTestId(
      `category-selector-entry-action-${SAMPLE_CATEGORIES[0].id}`
    );
    const addButton = canvas.getByTestId("category-add-button");

    await userEvent.click(workEntry);
    await userEvent.click(uncategorizedEntry);
    await userEvent.click(allEntry);

    await expect(args.onSelectCategory).toHaveBeenCalledTimes(3);
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(
      1,
      SAMPLE_CATEGORIES[0].id
    );
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(
      2,
      "uncategorized"
    );
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(3, "all");

    await userEvent.hover(workWrapper);
    await userEvent.click(workAction);
    await expect(args.onEditCategory).toHaveBeenCalledWith(
      SAMPLE_CATEGORIES[0]
    );
    await expect(args.onSelectCategory).toHaveBeenCalledTimes(3);

    await userEvent.click(addButton);
    await expect(args.onAddCategory).toHaveBeenCalledTimes(1);
  },
};
