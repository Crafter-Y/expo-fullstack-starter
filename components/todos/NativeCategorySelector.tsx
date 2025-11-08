import { CategoryFiler } from "@/app/(tabs)/(todos)";
import { RouterOutput } from "@/lib/routers/_app";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import CategorySelectorBadge from "./CategorySelectorBadge";

interface NativeCategorySelectorProps {
  allTodosCount: number;
  uncategorizedTodosCount: number;
  categories?: RouterOutput["category"]["getAll"];
  selectedCategoryId: CategoryFiler;
  onSelectCategory: (categoryId: CategoryFiler) => void;
  onAddCategory: () => void;
  onEditCategory?: (
    category: RouterOutput["category"]["getAll"][number]
  ) => void;
}

export function NativeCategorySelector({
  allTodosCount,
  uncategorizedTodosCount,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
}: NativeCategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <View className="border-b border-gray-200 bg-white py-3 dark:border-gray-700 dark:bg-gray-800">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerClassName="gap-2"
      >
        {/* All Todos Badge */}
        <CategorySelectorBadge
          type="base"
          category={{
            id: "all",
            name: t("todos.all"),
            color: null,
            icon: null,
            _count: {
              todos: allTodosCount,
            },
          }}
          selectedCategory={selectedCategoryId}
          setSelectedCategory={() => onSelectCategory("all")}
        />

        {/* Uncategorized Badge */}
        <CategorySelectorBadge
          type="base"
          category={{
            id: "uncategorized",
            name: t("todos.uncategorized"),
            color: null,
            icon: null,
            _count: {
              todos: uncategorizedTodosCount,
            },
          }}
          selectedCategory={selectedCategoryId}
          setSelectedCategory={() => onSelectCategory("uncategorized")}
        />

        {/* Category Badges */}
        {categories?.map((category) => (
          <CategorySelectorBadge
            key={category.id}
            type="base"
            category={category}
            selectedCategory={selectedCategoryId}
            setSelectedCategory={() => onSelectCategory(category.id)}
            onLongPress={
              onEditCategory ? () => onEditCategory(category) : undefined
            }
          />
        ))}

        {/* Add Category Button */}
        <Pressable
          onPress={onAddCategory}
          className="mr-8 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700"
        >
          <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {t("todos.add")}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
