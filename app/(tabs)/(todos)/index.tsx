import { CategoryModal } from "@/components/CategoryModal";
import { trpc } from "@/lib/trpc-client";
import type { TFunction } from "i18next";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Memoized form component to prevent unnecessary re-renders
const CreateTodoForm = memo(
  ({
    t,
    error,
    title,
    description,
    createCategoryId,
    isFormExpanded,
    shouldShowExpandedFields,
    createTodoPending,
    categories,
    onTitleChange,
    onDescriptionChange,
    onCategoryChange,
    onFocus,
    onBlur,
    onSubmit,
    titleInputRef,
  }: {
    t: TFunction<"translation", undefined>;
    error: string;
    title: string;
    description: string;
    createCategoryId: string | undefined;
    isFormExpanded: boolean;
    shouldShowExpandedFields: boolean;
    createTodoPending: boolean;
    categories:
      | {
          id: string;
          name: string;
          icon: string | null;
          color: string | null;
        }[]
      | undefined;
    onTitleChange: (text: string) => void;
    onDescriptionChange: (text: string) => void;
    onCategoryChange: (id: string | undefined) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSubmit: () => void;
    titleInputRef: React.RefObject<TextInput | null>;
  }) => {
    const expandedProgress = useSharedValue(0);

    useEffect(() => {
      expandedProgress.value = withTiming(shouldShowExpandedFields ? 1 : 0, {
        duration: shouldShowExpandedFields ? 300 : 200,
      });
    }, [shouldShowExpandedFields, expandedProgress]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        maxHeight: expandedProgress.value * 500,
        opacity: expandedProgress.value,
        overflow: "hidden",
      };
    });

    return (
      <View className="mb-4">
        {error ? (
          <View className="mb-3 rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
            <Text className="text-sm text-red-700 dark:text-red-400">
              {error}
            </Text>
          </View>
        ) : null}

        {/* Title Input - Always Visible */}
        <TextInput
          ref={titleInputRef}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          placeholder={t("todos.whatToDo")}
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={onTitleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={!createTodoPending}
          maxLength={200}
        />

        {/* Expanded Fields - Animated */}
        <Animated.View style={animatedStyle}>
          <View className="mt-3 gap-3">
            {/* Description Input */}
            <TextInput
              className="min-h-[80px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              placeholder={t("todos.addDetails")}
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={onDescriptionChange}
              multiline
              textAlignVertical="top"
              editable={!createTodoPending}
            />

            {/* Category Selection */}
            <View className="flex-row flex-wrap gap-2">
              {/* None option */}
              <Pressable
                onPress={() => onCategoryChange(undefined)}
                className={`rounded-lg border px-3 py-2 ${
                  !createCategoryId
                    ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                    : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                }`}
                disabled={createTodoPending}
              >
                <Text
                  className={`text-sm font-medium ${
                    !createCategoryId
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {t("todos.noCategory")}
                </Text>
              </Pressable>

              {/* Category options */}
              {categories?.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => onCategoryChange(category.id)}
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

            {/* Action Button */}
            <Pressable
              onPress={onSubmit}
              className={`rounded-lg py-3 ${
                createTodoPending
                  ? "bg-blue-400"
                  : "bg-blue-600 active:bg-blue-700"
              }`}
              disabled={createTodoPending || !title.trim()}
            >
              <Text className="text-center text-base font-semibold text-white">
                {createTodoPending
                  ? t("todos.creating")
                  : t("todos.createTodo")}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  }
);

CreateTodoForm.displayName = "CreateTodoForm";

export default function TodosScreen() {
  const { t } = useTranslation();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | null | "uncategorized"
  >(null);

  // Create form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createCategoryId, setCreateCategoryId] = useState<
    string | undefined
  >();
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [error, setError] = useState("");
  const titleInputRef = useRef<TextInput>(null);

  // Handle keyboard dismiss
  const handleBlur = () => {
    if (title.trim().length === 0) {
      setIsFormExpanded(false);
    }
  };

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

  // Determine if form should be expanded (focused or has content)
  const shouldShowExpandedFields = isFormExpanded || title.trim().length > 0;

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
      setTitle("");
      setDescription("");
      setCreateCategoryId(undefined);
      setError("");
      setIsFormExpanded(false);
    },
    onError: (err) => {
      setError(err.message || "Failed to create todo");
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      setError(t("errors.titleRequired"));
      return;
    }

    if (title.length > 200) {
      setError(t("errors.titleTooLong"));
      return;
    }

    setError("");
    createTodo.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
      categoryId: createCategoryId,
    });
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
              {t("todos.all")} ({todos?.length || 0})
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
              {t("todos.uncategorized")} (
              {todos?.filter((t) => !t.categoryId).length || 0})
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
            className="ml-1 mr-8 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700"
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
        contentContainerClassName="p-4 native:pb-28"
        ListHeaderComponent={
          <CreateTodoForm
            t={t}
            error={error}
            title={title}
            description={description}
            createCategoryId={createCategoryId}
            isFormExpanded={isFormExpanded}
            shouldShowExpandedFields={shouldShowExpandedFields}
            createTodoPending={createTodo.isPending}
            categories={categories}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onCategoryChange={setCreateCategoryId}
            onFocus={() => setIsFormExpanded(true)}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            titleInputRef={titleInputRef}
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

      <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </View>
  );
}
