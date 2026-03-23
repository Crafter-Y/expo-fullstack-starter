import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useDeleteCategory } from "../useDeleteCategory";

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useDeleteCategory", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the delete mutation and invalidates caches", () => {
    const { result } = renderHook(() => useDeleteCategory());

    act(() => result.current.handleDeleteCategory("cat-1"));

    expect(
      getTrpcMocks().mutations.deleteCategoryMutation.mutate
    ).toHaveBeenCalledWith({ id: "cat-1" });

    expect(getTrpcMocks().utils.category.getAll.invalidate).toHaveBeenCalled();
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
  });

  it("logs errors when the delete mutation fails", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const deletionError = new Error("nope");
    getTrpcMocks().mutations.deleteCategoryMutation.behavior.rejectError =
      deletionError;

    const { result } = renderHook(() => useDeleteCategory());
    act(() => result.current.handleDeleteCategory("cat-2"));

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to delete category:",
      deletionError
    );
  });
});
