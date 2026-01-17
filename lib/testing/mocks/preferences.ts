import { usePreferencesStore } from "@/lib/stores/preferences";
import { vi } from "vitest";

import { asyncStorageMock } from "./async-storage";
import { colorSchemeMock } from "./nativewind";

export { asyncStorageMock, colorSchemeMock };

export const ensureMatchMedia = () => {
  if (typeof window.matchMedia !== "function") {
    window.matchMedia = () => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    });
  }
};

export const getPreferencesStore = () => usePreferencesStore;

export const resetPreferencesStore = () => {
  const usePreferencesStore = getPreferencesStore();
  usePreferencesStore.setState({ language: "en", theme: "system" });
};
