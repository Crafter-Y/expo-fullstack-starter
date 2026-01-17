import { trpc } from "@/lib/trpc-client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useUpdateTodo() {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const [error, setError] = useState<ErrorState>(null);
  const [errorTodoId, setErrorTodoId] = useState<string | null>(null);

  const setErrorForTodo = (todoId: string, message: ErrorState) => {
    setError(message);
    setErrorTodoId(message ? todoId : null);
  };

  const mutation = trpc.todo.update.useMutation({
    onMutate: async (input) => {
      await utils.todo.getAll.cancel();
      const previousTodos = utils.todo.getAll.getData();

      utils.todo.getAll.setData(undefined, (old) =>
        old?.map((todo) =>
          todo.id === input.id
            ? {
                ...todo,
                title: input.title!,
                description: input.description!,
                ...(input.categoryId !== undefined
                  ? { categoryId: input.categoryId }
                  : {}),
              }
            : todo
        )
      );

      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      utils.todo.getAll.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const updateTodo = async (
    id: string,
    title: string,
    description: string,
    categoryId?: string | null
  ): Promise<void> => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorForTodo(id, t("errors.titleRequired"));
      throw new Error(t("errors.titleRequired"));
    }

    if (trimmedTitle.length > 200) {
      setErrorForTodo(id, t("errors.titleTooLong"));
      throw new Error(t("errors.titleTooLong"));
    }

    setErrorForTodo(id, null);

    try {
      await mutation.mutateAsync({
        id,
        title: trimmedTitle,
        description: description.trim(),
        categoryId,
      });
      setErrorForTodo(id, null);
    } catch (caughtError) {
      const message = (caughtError as Error).message;
      setErrorForTodo(id, message);
      throw caughtError;
    }
  };

  const clearError = (id?: string) => {
    if (id && errorTodoId && errorTodoId !== id) {
      return;
    }

    setError(null);
    setErrorTodoId(null);
  };

  return {
    updateTodo,
    error,
    errorTodoId,
    clearError,
    isPending: mutation.isPending,
  };
}
