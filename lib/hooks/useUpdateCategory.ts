import { trpc } from "@/lib/trpc-client";
import { useState } from "react";

export const useUpdateCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    color: string;
    icon: string;
  } | null>(null);

  const utils = trpc.useUtils();

  const updateCategoryMutation = trpc.category.update.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate();
      utils.todo.getAll.invalidate();
      closeModal();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const openModal = (category: {
    id: string;
    name: string;
    color: string;
    icon: string;
  }) => {
    setEditingCategory(category);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setError(null);
  };

  const handleUpdateCategory = (name: string, color: string, icon: string) => {
    if (!editingCategory) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    if (trimmedName.length > 100) {
      setError("Category name is too long");
      return;
    }

    updateCategoryMutation.mutate({
      id: editingCategory.id,
      name: trimmedName,
      color,
      icon,
    });
  };

  return {
    isModalOpen,
    editingCategory,
    error,
    isPending: updateCategoryMutation.isPending,
    openModal,
    closeModal,
    handleUpdateCategory,
  };
};
