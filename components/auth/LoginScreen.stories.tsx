import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { LoginScreen } from "./LoginScreen";

const meta = {
  title: "auth/LoginScreen",
  component: LoginScreen,
  tags: ["autodocs"],
  args: {
    onLogin: fn(),
    register: fn(),
  },
  decorators: [
    (Story) => (
      <View className="max-w-md p-4">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof LoginScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: null,
    loading: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the email and password inputs
    const emailInput = canvas.getByTestId("login-email");
    const passwordInput = canvas.getByTestId("login-password");

    // Type in credentials
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Find and click the login button
    const loginButton = canvas.getAllByRole("button")[0];
    await userEvent.click(loginButton);

    // Verify onLogin was called once with the correct values
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(args.onLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid email or password",
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    error: null,
    loading: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find inputs
    const emailInput = canvas.getByTestId("login-email") as HTMLInputElement;
    const passwordInput = canvas.getByTestId(
      "login-password"
    ) as HTMLInputElement;

    // Verify inputs are disabled
    await expect(emailInput.disabled).toBe(true);
    await expect(passwordInput.disabled).toBe(true);

    // Find the login button (should show "Signing in...")
    const loginButton = canvas.getAllByRole("button")[0] as HTMLButtonElement;

    // Verify button is disabled
    await expect(loginButton.disabled).toBe(true);

    // Try to click the button - should fail due to pointer-events: none
    await expect(async () => {
      await userEvent.click(loginButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onLogin was NOT called
    await expect(args.onLogin).not.toHaveBeenCalled();
  },
};

export const RegisterNavigation: Story = {
  args: {
    error: null,
    loading: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the "Sign Up" link text
    const signUpLink = canvas.getAllByRole("button")[1];

    // Click the sign up link
    await userEvent.click(signUpLink);

    // Verify register was called
    await expect(args.register).toHaveBeenCalledTimes(1);
  },
};

export const KeyboardSubmit: Story = {
  args: {
    error: null,
    loading: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input fields
    const emailInput = canvas.getByTestId("login-email");
    const passwordInput = canvas.getByTestId("login-password");

    // Type in email and press Enter
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to password field
    await expect(document.activeElement).toBe(passwordInput);

    // Type in password and press Enter to submit
    await userEvent.type(passwordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify onLogin was called with correct values
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(args.onLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  },
};
