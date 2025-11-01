import { CategoryModal } from "@/components/CategoryModal";
import { CreateTodoModal } from "@/components/CreateTodoModal";
import { trpc } from "@/lib/trpc-client";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function TodosScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | null | "uncategorized"
  >(null);

  const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery();
  const { data: categories } = trpc.category.getAll.useQuery();
  const utils = trpc.useUtils();

  // Filter todos based on selected category
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    if (!selectedCategoryId) return todos;

    if (selectedCategoryId === "uncategorized") {
      return todos.filter((todo) => !todo.categoryId);
    }

    return todos.filter((todo) => todo.categoryId === selectedCategoryId);
  }, [todos, selectedCategoryId]);

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
      <View className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-1"
        >
          {/* All Todos Badge */}
          <Pressable
            onPress={() => setSelectedCategoryId(null)}
            className={`mx-1 rounded-full px-4 py-2 ${
              selectedCategoryId === null
                ? "bg-blue-600"
                : "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCategoryId === null
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              All ({todos?.length || 0})
            </Text>
          </Pressable>

          {/* Uncategorized Badge */}
          <Pressable
            onPress={() => setSelectedCategoryId("uncategorized")}
            className={`mx-1 rounded-full px-4 py-2 ${
              selectedCategoryId === "uncategorized"
                ? "bg-blue-600"
                : "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCategoryId === "uncategorized"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Uncategorized ({todos?.filter((t) => !t.categoryId).length || 0})
            </Text>
          </Pressable>

          {/* Category Badges */}
          {categories?.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategoryId(category.id)}
              className={`mx-1 flex-row items-center rounded-full px-4 py-2 ${
                selectedCategoryId === category.id
                  ? "bg-blue-600"
                  : "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
              }`}
            >
              {category.icon ? (
                <Text className="mr-1 text-sm">{category.icon}</Text>
              ) : null}
              <Text
                className={`text-sm font-medium ${
                  selectedCategoryId === category.id ? "text-white" : ""
                }`}
                style={
                  selectedCategoryId === category.id
                    ? undefined
                    : category.color
                      ? { color: category.color }
                      : undefined
                }
              >
                {category.name} ({category._count.todos})
              </Text>
            </Pressable>
          ))}

          {/* Add Category Button */}
          <Pressable
            onPress={() => setShowCategoryModal(true)}
            className="mx-1 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700"
          >
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
              + Add
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
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
              No todos yet. Create your first one!
            </Text>
          </View>
        }
      />

      <Pressable
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg active:bg-blue-700"
        onPress={() => setShowCreateModal(true)}
      >
        <Text className="text-2xl text-white">+</Text>
      </Pressable>

      <CreateTodoModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </View>
  );
}
