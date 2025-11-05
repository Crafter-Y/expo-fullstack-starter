import { RouterOutput } from "@/lib/routers/_app";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface CategorySelectorBadgeProps extends PressableProps {
  category: RouterOutput["category"]["getAll"][number];
  selectedCategory?: string;
  setSelectedCategory: (categoryId: string) => void;
}

export default function CategorySelectorBadge({
  className,
  category,
  selectedCategory,
  setSelectedCategory,
  ...props
}: CategorySelectorBadgeProps) {
  return (
    <Pressable
      key={category.id}
      onPress={() => setSelectedCategory(category.id)}
      className={`flex-row items-center rounded-lg border px-3 py-2 ${
        selectedCategory === category.id
          ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
          : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
      } ${className}`}
      {...props}
    >
      {category.icon ? (
        <Text className="mr-2 text-sm" selectable={false}>
          {category.icon}
        </Text>
      ) : null}
      <Text
        className={`text-sm font-medium ${
          selectedCategory === category.id
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
        style={
          category.color && selectedCategory !== category.id
            ? { color: category.color }
            : undefined
        }
        selectable={false}
      >
        {category.name}
      </Text>
    </Pressable>
  );
}
