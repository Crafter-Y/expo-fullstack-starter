import { trpc } from "@/lib/trpc-client";

export const useDeleteCategory = () => {
  const utils = trpc.useUtils();

  const deleteCategoryMutation = trpc.category.delete.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate();
      utils.todo.getAll.invalidate();
    },
    onError: (err) => {
      console.error("Failed to delete category:", err);
    },
  });

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategoryMutation.mutate({ id: categoryId });
  };

  return {
    isPending: deleteCategoryMutation.isPending,
    handleDeleteCategory,
  };
};
