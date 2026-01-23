import { trpc } from "@/lib/trpc-client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useCreateTodo() {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const [error, setError] = useState<ErrorState>(null);

  const mutation = trpc.todo.create.useMutation();

  const createTodo = async (
    title: string,
    description: string,
    categoryId?: string
  ): Promise<boolean> => {
    if (!title.trim()) {
      setError(t("errors.titleRequired"));
      return false;
    }

    if (title.length > 200) {
      setError(t("errors.titleTooLong"));
      return false;
    }

    setError(null);

    try {
      await mutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        categoryId,
      });

      utils.todo.getAll.invalidate();
      setError(null);
      return true;
    } catch (caughtError) {
      setError((caughtError as Error).message);
      return false;
    }
  };

  return {
    error,
    isPending: mutation.isPending,
    createTodo,
  };
}
