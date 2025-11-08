import { CategoryFiler } from "@/app/(tabs)/(todos)";
import { RouterOutput } from "@/lib/routers/_app";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface CategorySelectorEntryProps {
  category: RouterOutput["category"]["getAll"][number];
  selectedCategory?: CategoryFiler;
  isDark: boolean;
  onSelectCategory: (categoryId: CategoryFiler) => void;
}

export function CategorySelectorEntry({
  category,
  selectedCategory,
  isDark,
  onSelectCategory,
}: CategorySelectorEntryProps) {
  const isSelected = selectedCategory === category.id;

  return (
    <View className="mb-2 flex-row">
      <View className="w-4 items-center justify-center">
        {isSelected && (
          <MaterialIcons
            name="check"
            size={16}
            color={isDark ? "#60a5fa" : "#2563eb"}
            className="-ml-1"
          />
        )}
      </View>
      <Pressable
        onPress={() => onSelectCategory(category.id as CategoryFiler)}
        className="flex-1 flex-row rounded-lg px-3 py-2 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
      >
        {category.icon && <Text className="w-6 text-sm">{category.icon}</Text>}
        <Text
          className="text-sm font-medium"
          style={{
            color: category.color || (isDark ? "#d1d5db" : "#374151"),
          }}
        >
          {category.name}
        </Text>
      </Pressable>
    </View>
  );
}
