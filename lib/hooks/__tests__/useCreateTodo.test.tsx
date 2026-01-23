import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseTranslationMock } from "../../testing/mocks/i18n";
import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useCreateTodo } from "../useCreateTodo";

vi.mock("react-i18next", () => ({
  useTranslation: createUseTranslationMock,
}));

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useCreateTodo", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("validates the title before mutating", async () => {
    const { result } = renderHook(() => useCreateTodo());

    await act(async () => {
      await result.current.createTodo("   ", "desc");
    });

    expect(result.current.error).toBe("errors.titleRequired");
    expect(
      getTrpcMocks().mutations.createTodoMutation.mutateAsync
    ).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.createTodo("a".repeat(201), "desc");
    });

    expect(result.current.error).toBe("errors.titleTooLong");
    expect(
      getTrpcMocks().mutations.createTodoMutation.mutateAsync
    ).not.toHaveBeenCalled();
  });

  it("mutates with trimmed values and invalidates on success", async () => {
    const { result } = renderHook(() => useCreateTodo());

    await act(async () => {
      const success = await result.current.createTodo(
        "  New Todo  ",
        "  Details  ",
        "cat-1"
      );
      expect(success).toBe(true);
    });

    expect(
      getTrpcMocks().mutations.createTodoMutation.mutateAsync
    ).toHaveBeenCalledWith({
      title: "New Todo",
      description: "Details",
      categoryId: "cat-1",
    });
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it("stores the error message when the mutation fails", async () => {
    getTrpcMocks().mutations.createTodoMutation.behavior.rejectError =
      new Error("create failed");

    const { result } = renderHook(() => useCreateTodo());

    await act(async () => {
      const success = await result.current.createTodo("Todo", "desc");
      expect(success).toBe(false);
    });

    expect(result.current.error).toBe("create failed");
  });
});
