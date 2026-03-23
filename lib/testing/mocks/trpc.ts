import { vi } from "vitest";

import type { RouterInput, RouterOutput } from "@/lib/routers/_app";

type MutationOptions<TVariables> = {
  onMutate?: (variables: TVariables) => unknown | Promise<unknown>;
  onSuccess?: (data: unknown, variables: TVariables, context?: unknown) => void;
  onError?: (error: unknown, variables: TVariables, context?: unknown) => void;
  onSettled?: (
    data: unknown,
    error: unknown,
    variables: TVariables,
    context?: unknown
  ) => void;
};

type MutationMock<TVariables> = {
  useMutation: (options?: MutationOptions<TVariables>) => {
    mutate: ReturnType<typeof vi.fn>;
    mutateAsync: ReturnType<typeof vi.fn>;
    isPending: boolean;
  };
  mutate: ReturnType<typeof vi.fn>;
  mutateAsync: ReturnType<typeof vi.fn>;
  behavior: { resolveValue?: unknown; rejectError?: unknown };
  getLastOptions: () => MutationOptions<TVariables> | undefined;
  reset: () => void;
};

const resettableMocks = (fns: ReturnType<typeof vi.fn>[]) => {
  fns.forEach((fn) => fn.mockReset());
};

export function createMutationMock<TVariables>(): MutationMock<TVariables> {
  const mutate = vi.fn();
  const mutateAsync = vi.fn();
  const behavior: { resolveValue?: unknown; rejectError?: unknown } = {};
  let lastOptions: MutationOptions<TVariables> | undefined;

  const useMutation = (options?: MutationOptions<TVariables>) => {
    lastOptions = options;

    mutate.mockImplementation((variables: TVariables) => {
      const context = lastOptions?.onMutate?.(variables);

      if (behavior.rejectError) {
        lastOptions?.onError?.(behavior.rejectError, variables, context);
        lastOptions?.onSettled?.(
          undefined,
          behavior.rejectError,
          variables,
          context
        );
        return;
      }

      lastOptions?.onSuccess?.(behavior.resolveValue, variables, context);
      lastOptions?.onSettled?.(
        behavior.resolveValue,
        undefined,
        variables,
        context
      );
    });

    mutateAsync.mockImplementation(async (variables: TVariables) => {
      const context = await lastOptions?.onMutate?.(variables);

      if (behavior.rejectError) {
        lastOptions?.onError?.(behavior.rejectError, variables, context);
        lastOptions?.onSettled?.(
          undefined,
          behavior.rejectError,
          variables,
          context
        );
        throw behavior.rejectError;
      }

      lastOptions?.onSuccess?.(behavior.resolveValue, variables, context);
      lastOptions?.onSettled?.(
        behavior.resolveValue,
        undefined,
        variables,
        context
      );
      return behavior.resolveValue;
    });

    return { mutate, mutateAsync, isPending: false };
  };

  const reset = () => {
    behavior.resolveValue = undefined;
    behavior.rejectError = undefined;
    lastOptions = undefined;
    resettableMocks([mutate, mutateAsync]);
  };

  return {
    useMutation,
    mutate,
    mutateAsync,
    behavior,
    getLastOptions: () => lastOptions,
    reset,
  };
}

type TodoList = RouterOutput["todo"]["getAll"];
type CategoryList = RouterOutput["category"]["getAll"];
type TodoListData = TodoList | undefined;
type CategoryListData = CategoryList | undefined;

type CategoryCreateInput = RouterInput["category"]["create"];
type CategoryUpdateInput = RouterInput["category"]["update"];
type CategoryDeleteInput = RouterInput["category"]["delete"];
type TodoCreateInput = RouterInput["todo"]["create"];
type TodoDeleteInput = RouterInput["todo"]["delete"];
type TodoToggleCompleteInput = RouterInput["todo"]["toggleComplete"];
type TodoUpdateInput = RouterInput["todo"]["update"];

export function createTrpcMock() {
  const createCategoryMutation = createMutationMock<CategoryCreateInput>();
  const deleteCategoryMutation = createMutationMock<CategoryDeleteInput>();
  const updateCategoryMutation = createMutationMock<CategoryUpdateInput>();
  const createTodoMutation = createMutationMock<TodoCreateInput>();
  const deleteTodoMutation = createMutationMock<TodoDeleteInput>();
  const toggleCompleteMutation = createMutationMock<TodoToggleCompleteInput>();
  const updateTodoMutation = createMutationMock<TodoUpdateInput>();

  let todoData: TodoListData = [];
  let categoryData: CategoryListData = [];

  const todoGetAll = {
    cancel: vi.fn(),
    invalidate: vi.fn(),
    getData: vi.fn(() => todoData),
    setData: vi.fn(
      (
        _key: unknown,
        updater: TodoListData | ((data: TodoListData) => TodoListData)
      ) => {
        todoData = typeof updater === "function" ? updater(todoData) : updater;
        return todoData;
      }
    ),
  };

  const categoryGetAll = {
    invalidate: vi.fn(),
    getData: vi.fn(() => categoryData),
    setData: vi.fn(
      (
        _key: unknown,
        updater:
          | CategoryListData
          | ((data: CategoryListData) => CategoryListData)
      ) => {
        categoryData =
          typeof updater === "function" ? updater(categoryData) : updater;
        return categoryData;
      }
    ),
  };

  const utils = {
    category: { getAll: categoryGetAll },
    todo: { getAll: todoGetAll },
  };

  const trpc = {
    useUtils: vi.fn(() => utils),
    category: {
      create: { useMutation: createCategoryMutation.useMutation },
      delete: { useMutation: deleteCategoryMutation.useMutation },
      update: { useMutation: updateCategoryMutation.useMutation },
    },
    todo: {
      create: { useMutation: createTodoMutation.useMutation },
      delete: { useMutation: deleteTodoMutation.useMutation },
      toggleComplete: { useMutation: toggleCompleteMutation.useMutation },
      update: { useMutation: updateTodoMutation.useMutation },
    },
  };

  const reset = () => {
    [
      createCategoryMutation,
      deleteCategoryMutation,
      updateCategoryMutation,
      createTodoMutation,
      deleteTodoMutation,
      toggleCompleteMutation,
      updateTodoMutation,
    ].forEach((mutation) => mutation.reset());

    todoData = [];
    categoryData = [];
    resettableMocks([
      todoGetAll.cancel,
      todoGetAll.invalidate,
      todoGetAll.getData,
      todoGetAll.setData,
      categoryGetAll.invalidate,
      categoryGetAll.getData,
      categoryGetAll.setData,
      trpc.useUtils,
    ]);
  };

  return {
    trpc,
    utils,
    mutations: {
      createCategoryMutation,
      deleteCategoryMutation,
      updateCategoryMutation,
      createTodoMutation,
      deleteTodoMutation,
      toggleCompleteMutation,
      updateTodoMutation,
    },
    reset,
    getTodoData: () => todoData,
    setTodoData: (data: TodoListData) => {
      todoData = data;
    },
    getCategoryData: () => categoryData,
    setCategoryData: (data: CategoryListData) => {
      categoryData = data;
    },
  };
}

export type TrpcMock = ReturnType<typeof createTrpcMock>;

const GLOBAL_TRPC_KEY = "__trpcMockInstance__";

export const registerTrpcMock = () => {
  const instance = createTrpcMock();
  (globalThis as Record<string, unknown>)[GLOBAL_TRPC_KEY] = instance;
  return instance;
};

export const getRegisteredTrpcMock = () =>
  (globalThis as Record<string, unknown>)[GLOBAL_TRPC_KEY] as
    | TrpcMock
    | undefined;

export function getTrpcMocks(): TrpcMock {
  return getRegisteredTrpcMock() ?? registerTrpcMock();
}
