import { CategoryFiler } from "@/app/(tabs)/(todos)";
import { RouterOutput } from "@/lib/routers/_app";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface CategorySelectorEntryProps {
  category: RouterOutput["category"]["getAll"][number];
  selectedCategory?: CategoryFiler;
  isDark: boolean;
  showActions?: boolean;
  onSelectCategory: (categoryId: CategoryFiler) => void;
  onEditCategory?: (
    category: RouterOutput["category"]["getAll"][number]
  ) => void;
}

export function CategorySelectorEntry({
  category,
  selectedCategory,
  isDark,
  showActions = false,
  onSelectCategory,
  onEditCategory,
}: CategorySelectorEntryProps) {
  const isSelected = selectedCategory === category.id;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View
      className="mb-2 flex-row items-center"
      testID={`category-selector-entry-wrapper-${category.id}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <View className="w-4 items-center justify-center">
        {isSelected && (
          <View testID="category-selector-entry-check">
            <MaterialIcons
              name="check"
              size={16}
              color={isDark ? "#60a5fa" : "#2563eb"}
              className="-ml-1"
            />
          </View>
        )}
      </View>
      <Pressable
        onPress={() => onSelectCategory(category.id as CategoryFiler)}
        accessibilityRole="button"
        className="flex-1 flex-row items-center rounded-lg px-3 py-2 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
        testID={`category-selector-entry-${category.id}`}
      >
        {category.icon && (
          <Text className="w-6 text-sm" testID="category-selector-entry-icon">
            {category.icon}
          </Text>
        )}
        <Text
          className="flex-1 text-sm font-medium"
          style={{
            color: category.color || (isDark ? "#d1d5db" : "#374151"),
          }}
          testID="category-selector-entry-name"
        >
          {category.name}
        </Text>
      </Pressable>
      {showActions && onEditCategory && (
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onEditCategory(category);
          }}
          className="ml-2 h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500"
          style={{ opacity: isHovered ? 1 : 0 }}
          accessibilityRole="button"
          testID={`category-selector-entry-action-${category.id}`}
        >
          <MaterialIcons
            name="more-vert"
            size={16}
            color={isDark ? "#9ca3af" : "#6b7280"}
          />
        </Pressable>
      )}
    </View>
  );
}
