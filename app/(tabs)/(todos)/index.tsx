import CategorySelectorBadge from "@/components/todos/CategorySelectorBadge";
import { CreateCategoryModal } from "@/components/todos/CreateCategoryModal";
import CreateTodoForm from "@/components/todos/CreateTodoForm";
import { trpc } from "@/lib/trpc-client";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function TodosScreen() {
  const { t } = useTranslation();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | "all" | "uncategorized"
  >("all");

  const [error, setError] = useState<ErrorState>(null);

  const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery();
  const { data: categories } = trpc.category.getAll.useQuery();
  const utils = trpc.useUtils();

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
      {/* Category Filter Section */}
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
            onPress={() => setShowCategoryModal(true)}
            className="mr-8 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700"
          >
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t("todos.add")}
            </Text>
          </Pressable>
        </ScrollView>
      </View>

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
          <Pressable
            className="mb-3 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700"
            onPress={() => toggleComplete.mutate({ id: item.id })}
          >
            <View className="flex-row items-start">
              <View
                className={`mr-3 mt-1 h-5 w-5 rounded border-2 ${
                  item.completed
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {item.completed ? (
                  <Text className="text-center text-xs leading-4 text-white">
                    ✓
                  </Text>
                ) : null}
              </View>

              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`flex-1 text-base font-semibold ${
                      item.completed
                        ? "text-gray-500 line-through dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.title}
                  </Text>
                  {item.category ? (
                    <View className="ml-2 flex-row items-center rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-700">
                      {item.category.icon ? (
                        <Text className="mr-1 text-xs">
                          {item.category.icon}
                        </Text>
                      ) : null}
                      <Text
                        className="text-xs font-medium"
                        style={
                          item.category.color
                            ? { color: item.category.color }
                            : undefined
                        }
                      >
                        {item.category.name}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {item.description ? (
                  <Text
                    className={`mt-1 text-sm ${
                      item.completed
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-center text-gray-500 dark:text-gray-400">
              {t("todos.noTodos")}
            </Text>
          </View>
        }
      />

      <CreateCategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </View>
  );
}
