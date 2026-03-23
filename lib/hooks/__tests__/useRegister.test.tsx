import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getExpoRouterMock } from "../../testing/mocks/expo-router";
import { createUseTranslationMock } from "../../testing/mocks/i18n";

import { useRegister } from "../useRegister";

const mocks = vi.hoisted(() => ({
  signUpEmail: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: createUseTranslationMock,
}));

vi.mock("expo-router", () => ({
  useRouter: () => getExpoRouterMock(),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: {
      email: mocks.signUpEmail,
    },
  },
}));

describe("useRegister", () => {
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => undefined);

  beforeEach(() => {
    mocks.signUpEmail.mockReset();
    getExpoRouterMock().reset();
    consoleError.mockClear();
  });

  it("validates required fields", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister("", "", "", "");
    });

    expect(result.current.error).toBe("errors.fillAllFields");
    expect(mocks.signUpEmail).not.toHaveBeenCalled();
  });

  it("validates password confirmation and length", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister(
        "Name",
        "user@example.com",
        "password",
        "mismatch"
      );
    });

    expect(result.current.error).toBe("errors.passwordsDontMatch");
    expect(mocks.signUpEmail).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.handleRegister(
        "Name",
        "user@example.com",
        "short",
        "short"
      );
    });

    expect(result.current.error).toBe("errors.passwordTooShort");
    expect(mocks.signUpEmail).not.toHaveBeenCalled();
  });

  it("navigates on successful registration", async () => {
    mocks.signUpEmail.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister(
        "Name",
        "user@example.com",
        "password123",
        "password123"
      );
    });

    expect(mocks.signUpEmail).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
      name: "Name",
    });
    expect(getExpoRouterMock().replace).toHaveBeenCalledWith("/");
    expect(result.current.error).toBeNull();
  });

  it("uses a fallback message when registration fails", async () => {
    mocks.signUpEmail.mockResolvedValueOnce({ error: { message: "" } });
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister(
        "Name",
        "user@example.com",
        "password123",
        "password123"
      );
    });

    expect(result.current.error).toBe("errors.registrationFailed");
    expect(getExpoRouterMock().replace).not.toHaveBeenCalled();
  });

  it("handles unexpected errors when the request throws", async () => {
    mocks.signUpEmail.mockRejectedValueOnce(new Error("boom"));
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister(
        "Name",
        "user@example.com",
        "password123",
        "password123"
      );
    });

    expect(result.current.error).toBe("errors.unexpectedError");
    expect(getExpoRouterMock().replace).not.toHaveBeenCalled();
  });
});
