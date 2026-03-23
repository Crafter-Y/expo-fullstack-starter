import { vi } from "vitest";

export const createUseTranslationMock = () => ({
  t: (key: string) => key,
});

export const createI18nMock = () => ({
  language: "en",
  changeLanguage: vi.fn(),
  t: (key: string) => key,
});
