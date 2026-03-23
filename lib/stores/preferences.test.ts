import i18n from "i18next";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  asyncStorageMock,
  colorSchemeMock,
  resetPreferencesStore,
} from "@/lib/testing/mocks/preferences";

import { usePreferencesStore } from "./preferences";

vi.mock("@react-native-async-storage/async-storage", async () => ({
  default: (await import("../testing/mocks/async-storage")).asyncStorageMock,
}));

vi.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "en" }],
}));

vi.mock("nativewind", async () => ({
  colorScheme: (await import("../testing/mocks/nativewind")).colorSchemeMock,
}));

vi.mock("i18next", async () => ({
  default: (await import("../testing/mocks/i18n")).createI18nMock(),
}));

const setMatchMedia = (matches: boolean) => {
  window.matchMedia = () => ({
    matches,
    media: "",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  });
};

const loadStoreWithLocales = async (locales: { languageCode?: string }[]) => {
  vi.resetModules();
  vi.doMock("expo-localization", () => ({
    getLocales: () => locales,
  }));
  const { usePreferencesStore } = await import("./preferences");
  return usePreferencesStore;
};

afterEach(() => {
  resetPreferencesStore();
  asyncStorageMock.reset();
  vi.clearAllMocks();
});

describe("usePreferencesStore", () => {
  it("updates language and syncs i18n", () => {
    const { setLanguage } = usePreferencesStore.getState();

    setLanguage("en");
    // eslint-disable-next-line import/no-named-as-default-member
    expect(i18n.changeLanguage).not.toHaveBeenCalled();

    setLanguage("de");
    expect(usePreferencesStore.getState().language).toBe("de");
    // eslint-disable-next-line import/no-named-as-default-member
    expect(i18n.changeLanguage).toHaveBeenCalledWith("de");
  });

  it("updates theme and resolves system mode on web", () => {
    setMatchMedia(false);
    const { setTheme } = usePreferencesStore.getState();

    setTheme("dark");
    expect(usePreferencesStore.getState().theme).toBe("dark");
    expect(colorSchemeMock.set).toHaveBeenCalledWith("dark");

    colorSchemeMock.set.mockClear();
    setTheme("system");
    expect(usePreferencesStore.getState().theme).toBe("system");
    expect(colorSchemeMock.set).toHaveBeenCalledWith("light");
  });

  it("uses dark system preference when matchMedia matches", () => {
    setMatchMedia(true);
    const { setTheme } = usePreferencesStore.getState();

    setTheme("system");
    expect(usePreferencesStore.getState().theme).toBe("system");
    expect(colorSchemeMock.set).toHaveBeenCalledWith("dark");
  });

  it("rehydrates persisted state and syncs side effects", async () => {
    setMatchMedia(false);
    await asyncStorageMock.setItem(
      "preferences-storage",
      JSON.stringify({
        state: { language: "de", theme: "system" },
        version: 0,
      })
    );

    await usePreferencesStore.persist.rehydrate();

    expect(usePreferencesStore.getState().language).toBe("de");
    expect(usePreferencesStore.getState().theme).toBe("system");
    // eslint-disable-next-line import/no-named-as-default-member
    expect(i18n.changeLanguage).toHaveBeenCalledWith("de");
    expect(colorSchemeMock.set).toHaveBeenCalledWith("light");
  });

  it("rehydrates system theme when matchMedia prefers dark", async () => {
    setMatchMedia(true);
    await asyncStorageMock.setItem(
      "preferences-storage",
      JSON.stringify({
        state: { language: "de", theme: "system" },
        version: 0,
      })
    );

    await usePreferencesStore.persist.rehydrate();

    expect(colorSchemeMock.set).toHaveBeenCalledWith("dark");
  });

  it("rehydrates non-system theme", async () => {
    await asyncStorageMock.setItem(
      "preferences-storage",
      JSON.stringify({
        state: { language: "de", theme: "dark" },
        version: 0,
      })
    );

    await usePreferencesStore.persist.rehydrate();

    expect(colorSchemeMock.set).toHaveBeenCalledWith("dark");
  });

  it("defaults to device language when it is de", async () => {
    const store = await loadStoreWithLocales([{ languageCode: "de" }]);

    expect(store.getState().language).toBe("de");
  });

  it("falls back to en when device language is missing", async () => {
    const store = await loadStoreWithLocales([]);

    expect(store.getState().language).toBe("en");
  });
});
