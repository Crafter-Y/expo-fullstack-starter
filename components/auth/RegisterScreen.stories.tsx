import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { RegisterScreen } from "./RegisterScreen";

const meta = {
  title: "auth/RegisterScreen",
  component: RegisterScreen,
  tags: ["autodocs"],
  args: {
    onRegister: fn(),
    login: fn(),
  },
  decorators: [
    (Story) => (
      <View className="max-w-md p-4">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RegisterScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: null,
    loading: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input fields using testIDs
    const nameInput = canvas.getByTestId("register-name");
    const emailInput = canvas.getByTestId("register-email");
    const passwordInput = canvas.getByTestId("register-password");
    const confirmPasswordInput = canvas.getByTestId(
      "register-confirm-password"
    );

    // Type in registration details
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    // Find and click the sign up button
    const signUpButton = canvas.getAllByRole("button")[0];
    await userEvent.click(signUpButton);

    // Verify onRegister was called once with the correct values
    await expect(args.onRegister).toHaveBeenCalledTimes(1);
    await expect(args.onRegister).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "password123",
      "password123"
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Passwords do not match",
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
    const nameInput = canvas.getByTestId("register-name") as HTMLInputElement;
    const emailInput = canvas.getByTestId("register-email") as HTMLInputElement;
    const passwordInput = canvas.getByTestId(
      "register-password"
    ) as HTMLInputElement;
    const confirmPasswordInput = canvas.getByTestId(
      "register-confirm-password"
    ) as HTMLInputElement;

    // Verify all inputs are disabled
    await expect(nameInput.disabled).toBe(true);
    await expect(emailInput.disabled).toBe(true);
    await expect(passwordInput.disabled).toBe(true);
    await expect(confirmPasswordInput.disabled).toBe(true);

    // Find the sign up button (should show "Creating account...")
    const signUpButton = canvas.getAllByRole("button")[0] as HTMLButtonElement;

    // Verify button is disabled
    await expect(signUpButton.disabled).toBe(true);

    // Try to click the button - should fail due to pointer-events: none
    await expect(async () => {
      await userEvent.click(signUpButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onRegister was NOT called
    await expect(args.onRegister).not.toHaveBeenCalled();
  },
};

export const LoginNavigation: Story = {
  args: {
    error: null,
    loading: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the "Sign In" link (second button)
    const signInLink = canvas.getAllByRole("button")[1];

    // Click the sign in link
    await userEvent.click(signInLink);

    // Verify login was called
    await expect(args.login).toHaveBeenCalledTimes(1);
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
    const nameInput = canvas.getByTestId("register-name");
    const emailInput = canvas.getByTestId("register-email");
    const passwordInput = canvas.getByTestId("register-password");
    const confirmPasswordInput = canvas.getByTestId(
      "register-confirm-password"
    );

    // Type in first field and press Enter
    await userEvent.type(nameInput, "John Doe");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to email (in web, we can check document.activeElement)
    await expect(document.activeElement).toBe(emailInput);

    // Type in email and press Enter
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to password
    await expect(document.activeElement).toBe(passwordInput);

    // Type in password and press Enter
    await userEvent.type(passwordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to confirm password
    await expect(document.activeElement).toBe(confirmPasswordInput);

    // Type in confirm password and press Enter to submit
    await userEvent.type(confirmPasswordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify onRegister was called with correct values
    await expect(args.onRegister).toHaveBeenCalledTimes(1);
    await expect(args.onRegister).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "password123",
      "password123"
    );
  },
};
