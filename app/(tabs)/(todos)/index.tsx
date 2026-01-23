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
import { useCreateTodo } from "@/lib/hooks/useCreateTodo";
import { useDeleteTodo } from "@/lib/hooks/useDeleteTodo";
import { useToggleTodo } from "@/lib/hooks/useToggleTodo";
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
  const { error, createTodo } = useCreateTodo();
  const { toggleComplete } = useToggleTodo();

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

  const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery();
  const { data: categories } = trpc.category.getAll.useQuery();

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
            onToggleComplete={toggleComplete}
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
