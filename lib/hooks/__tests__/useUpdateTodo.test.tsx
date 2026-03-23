import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseTranslationMock } from "../../testing/mocks/i18n";
import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useUpdateTodo } from "../useUpdateTodo";

vi.mock("react-i18next", () => ({
  useTranslation: createUseTranslationMock,
}));

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useUpdateTodo", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("validates title and normalizes description", async () => {
    const { result } = renderHook(() => useUpdateTodo());

    await act(async () => {
      await expect(
        result.current.updateTodo("1", "   ", "desc")
      ).rejects.toThrow("errors.titleRequired");
    });
    expect(result.current.error).toBe("errors.titleRequired");
    expect(result.current.errorTodoId).toBe("1");

    await act(async () => {
      await expect(
        result.current.updateTodo("1", "a".repeat(201), "desc")
      ).rejects.toThrow("errors.titleTooLong");
    });
    expect(result.current.error).toBe("errors.titleTooLong");
    expect(result.current.errorTodoId).toBe("1");
  });

  it("optimistically updates todo fields and clears errors on success", async () => {
    getTrpcMocks().setTodoData([
      {
        id: "1",
        title: "Old",
        description: "Desc",
        categoryId: "cat-1",
        completed: false,
        category: null,
      },
    ]);

    const { result } = renderHook(() => useUpdateTodo());

    await act(async () => {
      await result.current.updateTodo(
        "1",
        "  New Title  ",
        "  New desc  ",
        "cat-2"
      );
    });

    expect(
      getTrpcMocks().mutations.updateTodoMutation.mutateAsync
    ).toHaveBeenCalledWith({
      id: "1",
      title: "New Title",
      description: "New desc",
      categoryId: "cat-2",
    });

    expect(getTrpcMocks().getTodoData()).toEqual([
      {
        id: "1",
        title: "New Title",
        description: "New desc",
        categoryId: "cat-2",
        completed: false,
        category: null,
      },
    ]);
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
    expect(result.current.errorTodoId).toBeNull();
  });

  it("restores todos and sets errors when the mutation fails", async () => {
    getTrpcMocks().setTodoData([
      {
        id: "1",
        title: "Old",
        description: "Desc",
        categoryId: "cat-1",
        completed: false,
        category: null,
      },
      {
        id: "2",
        title: "Another Todo",
        description: "Desc 2",
        categoryId: "cat-1",
        completed: true,
        category: null,
      },
    ]);
    getTrpcMocks().mutations.updateTodoMutation.behavior.rejectError =
      new Error("update failed");

    const { result } = renderHook(() => useUpdateTodo());

    await act(async () => {
      await expect(
        result.current.updateTodo("1", "New", "Desc")
      ).rejects.toThrow("update failed");
    });

    expect(getTrpcMocks().utils.todo.getAll.setData).toHaveBeenCalledTimes(2);
    expect(getTrpcMocks().getTodoData()![0]).toEqual({
      id: "1",
      title: "Old",
      description: "Desc",
      categoryId: "cat-1",
      completed: false,
      category: null,
    });
    expect(result.current.error).toBe("update failed");
    expect(result.current.errorTodoId).toBe("1");

    act(() => result.current.clearError("other"));
    expect(result.current.error).toBe("update failed");

    act(() => result.current.clearError("1"));
    expect(result.current.error).toBeNull();
    expect(result.current.errorTodoId).toBeNull();
  });
});
