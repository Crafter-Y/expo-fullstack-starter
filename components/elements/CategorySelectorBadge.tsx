import { RouterOutput } from "@/lib/routers/_app";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type CategorySelectorBadgeType = "base" | "ghost";

interface BaseCategorySelectorBadgeProps extends PressableProps {
  category: RouterOutput["category"]["getAll"][number];
  selectedCategory?: string;
  setSelectedCategory: (categoryId?: string) => void;
  displayCategorySize?: boolean;
  textClassName?: string;
}

interface CategorySelectorBadgeProps extends BaseCategorySelectorBadgeProps {
  type: CategorySelectorBadgeType;
}

const BaseCategorySelectorBadge = ({
  className,
  category,
  selectedCategory,
  setSelectedCategory,
  displayCategorySize,
  textClassName,
  ...props
}: BaseCategorySelectorBadgeProps) => {
  return (
    <Pressable
      key={category.id}
      onPress={() => setSelectedCategory(category.id)}
      className={`flex-row items-center border ${className}`}
      {...props}
    >
      {category.icon ? (
        <Text className="mr-2 text-sm" selectable={false}>
          {category.icon}
        </Text>
      ) : null}
      <Text
        className={`text-sm font-medium ${textClassName}`}
        style={
          category.color && selectedCategory !== category.id
            ? { color: category.color }
            : undefined
        }
        selectable={false}
      >
        {category.name}
        {displayCategorySize && ` (${category._count.todos})`}
      </Text>
    </Pressable>
  );
};

export default function CategorySelectorBadge({
  type,
  displayCategorySize,
  className,
  textClassName,
  selectedCategory,
  category,
  ...props
}: CategorySelectorBadgeProps) {
  switch (type) {
    case "base":
      return (
        <BaseCategorySelectorBadge
          displayCategorySize={displayCategorySize ?? true}
          className={`rounded-full px-4 py-2 ${
            selectedCategory === category.id
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
          } ${className}`}
          textClassName={`${
            selectedCategory === category.id
              ? "text-white"
              : "text-gray-700 dark:text-gray-300"
          } ${textClassName}`}
          selectedCategory={selectedCategory}
          category={category}
          {...props}
        />
      );
    case "ghost":
      return (
        <BaseCategorySelectorBadge
          displayCategorySize={displayCategorySize ?? false}
          className={`rounded-lg px-3 py-2 ${
            selectedCategory === category.id
              ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
              : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
          } ${className}`}
          textClassName={`${
            selectedCategory === category.id
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300"
          } ${textClassName}`}
          selectedCategory={selectedCategory}
          category={category}
          {...props}
        />
      );
  }
}
