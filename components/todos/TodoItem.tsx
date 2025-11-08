import { RouterOutput } from "@/lib/routers/_app";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Button } from "../elements/Button";

interface TodoItemProps {
  todo: RouterOutput["todo"]["getAll"][number];
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onToggleComplete }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <View
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Pressable
        className="mb-1 flex-row rounded-lg border border-transparent p-3 pt-1 hover:border-gray-200 active:bg-gray-50 dark:hover:border-gray-700 dark:active:bg-gray-700"
        onPress={() => (editing ? {} : onToggleComplete(todo.id))}
        onLongPress={() =>
          Platform.OS !== "web" && !editing ? setEditing(true) : {}
        }
      >
        <View className="flex-1">
          {editing && (
            <View className="my-2 ml-6 flex-row gap-2">
              <Button
                t="todos.update"
                type="primary"
                size="small"
                onPress={() => setEditing(false)}
                className="w-8"
              />
              <Button
                t="todos.delete"
                type="destructive"
                size="small"
                onPress={() => {}}
              />
            </View>
          )}

          {todo.category ? (
            <View className="-mb-3 ml-6 flex-row items-center px-2 py-1">
              {todo.category.icon ? (
                <Text className="mr-1 text-xs">{todo.category.icon}</Text>
              ) : null}
              <Text
                className="text-xs font-medium"
                style={
                  todo.category.color
                    ? { color: todo.category.color }
                    : undefined
                }
              >
                {todo.category.name} <Text className="color-gray-400">/</Text>
              </Text>
            </View>
          ) : null}

          <View className="mt-2 flex-1 flex-row">
            <View
              className={`mr-3 mt-1 h-5 w-5 rounded border-2 ${
                todo.completed
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {todo.completed ? (
                <Text className="text-center text-xs leading-4 text-white">
                  ✓
                </Text>
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
        </View>
        {!editing && Platform.OS === "web" && (
          <View className="max-w-10 flex-1 items-center justify-center pt-2">
            {isHovered && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                <MaterialIcons name="edit" size={18} color="#6b7280" />
              </Pressable>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}
