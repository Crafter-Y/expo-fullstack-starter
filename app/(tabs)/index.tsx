import { useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

// Placeholder for todos - will be replaced with tRPC in Phase 1.3
const MOCK_TODOS = [
  {
    id: "1",
    title: "Set up tRPC",
    description: "Implement tRPC backend with Prisma",
    completed: false,
  },
  {
    id: "2",
    title: "Create todo components",
    description: "Build reusable todo item components",
    completed: false,
  },
  {
    id: "3",
    title: "Add authentication",
    description: "Integrate Better Auth with navigation",
    completed: true,
  },
];

export default function TodosScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch todos from tRPC
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="border-b border-gray-200 bg-white px-6 pb-4 pt-12 dark:border-gray-700 dark:bg-gray-800">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          My Todos
        </Text>
      </View>

      <FlatList
        data={MOCK_TODOS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Pressable className="mb-3 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700">
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
                <Text
                  className={`text-base font-semibold ${
                    item.completed
                      ? "text-gray-500 line-through dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {item.title}
                </Text>
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

      <Pressable className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg active:bg-blue-700">
        <Text className="text-2xl text-white">+</Text>
      </Pressable>
    </View>
  );
}
