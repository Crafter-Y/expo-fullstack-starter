import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createI18nMock } from "@/lib/testing/mocks/i18n";
import {
  asyncStorageMock,
  colorSchemeMock,
  ensureMatchMedia,
  getPreferencesStore,
  resetPreferencesStore,
} from "@/lib/testing/mocks/preferences";
import { useTheme } from "../useTheme";

vi.mock("@react-native-async-storage/async-storage", async () => ({
  default: (await import("../../testing/mocks/async-storage")).asyncStorageMock,
}));

vi.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "en" }],
}));

vi.mock("nativewind", async () => ({
  colorScheme: (await import("../../testing/mocks/nativewind")).colorSchemeMock,
}));

vi.mock("i18next", async () => ({
  default: createI18nMock(),
}));

afterEach(async () => {
  resetPreferencesStore();
  asyncStorageMock.reset();
  colorSchemeMock.set.mockClear();
});

describe("useTheme", () => {
  it("updates and cycles theme", async () => {
    ensureMatchMedia();
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("system");

    act(() => result.current.changeTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(getPreferencesStore().getState().theme).toBe("dark");
    expect(colorSchemeMock.set).toHaveBeenCalledWith("dark");

    act(() => result.current.cycleTheme());
    expect(result.current.theme).toBe("system");
    expect(getPreferencesStore().getState().theme).toBe("system");

    act(() => result.current.cycleTheme());
    expect(result.current.theme).toBe("light");
    expect(getPreferencesStore().getState().theme).toBe("light");
  });
});
