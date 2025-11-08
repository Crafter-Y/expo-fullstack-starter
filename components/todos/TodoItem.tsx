import { RouterOutput } from "@/lib/routers/_app";
import { Pressable, Text, View } from "react-native";

interface TodoItemProps {
  todo: RouterOutput["todo"]["getAll"][number];
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onToggleComplete }: TodoItemProps) {
  return (
    <Pressable
      className="mb-3 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700"
      onPress={() => onToggleComplete(todo.id)}
    >
      {todo.category ? (
        <View className="mb-1 w-full items-end">
          <View className="ml-2 flex-row items-center rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-700">
            {todo.category.icon ? (
              <Text className="mr-1 text-xs">{todo.category.icon}</Text>
            ) : null}
            <Text
              className="text-xs font-medium"
              style={
                todo.category.color ? { color: todo.category.color } : undefined
              }
            >
              {todo.category.name}
            </Text>
          </View>
        </View>
      ) : null}

      <View className="flex-row items-start">
        <View
          className={`mr-3 mt-1 h-5 w-5 rounded border-2 ${
            todo.completed
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {todo.completed ? (
            <Text className="text-center text-xs leading-4 text-white">✓</Text>
          ) : null}
        </View>

        <View className="flex-1">
          <Text
            className={`mt-0.5 flex-1 text-base font-semibold ${
              todo.completed
                ? "text-gray-500 line-through dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {todo.title}
          </Text>

          {todo.description ? (
            <Text
              className={`mt-1 text-sm ${
                todo.completed
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {todo.description}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
