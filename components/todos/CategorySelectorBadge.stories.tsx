import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import CategorySelectorBadge from "./CategorySelectorBadge";

const MOCK_CATEGORY = {
  id: "1",
  name: "Personal",
  color: "#D00000",
  icon: "👤",
  _count: { todos: 5 },
};

const meta = {
  title: "todos/CategorySelectorBadge",
  component: CategorySelectorBadge,
  tags: ["autodocs"],
  args: {
    category: MOCK_CATEGORY,
    selectedCategory: "2",
    setSelectedCategory: fn(),
    displayCategorySize: true,
    type: "base",
  },
  render: (args) => {
    const [selectedCategory, setSelectedCategory] = useState(
      args.selectedCategory
    );

    return (
      <CategorySelectorBadge
        {...args}
        selectedCategory={selectedCategory}
        setSelectedCategory={(id?: string) => {
          setSelectedCategory(id);
          args.setSelectedCategory(id);
        }}
      />
    );
  },
  decorators: [
    (Story) => (
      <View className="items-start">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategorySelectorBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    type: "base",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole("radio");

    await userEvent.click(badge);

    await expect(args.setSelectedCategory).toHaveBeenCalledWith(
      args.category.id
    );
  },
};

export const Ghost: Story = {
  args: {
    type: "ghost",
  },
};

export const NoIcon: Story = {
  args: {
    type: "base",
    category: {
      ...MOCK_CATEGORY,
      icon: null,
    },
  },
};

export const NoSize: Story = {
  args: {
    type: "base",
    displayCategorySize: false,
  },
};
