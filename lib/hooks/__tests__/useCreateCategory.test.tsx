import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseTranslationMock } from "../../testing/mocks/i18n";
import { getTrpcMocks } from "../../testing/mocks/trpc";

import { useCreateCategory } from "../useCreateCategory";

vi.mock("react-i18next", () => ({
  useTranslation: createUseTranslationMock,
}));

vi.mock("@/lib/trpc-client", () => ({
  trpc: getTrpcMocks().trpc,
}));

describe("useCreateCategory", () => {
  beforeEach(() => {
    getTrpcMocks().reset();
  });

  it("validates the category name before mutating", () => {
    const { result } = renderHook(() => useCreateCategory());

    act(() => result.current.handleCreateCategory("   ", "#fff", "star"));
    expect(result.current.error).toBe("errors.nameRequired");
    expect(
      getTrpcMocks().mutations.createCategoryMutation.mutate
    ).not.toHaveBeenCalled();

    act(() =>
      result.current.handleCreateCategory("a".repeat(101), "#fff", "star")
    );
    expect(result.current.error).toBe("errors.nameTooLong");
    expect(
      getTrpcMocks().mutations.createCategoryMutation.mutate
    ).not.toHaveBeenCalled();
  });

  it("calls the mutation with trimmed data and closes on success", () => {
    const { result } = renderHook(() => useCreateCategory());

    act(() => result.current.openModal());
    act(() =>
      result.current.handleCreateCategory("  Work  ", "#123456", "star")
    );

    expect(
      getTrpcMocks().mutations.createCategoryMutation.mutate
    ).toHaveBeenCalledWith({
      name: "Work",
      color: "#123456",
      icon: "star",
    });

    act(() =>
      getTrpcMocks()
        .mutations.createCategoryMutation.getLastOptions()
        ?.onSuccess?.(undefined, {
          name: "Work",
          color: "#123456",
          icon: "star",
        })
    );

    expect(getTrpcMocks().utils.category.getAll.invalidate).toHaveBeenCalled();
    expect(result.current.showModal).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("uses a fallback error message when the mutation fails", () => {
    getTrpcMocks().mutations.createCategoryMutation.behavior.rejectError =
      new Error("");
    const { result } = renderHook(() => useCreateCategory());

    act(() => result.current.handleCreateCategory("Home", "#fff", "house"));

    expect(result.current.error).toBe("errors.createCategoryFailed");
  });
});
