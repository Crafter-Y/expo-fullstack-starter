import { trpc } from "@/lib/trpc-client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useDeleteTodo() {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const [error, setError] = useState<ErrorState>(null);
  const [errorTodoId, setErrorTodoId] = useState<string | null>(null);

  const setErrorForTodo = (todoId: string, message: ErrorState) => {
    setError(message);
    setErrorTodoId(message ? todoId : null);
  };

  const mutation = trpc.todo.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.todo.getAll.cancel();
      const previousTodos = utils.todo.getAll.getData();

      utils.todo.getAll.setData(undefined, (old) =>
        old?.filter((todo) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        utils.todo.getAll.setData(undefined, context.previousTodos);
      }
    },
    onSettled: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const deleteTodo = async (id: string): Promise<void> => {
    setErrorForTodo(id, null);

    try {
      await mutation.mutateAsync({ id });
      setErrorForTodo(id, null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error && caughtError.message
          ? caughtError.message
          : t("errors.unexpectedError");
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
    deleteTodo,
    error,
    errorTodoId,
    clearError,
    isPending: mutation.isPending,
  };
}
