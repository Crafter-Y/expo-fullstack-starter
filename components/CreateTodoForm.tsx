import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { FormTextInput } from "@/components/elements/FormTextInput";
import { RouterOutput } from "@/lib/routers/_app";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CreateTodoFormProps extends ViewProps {
  error: ErrorState;
  categories?: RouterOutput["category"]["getAll"];
  createTodo: (
    title: string,
    description: string,
    createCategoryId?: string
  ) => Promise<boolean>;
}

export default function CreateTodoForm({
  error,
  categories,
  createTodo,
  ...props
}: CreateTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createCategoryId, setCreateCategoryId] = useState<
    string | undefined
  >();
  const [createTodoPending, setCreateTodoPending] = useState(false);

  const expandedProgress = useSharedValue(0);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  // Handle keyboard dismiss
  const handleBlur = () => {
    if (title.trim().length === 0) {
      setIsFormExpanded(false);
    }
  };

  const shouldShowExpandedFields = isFormExpanded || title.trim().length > 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: expandedProgress.value * 500,
      opacity: expandedProgress.value,
      overflow: "hidden",
    };
  });

  useEffect(() => {
    expandedProgress.value = withTiming(shouldShowExpandedFields ? 1 : 0, {
      duration: shouldShowExpandedFields ? 300 : 200,
    });
  }, [shouldShowExpandedFields, expandedProgress]);

  const onSubmit = async () => {
    setCreateTodoPending(true);
    let successful = await createTodo(title, description, createCategoryId);
    if (successful) {
      setTitle("");
      setDescription("");
      setCreateCategoryId(undefined);
      setIsFormExpanded(false);
    }
    setCreateTodoPending(false);
  };

  return (
    <View {...props}>
      <ErrorMessage error={error} />

      {/* Title Input - Always Visible */}
      <FormTextInput
        type="text"
        placeholder="todos.whatToDo"
        onChangeText={setTitle}
        value={title}
        onFocus={() => setIsFormExpanded(true)}
        onBlur={handleBlur}
        editable={!createTodoPending}
        maxLength={200}
        className="dark:bg-gray-900"
      />

      {/* Expanded Fields - Animated */}
      <Animated.View style={animatedStyle}>
        <View className="mt-3 gap-3">
          <FormTextInput
            type="text"
            className="min-h-[80px] dark:bg-gray-900"
            placeholder="todos.addDetails"
            onChangeText={setDescription}
            value={description}
            onFocus={() => setIsFormExpanded(true)}
            onBlur={handleBlur}
            multiline
            textAlignVertical="top"
            editable={!createTodoPending}
          />

          <View className="flex-row flex-wrap gap-2">
            {categories?.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setCreateCategoryId(category.id)}
                className={`flex-row items-center rounded-lg border px-3 py-2 ${
                  createCategoryId === category.id
                    ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                    : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                }`}
                disabled={createTodoPending}
              >
                {category.icon ? (
                  <Text className="mr-2 text-sm">{category.icon}</Text>
                ) : null}
                <Text
                  className={`text-sm font-medium ${
                    createCategoryId === category.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  style={
                    category.color && createCategoryId !== category.id
                      ? { color: category.color }
                      : undefined
                  }
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>

          <Button
            type="primary"
            onPress={onSubmit}
            disabled={createTodoPending || !title.trim()}
            t={createTodoPending ? "todos.creating" : "todos.createTodo"}
          />
        </View>
      </Animated.View>
    </View>
  );
}
