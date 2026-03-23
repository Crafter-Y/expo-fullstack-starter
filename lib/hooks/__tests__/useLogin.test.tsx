import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getExpoRouterMock } from "../../testing/mocks/expo-router";
import { createUseTranslationMock } from "../../testing/mocks/i18n";

import { useLogin } from "../useLogin";

const mocks = vi.hoisted(() => ({
  signInEmail: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: createUseTranslationMock,
}));

vi.mock("expo-router", () => ({
  useRouter: () => getExpoRouterMock(),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: mocks.signInEmail,
    },
  },
}));

describe("useLogin", () => {
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => undefined);

  beforeEach(() => {
    mocks.signInEmail.mockReset();
    getExpoRouterMock().reset();
    consoleError.mockClear();
  });

  it("validates required fields", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin("", "");
    });

    expect(result.current.error).toBe("errors.fillAllFields");
    expect(mocks.signInEmail).not.toHaveBeenCalled();
  });

  it("navigates on successful login", async () => {
    mocks.signInEmail.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin("user@example.com", "password");
    });

    expect(mocks.signInEmail).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password",
    });
    expect(getExpoRouterMock().replace).toHaveBeenCalledWith("/");
    expect(result.current.error).toBeNull();
  });

  it("stores the API error message", async () => {
    mocks.signInEmail.mockResolvedValueOnce({
      error: { message: "bad login" },
    });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin("user@example.com", "password");
    });

    expect(result.current.error).toBe("bad login");
    expect(getExpoRouterMock().replace).not.toHaveBeenCalled();
  });

  it("falls back to loginFailed when the error shape is unexpected", async () => {
    mocks.signInEmail.mockResolvedValueOnce({
      error: {},
    });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin("user@example.com", "password");
    });

    expect(result.current.error).toBe("errors.loginFailed");
    expect(getExpoRouterMock().replace).not.toHaveBeenCalled();
  });

  it("falls back to the unexpected error message", async () => {
    mocks.signInEmail.mockRejectedValueOnce(new Error("boom"));
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin("user@example.com", "password");
    });

    expect(result.current.error).toBe("errors.unexpectedError");
  });
});
