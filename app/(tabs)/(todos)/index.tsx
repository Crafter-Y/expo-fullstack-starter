import { ModalWrapper } from "@/components/elements/ModalWrapper";
import CategorySelectorBadge from "@/components/todos/CategorySelectorBadge";
import { CreateCategoryModal } from "@/components/todos/CreateCategoryModal";
import CreateTodoForm from "@/components/todos/CreateTodoForm";
import { TodoItem } from "@/components/todos/TodoItem";
import { useCreateCategory } from "@/lib/hooks/useCreateCategory";
import { trpc } from "@/lib/trpc-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export type CategoryFiler = string | "all" | "uncategorized";

export default function TodosScreen() {
  const { t } = useTranslation();
  const { category: categoryParam } = useLocalSearchParams<{
    category?: string;
  }>();
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryFiler>("all");

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategoryId(categoryParam as CategoryFiler);
    }
  }, [categoryParam]);

  const [error, setError] = useState<ErrorState>(null);

  const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery();
  const { data: categories } = trpc.category.getAll.useQuery();
  const utils = trpc.useUtils();

  const {
    showModal: showCategoryModal,
    error: categoryError,
    isPending: categoryIsPending,
    openModal,
    closeModal,
    handleCreateCategory,
  } = useCreateCategory();

  // Filter todos based on selected category
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    if (selectedCategoryId === "all") return todos;

    if (selectedCategoryId === "uncategorized") {
      return todos.filter((todo) => !todo.categoryId);
    }

    return todos.filter((todo) => todo.categoryId === selectedCategoryId);
  }, [todos, selectedCategoryId]);

  const createTodoMutation = trpc.todo.create.useMutation();

  const createTodo = async (
    title: string,
    description: string,
    createCategoryId?: string
  ): Promise<boolean> => {
    if (!title.trim()) {
      setError(t("errors.titleRequired"));
      return false;
    }

    if (title.length > 200) {
      setError(t("errors.titleTooLong"));
      return false;
    }

    try {
      await createTodoMutation.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        categoryId: createCategoryId,
      });

      utils.todo.getAll.invalidate();
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
      return false;
    }
  };

  const toggleComplete = trpc.todo.toggleComplete.useMutation({
    onMutate: async ({ id }) => {
      // Cancel outgoing refetches
      await utils.todo.getAll.cancel();
      const previousTodos = utils.todo.getAll.getData();

      // Optimistic update
      utils.todo.getAll.setData(undefined, (old) =>
        old?.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      utils.todo.getAll.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.getAll.invalidate();
    },
  });

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {Platform.OS !== "web" && (
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
                  todos: todos?.length || 0,
                },
              }}
              selectedCategory={selectedCategoryId}
              setSelectedCategory={() => setSelectedCategoryId("all")}
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
                  todos: todos?.filter((t) => !t.categoryId).length || 0,
                },
              }}
              selectedCategory={selectedCategoryId}
              setSelectedCategory={() => setSelectedCategoryId("uncategorized")}
            />

            {/* Category Badges */}
            {categories?.map((category) => (
              <CategorySelectorBadge
                key={category.id}
                type="base"
                category={category}
                selectedCategory={selectedCategoryId}
                setSelectedCategory={() => setSelectedCategoryId(category.id)}
              />
            ))}

            {/* Add Category Button */}
            <Pressable
              onPress={openModal}
              className="mr-8 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700"
            >
              <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {t("todos.add")}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 native:pb-28 w-full max-w-2xl mx-auto"
        ListHeaderComponent={
          <CreateTodoForm
            error={error}
            categories={categories}
            createTodo={createTodo}
            className="mb-4"
          />
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggleComplete={(id) => toggleComplete.mutate({ id })}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-center text-gray-500 dark:text-gray-400">
              {t("todos.noTodos")}
            </Text>
          </View>
        }
      />

      <ModalWrapper
        visible={showCategoryModal}
        onClose={closeModal}
        title="category.createCategory"
      >
        <CreateCategoryModal
          visible={showCategoryModal}
          error={categoryError}
          isPending={categoryIsPending}
          onSubmit={handleCreateCategory}
          onCancel={closeModal}
        />
      </ModalWrapper>
    </View>
  );
}
