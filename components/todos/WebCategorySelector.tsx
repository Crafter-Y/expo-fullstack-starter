import { CategoryFiler } from "@/app/(tabs)/(todos)";
import { RouterOutput } from "@/lib/routers/_app";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { CategorySelectorEntry } from "./CategorySelectorEntry";

interface WebCategorySelectorProps {
  categories?: RouterOutput["category"]["getAll"];
  selectedCategory?: CategoryFiler;
  isDark: boolean;
  onSelectCategory: (categoryId: CategoryFiler) => void;
  onAddCategory: () => void;
}

export function WebCategorySelector({
  categories,
  selectedCategory,
  isDark,
  onSelectCategory,
  onAddCategory,
}: WebCategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <View className="pr-4">
      <Text className="mb-3 pl-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
        {t("todos.categories")}
      </Text>

      {/* All Todos */}
      <CategorySelectorEntry
        category={{
          id: "all",
          name: t("todos.all"),
          icon: null,
          color: null,
          _count: { todos: 0 },
        }}
        selectedCategory={selectedCategory}
        isDark={isDark}
        onSelectCategory={onSelectCategory}
      />

      {/* Uncategorized */}
      <CategorySelectorEntry
        category={{
          id: "uncategorized",
          name: t("todos.uncategorized"),
          icon: null,
          color: null,
          _count: { todos: 0 },
        }}
        selectedCategory={selectedCategory}
        isDark={isDark}
        onSelectCategory={onSelectCategory}
      />

      {/* Category Items */}
      {categories?.map((category) => (
        <CategorySelectorEntry
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          isDark={isDark}
          onSelectCategory={onSelectCategory}
        />
      ))}

      {/* Add Category Button */}
      <Pressable
        onPress={onAddCategory}
        className="ml-4 mt-2 flex-row items-center rounded-lg border border-dashed border-gray-400 px-3 py-2 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800 dark:active:bg-gray-700"
      >
        <Text className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {t("todos.add")}
        </Text>
      </Pressable>
    </View>
  );
}
