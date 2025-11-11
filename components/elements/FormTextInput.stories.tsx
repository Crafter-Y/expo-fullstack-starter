import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { View } from "react-native";
import { FormTextInput } from "./FormTextInput";

const meta = {
  title: "elements/FormTextInput",
  component: FormTextInput,
  tags: ["autodocs"],
  argTypes: {
    label: translationKeyArgType,
    placeholder: translationKeyArgType,
  },
  decorators: [
    (Story) => (
      <View className="flex-1 items-start">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FormTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Name: Story = {
  args: {
    type: "name",
    label: "auth.name",
    placeholder: "auth.namePlaceholder",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    label: "auth.email",
    placeholder: "auth.emailPlaceholder",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "auth.password",
    placeholder: "auth.passwordPlaceholder",
  },
};

export const NewPassword: Story = {
  args: {
    type: "new-password",
    label: "auth.password",
    placeholder: "auth.passwordPlaceholder",
  },
};

export const Text: Story = {
  args: {
    type: "text",
    label: "category.name",
    placeholder: "category.namePlaceholder",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    label: "auth.email",
    placeholder: "auth.emailPlaceholder",
    editable: false,
  },
};

export const DisabledFilled: Story = {
  args: {
    type: "text",
    label: "auth.email",
    placeholder: "auth.emailPlaceholder",
    value: "disabled@example.com",
    editable: false,
  },
};

export const WithoutLabel: Story = {
  args: {
    type: "text",
    placeholder: "auth.emailPlaceholder",
  },
};
