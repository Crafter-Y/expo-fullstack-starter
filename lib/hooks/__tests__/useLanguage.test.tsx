import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { asyncStorageMock } from "@/lib/testing/mocks/async-storage";
import { createI18nMock } from "@/lib/testing/mocks/i18n";
import { colorSchemeMock } from "@/lib/testing/mocks/nativewind";
import {
  getPreferencesStore,
  resetPreferencesStore,
} from "@/lib/testing/mocks/preferences";
import { useLanguage } from "../useLanguage";

vi.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "en" }],
}));

vi.mock("nativewind", async () => ({
  colorScheme: colorSchemeMock,
}));

vi.mock("i18next", async () => ({
  default: createI18nMock(),
}));

afterEach(async () => {
  resetPreferencesStore();
  asyncStorageMock.reset();
});

describe("useLanguage", () => {
  it("exposes the current language and allows toggling", async () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe("en");

    act(() => result.current.changeLanguage("de"));
    expect(result.current.language).toBe("de");
    expect(getPreferencesStore().getState().language).toBe("de");

    act(() => result.current.toggleLanguage());
    expect(result.current.language).toBe("en");
    expect(getPreferencesStore().getState().language).toBe("en");

    act(() => result.current.toggleLanguage());
    expect(result.current.language).toBe("de");
    expect(getPreferencesStore().getState().language).toBe("de");
  });
});
