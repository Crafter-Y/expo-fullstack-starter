import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { NativeCategorySelector } from "./NativeCategorySelector";

const MOCK_CATEGORIES = [
  {
    id: "1",
    name: "Personal",
    color: "#D00000", // Darker red
    icon: "👤",
    _count: { todos: 5 },
  },
  {
    id: "2",
    name: "Work",
    color: "#0000D0", // Darker blue
    icon: "💼",
    _count: { todos: 3 },
  },
  {
    id: "3",
    name: "Shopping",
    color: "#008000", // Darker green
    icon: "🛒",
    _count: { todos: 2 },
  },
];

const meta = {
  title: "todos/NativeCategorySelector",
  component: NativeCategorySelector,
  tags: ["autodocs"],
  args: {
    allTodosCount: 10,
    uncategorizedTodosCount: 2,
    categories: MOCK_CATEGORIES,
    selectedCategoryId: "all",
    onAddCategory: fn(),
    onSelectCategory: fn(),
  },
  render: (args) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(
      args.selectedCategoryId
    );

    return (
      <NativeCategorySelector
        {...args}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          args.onSelectCategory(id);
        }}
      />
    );
  },
} satisfies Meta<typeof NativeCategorySelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onEditCategory: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Select Uncategorized
    const uncategorizedButton = canvas.getByTestId(
      "category-badge-uncategorized"
    );
    await userEvent.click(uncategorizedButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("uncategorized");

    // Select Category 1
    const categoryButton = canvas.getByTestId("category-badge-1");
    await userEvent.click(categoryButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("1");

    // Select All
    const allButton = canvas.getByTestId("category-badge-all");
    await userEvent.click(allButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("all");

    // Click Add
    const addButton = canvas.getByTestId("add-category-button");
    await userEvent.click(addButton);
    await expect(args.onAddCategory).toHaveBeenCalled();

    // Long press Category 1
    await userEvent.pointer({
      keys: "[MouseLeft>]",
      target: categoryButton,
    });
    await new Promise((resolve) => setTimeout(resolve, 600)); // Wait for long press
    await userEvent.pointer({
      keys: "[/MouseLeft]",
      target: categoryButton,
    });
    await expect(args.onEditCategory).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" })
    );
  },
};

export const LongFixedWidth: Story = {
  args: {
    categories: [
      ...MOCK_CATEGORIES,
      ...["4", "5", "6", "7", "8", "9", "10"].map((el) => {
        return {
          id: el,
          name: "Category",
          color: "#008000",
          icon: "🛒",
          _count: { todos: 2 },
        };
      }),
    ],
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-md">
        <Story />
      </View>
    ),
  ],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const categoryButton = canvas.getByTestId("category-badge-1");

    // Long press Category 1
    await userEvent.pointer({
      keys: "[MouseLeft>]",
      target: categoryButton,
    });
    await new Promise((resolve) => setTimeout(resolve, 600)); // Wait for long press
    await userEvent.pointer({
      keys: "[/MouseLeft]",
      target: categoryButton,
    });
    await expect(args.onEditCategory).toBeUndefined();
  },
};

export const Empty: Story = {
  args: {
    categories: [],
    allTodosCount: 0,
    uncategorizedTodosCount: 0,
  },
};
