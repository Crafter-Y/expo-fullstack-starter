import { trpc } from "@/lib/trpc-client";

export function useToggleTodo() {
  const utils = trpc.useUtils();

  const mutation = trpc.todo.toggleComplete.useMutation({
    onMutate: async ({ id }) => {
      await utils.todo.getAll.cancel();
      const previousTodos = utils.todo.getAll.getData();

      utils.todo.getAll.setData(undefined, (old) =>
        old?.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
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

  const toggleComplete = async (id: string) => {
    await mutation.mutateAsync({ id });
  };

  return {
    toggleComplete,
    isPending: mutation.isPending,
  };
}
