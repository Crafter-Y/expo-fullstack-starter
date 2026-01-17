import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useDeleteTodo } from "../useDeleteTodo";

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useDeleteTodo", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("optimistically removes the todo and invalidates on success", async () => {
    getTrpcMocks().setTodoData([
      {
        id: "1",
        title: "First",
        description: "A",
        categoryId: "cat-1",
        completed: false,
        category: null,
      },
      {
        id: "2",
        title: "Second",
        description: "B",
        categoryId: "cat-2",
        completed: false,
        category: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteTodo());

    await act(async () => {
      await result.current.deleteTodo("1");
    });

    expect(
      getTrpcMocks().mutations.deleteTodoMutation.mutateAsync
    ).toHaveBeenCalledWith({ id: "1" });
    expect(getTrpcMocks().getTodoData()).toEqual([
      {
        id: "2",
        title: "Second",
        description: "B",
        categoryId: "cat-2",
        completed: false,
        category: null,
      },
    ]);
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
    expect(result.current.errorTodoId).toBeNull();
  });

  it("captures errors for the specific todo", async () => {
    getTrpcMocks().mutations.deleteTodoMutation.behavior.rejectError =
      new Error("delete failed");

    const { result } = renderHook(() => useDeleteTodo());

    await act(async () => {
      await expect(result.current.deleteTodo("todo-1")).rejects.toThrow(
        "delete failed"
      );
    });

    expect(result.current.error).toBe("delete failed");
    expect(result.current.errorTodoId).toBe("todo-1");

    act(() => result.current.clearError("other"));
    expect(result.current.error).toBe("delete failed");

    act(() => result.current.clearError("todo-1"));
    expect(result.current.error).toBeNull();
    expect(result.current.errorTodoId).toBeNull();
  });
});
