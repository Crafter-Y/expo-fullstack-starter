import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  init: vi.fn(),
  use: vi.fn(),
  getLocales: vi.fn(),
}));

vi.mock("i18next", () => ({
  default: {
    use: mocks.use,
    init: mocks.init,
  },
}));

vi.mock("react-i18next", () => ({
  initReactI18next: {},
}));

vi.mock("expo-localization", () => ({
  getLocales: mocks.getLocales,
}));

describe("i18n", () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.init.mockReset();
    mocks.use.mockReset();
    mocks.getLocales.mockReset();
    mocks.use.mockReturnValue({ init: mocks.init });
  });

  it("initializes with German when the device language is de", async () => {
    mocks.getLocales.mockReturnValue([{ languageCode: "de" }]);

    await import("./i18n");

    expect(mocks.init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: "de",
        fallbackLng: "en",
      })
    );
  });

  it("falls back to English for unsupported device languages", async () => {
    mocks.getLocales.mockReturnValue([{ languageCode: "fr" }]);

    await import("./i18n");

    expect(mocks.init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: "en",
        fallbackLng: "en",
      })
    );
  });

  it("falls back to English for devices with no language", async () => {
    mocks.getLocales.mockReturnValue([]);

    await import("./i18n");

    expect(mocks.init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: "en",
        fallbackLng: "en",
      })
    );
  });
});
