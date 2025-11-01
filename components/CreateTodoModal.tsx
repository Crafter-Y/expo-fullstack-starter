import { trpc } from "@/lib/trpc-client";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CreateTodoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CreateTodoModal({ visible, onClose }: CreateTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [error, setError] = useState("");

  const utils = trpc.useUtils();
  const { data: categories } = trpc.category.getAll.useQuery();

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
      handleClose();
    },
    onError: (err) => {
      setError(err.message || "Failed to create todo");
    },
  });

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setCategoryId(undefined);
    setError("");
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.length > 200) {
      setError("Title must be less than 200 characters");
      return;
    }

    setError("");
    createTodo.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
      categoryId,
    });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
      setCategoryId(undefined);
      setError("");
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Pressable className="flex-1 justify-end" onPress={handleClose}>
        <TouchableWithoutFeedback>
          <View className="max-h-[90%] rounded-t-3xl bg-white dark:bg-gray-800">
            {/* Header */}
            <View className="border-b border-gray-200 px-6 pb-4 pt-6 dark:border-gray-700">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                  Create Todo
                </Text>
                <Pressable
                  onPress={handleClose}
                  className="rounded-full p-2 active:bg-gray-100 dark:active:bg-gray-700"
                >
                  <Text className="text-xl text-gray-500 dark:text-gray-400">
                    ✕
                  </Text>
                </Pressable>
              </View>
            </View>

            <ScrollView className="px-6 py-4">
              {error ? (
                <View className="mb-4 rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                  <Text className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </Text>
                </View>
              ) : null}

              {/* Title Input */}
              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title *
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  placeholder="What needs to be done?"
                  placeholderTextColor="#9CA3AF"
                  value={title}
                  onChangeText={setTitle}
                  editable={!createTodo.isPending}
                  maxLength={200}
                />
                <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {title.length}/200
                </Text>
              </View>

              {/* Description Input */}
              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </Text>
                <TextInput
                  className="min-h-[100px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  placeholder="Add more details..."
                  placeholderTextColor="#9CA3AF"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                  editable={!createTodo.isPending}
                />
              </View>

              {/* Category Selection */}
              <View className="mb-6">
                <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="-mx-1"
                >
                  {/* None option */}
                  <Pressable
                    onPress={() => setCategoryId(undefined)}
                    className={`mx-1 rounded-lg border px-4 py-2 ${
                      !categoryId
                        ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                    }`}
                    disabled={createTodo.isPending}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        !categoryId
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      None
                    </Text>
                  </Pressable>

                  {/* Category options */}
                  {categories?.map((category) => (
                    <Pressable
                      key={category.id}
                      onPress={() => setCategoryId(category.id)}
                      className={`mx-1 flex-row items-center rounded-lg border px-4 py-2 ${
                        categoryId === category.id
                          ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                          : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                      }`}
                      disabled={createTodo.isPending}
                    >
                      {category.icon ? (
                        <Text className="mr-2">{category.icon}</Text>
                      ) : null}
                      <Text
                        className={`text-sm font-medium ${
                          categoryId === category.id
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                        style={
                          category.color
                            ? {
                                color:
                                  categoryId === category.id
                                    ? undefined
                                    : category.color,
                              }
                            : undefined
                        }
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Action Buttons */}
              <View className="mb-4 flex-row gap-3">
                <Pressable
                  onPress={handleClose}
                  className="flex-1 rounded-lg border border-gray-300 py-3 active:bg-gray-50 dark:border-gray-600 dark:active:bg-gray-700"
                  disabled={createTodo.isPending}
                >
                  <Text className="text-center text-base font-semibold text-gray-700 dark:text-gray-300">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSubmit}
                  className={`flex-1 rounded-lg py-3 ${
                    createTodo.isPending
                      ? "bg-blue-400"
                      : "bg-blue-600 active:bg-blue-700"
                  }`}
                  disabled={createTodo.isPending}
                >
                  <Text className="text-center text-base font-semibold text-white">
                    {createTodo.isPending ? "Creating..." : "Create"}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}
