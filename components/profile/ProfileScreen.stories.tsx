import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { View } from "react-native";
import { expect, fn, userEvent, within } from "storybook/test";
import { ProfileScreen } from "./ProfileScreen";

const meta = {
  title: "profile/ProfileScreen",
  component: ProfileScreen,
  tags: ["autodocs"],
  args: {
    onCycleTheme: fn(),
    onToggleLanguage: fn(),
    onLogout: fn(),
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-md flex-1">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProfileScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false,
  },
};

export const WithoutUser: Story = {
  args: {
    theme: "Dark",
    language: "Deutsch",
    loggingOut: false,
  },
};

export const LoggingOut: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the sign out button
    const signOutButton = canvas.getByTestId(
      "profile-sign-out"
    ) as HTMLButtonElement;

    // Verify button is disabled
    await expect(signOutButton.disabled).toBe(true);

    // Try to click the button - should fail due to disabled state
    await expect(async () => {
      await userEvent.click(signOutButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onLogout was NOT called
    await expect(args.onLogout).not.toHaveBeenCalled();
  },
};

export const ThemeCycling: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all pressable fields (theme and language are pressable)
    const fields = canvas.getAllByRole("button");

    // First pressable field should be theme
    const themeField = fields[0];

    // Click the theme field
    await userEvent.click(themeField);

    // Verify onCycleTheme was called
    await expect(args.onCycleTheme).toHaveBeenCalledTimes(1);
  },
};

export const LanguageToggling: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Dark",
    language: "English",
    loggingOut: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all pressable fields
    const fields = canvas.getAllByRole("button");

    // Second pressable field should be language
    const languageField = fields[1];

    // Click the language field
    await userEvent.click(languageField);

    // Verify onToggleLanguage was called
    await expect(args.onToggleLanguage).toHaveBeenCalledTimes(1);
  },
};

export const SignOut: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all buttons (theme, language, sign out)
    const buttons = canvas.getAllByRole("button");

    // Last button should be sign out
    const signOutButton = buttons[buttons.length - 1];

    // Click the sign out button
    await userEvent.click(signOutButton);

    // Verify onLogout was called
    await expect(args.onLogout).toHaveBeenCalledTimes(1);
  },
};
