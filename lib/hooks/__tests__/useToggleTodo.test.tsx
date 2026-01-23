import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useToggleTodo } from "../useToggleTodo";

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useToggleTodo", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("optimistically toggles completion and invalidates on success", async () => {
    getTrpcMocks().setTodoData([
      {
        id: "1",
        title: "Todo",
        description: "Desc",
        categoryId: null,
        completed: false,
        category: null,
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Desc 2",
        categoryId: null,
        completed: false,
        category: null,
      },
    ]);

    const { result } = renderHook(() => useToggleTodo());

    await act(async () => {
      await result.current.toggleComplete("1");
    });

    expect(getTrpcMocks().getTodoData()![0]).toEqual({
      id: "1",
      title: "Todo",
      description: "Desc",
      categoryId: null,
      completed: true,
      category: null,
    });
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
  });

  it("rolls back changes when the mutation fails", async () => {
    getTrpcMocks().setTodoData([
      {
        id: "1",
        title: "Todo",
        description: "Desc",
        categoryId: null,
        completed: false,
        category: null,
      },
    ]);
    getTrpcMocks().mutations.toggleCompleteMutation.behavior.rejectError =
      new Error("toggle failed");

    const { result } = renderHook(() => useToggleTodo());

    await act(async () => {
      await expect(result.current.toggleComplete("1")).rejects.toThrow(
        "toggle failed"
      );
    });

    expect(getTrpcMocks().getTodoData()).toEqual([
      {
        id: "1",
        title: "Todo",
        description: "Desc",
        categoryId: null,
        completed: false,
        category: null,
      },
    ]);
  });
});
