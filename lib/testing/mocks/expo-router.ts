import { vi } from "vitest";

type ExpoRouterMock = {
  replace: ReturnType<typeof vi.fn>;
  push: ReturnType<typeof vi.fn>;
  back: ReturnType<typeof vi.fn>;
  setParams: ReturnType<typeof vi.fn>;
  canGoBack: ReturnType<typeof vi.fn>;
  reset: () => void;
};

const GLOBAL_EXPO_ROUTER_KEY = "__expoRouterMockInstance__";

export function createExpoRouterMock(): ExpoRouterMock {
  const replace = vi.fn();
  const push = vi.fn();
  const back = vi.fn();
  const setParams = vi.fn();
  const canGoBack = vi.fn(() => true);

  const reset = () => {
    replace.mockReset();
    push.mockReset();
    back.mockReset();
    setParams.mockReset();
    canGoBack.mockReset();
    canGoBack.mockReturnValue(true);
  };

  return {
    replace,
    push,
    back,
    setParams,
    canGoBack,
    reset,
  };
}

export const registerExpoRouterMock = () => {
  const instance = createExpoRouterMock();
  (globalThis as Record<string, unknown>)[GLOBAL_EXPO_ROUTER_KEY] = instance;
  return instance;
};

export const getRegisteredExpoRouterMock = () =>
  (globalThis as Record<string, unknown>)[GLOBAL_EXPO_ROUTER_KEY] as
    | ExpoRouterMock
    | undefined;

export const getExpoRouterMock = () =>
  getRegisteredExpoRouterMock() ?? registerExpoRouterMock();
