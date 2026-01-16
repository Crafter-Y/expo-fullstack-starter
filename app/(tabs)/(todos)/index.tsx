import { ModalWrapper } from "@/components/elements/ModalWrapper";
import {
  CategoryFormModal,
  PRESET_COLORS,
  PRESET_ICONS,
} from "@/components/todos/CategoryFormModal";
import CreateTodoForm from "@/components/todos/CreateTodoForm";
import { NativeCategorySelector } from "@/components/todos/NativeCategorySelector";
import { TodoDeleteModal } from "@/components/todos/TodoDeleteModal";
import { TodoItem } from "@/components/todos/TodoItem";
import { useCreateCategory } from "@/lib/hooks/useCreateCategory";
import { useDeleteTodo } from "@/lib/hooks/useDeleteTodo";
import { useUpdateCategory } from "@/lib/hooks/useUpdateCategory";
import { useUpdateTodo } from "@/lib/hooks/useUpdateTodo";
import { RouterOutput } from "@/lib/routers/_app";
import { trpc } from "@/lib/trpc-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Platform, RefreshControl, Text, View } from "react-native";

export type CategoryFiler = string | "all" | "uncategorized";

export default function TodosScreen() {
  const { t } = useTranslation();
  const { category: categoryParam } = useLocalSearchParams<{
    category?: string;
  }>();
  const { updateTodo } = useUpdateTodo();
  const {
    deleteTodo,
    error: deleteError,
    isPending: isDeleting,
  } = useDeleteTodo();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryFiler>("all");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

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

  const {
    isModalOpen: isUpdateModalOpen,
    editingCategory,
    error: updateError,
    isPending: isUpdating,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
    handleUpdateCategory,
  } = useUpdateCategory();

  const handleEditCategory = (
    category: RouterOutput["category"]["getAll"][number]
  ) => {
    openUpdateModal({
      id: category.id,
      name: category.name,
      color: category.color || PRESET_COLORS[0],
      icon: category.icon || PRESET_ICONS[0],
    });
  };

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

  const handleOpenDeleteModal = (id: string, title: string) => {
    setTodoToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      await deleteTodo(todoToDelete.id);
      handleCloseDeleteModal();
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {Platform.OS !== "web" && (
        <NativeCategorySelector
          allTodosCount={todos?.length || 0}
          uncategorizedTodosCount={
            todos?.filter((t) => !t.categoryId).length || 0
          }
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onAddCategory={openModal}
          onEditCategory={handleEditCategory}
        />
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
            categories={categories}
            onToggleComplete={(id) => toggleComplete.mutate({ id })}
            onUpdateTodo={updateTodo}
            onOpenDeleteModal={handleOpenDeleteModal}
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
        <CategoryFormModal
          visible={showCategoryModal}
          error={categoryError}
          isPending={categoryIsPending}
          onSubmit={handleCreateCategory}
          onCancel={closeModal}
        />
      </ModalWrapper>

      {/* Edit Category Modal */}
      <ModalWrapper
        visible={isUpdateModalOpen}
        onClose={closeUpdateModal}
        title="category.editCategory"
      >
        <CategoryFormModal
          category={
            editingCategory
              ? {
                  id: editingCategory.id,
                  name: editingCategory.name,
                  color: editingCategory.color,
                  icon: editingCategory.icon,
                  _count: { todos: 0 },
                }
              : undefined
          }
          visible={isUpdateModalOpen}
          error={updateError}
          isPending={isUpdating}
          onSubmit={handleUpdateCategory}
          onCancel={closeUpdateModal}
        />
      </ModalWrapper>

      {/* Delete Todo Modal */}
      <ModalWrapper
        visible={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="todos.delete"
      >
        <TodoDeleteModal
          todoTitle={todoToDelete?.title || ""}
          error={deleteError}
          isPending={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      </ModalWrapper>
    </View>
  );
}
