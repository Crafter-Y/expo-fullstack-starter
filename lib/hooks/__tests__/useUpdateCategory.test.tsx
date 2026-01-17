import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useUpdateCategory } from "../useUpdateCategory";

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useUpdateCategory", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("opens and closes the modal with the selected category", () => {
    const { result } = renderHook(() => useUpdateCategory());

    act(() =>
      result.current.openModal({
        id: "1",
        name: "Old",
        color: "#000000",
        icon: "tag",
      })
    );

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.editingCategory!.id).toBe("1");
    expect(result.current.error).toBeNull();

    act(() => result.current.closeModal());
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.editingCategory).toBeNull();
  });

  it("validates the updated name", () => {
    const { result } = renderHook(() => useUpdateCategory());

    act(() =>
      result.current.openModal({
        id: "1",
        name: "Old",
        color: "#000000",
        icon: "tag",
      })
    );

    act(() => result.current.handleUpdateCategory("   ", "#fff", "tag"));
    expect(result.current.error).toBe("Category name is required");

    act(() =>
      result.current.handleUpdateCategory("a".repeat(101), "#fff", "tag")
    );
    expect(result.current.error).toBe("Category name is too long");
  });

  it("updates a category and closes the modal on success", () => {
    const { result } = renderHook(() => useUpdateCategory());

    act(() =>
      result.current.openModal({
        id: "cat-1",
        name: "Old",
        color: "#000000",
        icon: "tag",
      })
    );

    act(() =>
      result.current.handleUpdateCategory("  New  ", "#123456", "star")
    );

    expect(
      getTrpcMocks().mutations.updateCategoryMutation.mutate
    ).toHaveBeenCalledWith({
      id: "cat-1",
      name: "New",
      color: "#123456",
      icon: "star",
    });

    expect(getTrpcMocks().utils.category.getAll.invalidate).toHaveBeenCalled();
    expect(getTrpcMocks().utils.todo.getAll.invalidate).toHaveBeenCalled();
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.editingCategory).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("surfaces mutation errors", () => {
    getTrpcMocks().mutations.updateCategoryMutation.behavior.rejectError =
      new Error("failed");

    const { result } = renderHook(() => useUpdateCategory());
    act(() =>
      result.current.openModal({
        id: "cat-2",
        name: "Old",
        color: "#fff",
        icon: "tag",
      })
    );

    act(() => result.current.handleUpdateCategory("Updated", "#fff", "tag"));

    expect(result.current.error).toBe("failed");
  });

  it("returns early if no category is being edited", () => {
    const { result } = renderHook(() => useUpdateCategory());

    act(() => result.current.handleUpdateCategory("Name", "#fff", "tag"));
    expect(
      getTrpcMocks().mutations.updateCategoryMutation.mutate
    ).not.toHaveBeenCalled();
  });
});
