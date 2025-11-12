import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { FormTextInput } from "@/components/elements/FormTextInput";
import CategorySelectorBadge from "@/components/todos/CategorySelectorBadge";
import { RouterOutput } from "@/lib/routers/_app";
import React, { useEffect, useState } from "react";
import { View, ViewProps } from "react-native";
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
  const [isPending, setPending] = useState(false);

  const expandedProgress = useSharedValue(0);
  const [isFormExpanded, setFormExpanded] = useState(false);

  const shouldShowExpandedFields = isFormExpanded || title.trim().length > 0;

  const containerStyle = useAnimatedStyle(() => {
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
    setPending(true);
    let successful = await createTodo(title, description, createCategoryId);
    if (successful) {
      setTitle("");
      setDescription("");
      setCreateCategoryId(undefined);
      setFormExpanded(false);
    }
    setPending(false);
  };

  const setSelectedCategory = (categoryId: string | undefined) => {
    if (createCategoryId === categoryId) {
      setCreateCategoryId(undefined);
    } else {
      setCreateCategoryId(categoryId);
    }
  };

  const handleBlur = () => {
    if (title.trim().length === 0) {
      setFormExpanded(false);
    }
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
        onFocus={() => setFormExpanded(true)}
        onBlur={handleBlur}
        editable={!isPending}
        maxLength={200}
        className="dark:bg-gray-900"
        testID="todo-form-title"
      />

      {/* Expanded Fields - Animated */}
      <Animated.View style={containerStyle}>
        <View className="mt-3 gap-3">
          <FormTextInput
            type="text"
            className="min-h-[80px] dark:bg-gray-900"
            placeholder="todos.addDetails"
            onChangeText={setDescription}
            value={description}
            onFocus={() => setFormExpanded(true)}
            onBlur={handleBlur}
            multiline
            textAlignVertical="top"
            editable={!isPending}
            testID="todo-form-description"
          />

          <View className="flex-row flex-wrap gap-2">
            {categories?.map((category) => (
              <CategorySelectorBadge
                type="ghost"
                category={category}
                key={category.id}
                selectedCategory={createCategoryId}
                setSelectedCategory={setSelectedCategory}
                disabled={isPending}
              />
            ))}
          </View>

          <Button
            type="primary"
            onPress={onSubmit}
            disabled={isPending || !title.trim()}
            t={isPending ? "todos.creating" : "todos.createTodo"}
          />
        </View>
      </Animated.View>
    </View>
  );
}
