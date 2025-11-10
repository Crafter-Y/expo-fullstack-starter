import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { PRESET_COLORS } from "@/components/todos/CategoryFormModal";
import { View } from "react-native";
import { FormColorSelector } from "./FormColorSelector";

const meta = {
  title: "elements/FormColorSelector",
  component: FormColorSelector,
  tags: ["autodocs"],
  args: {
    onSelectColor: fn(),
  },
  argTypes: {
    label: translationKeyArgType,
  },
  render: (args) => {
    const [selectedColor, setSelectedColor] = useState(args.selectedColor);

    return (
      <FormColorSelector
        {...args}
        selectedColor={selectedColor}
        onSelectColor={(color) => {
          setSelectedColor(color);
          args.onSelectColor(color);
        }}
      />
    );
  },
} satisfies Meta<typeof FormColorSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[0],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const colorButtons = canvas.getAllByRole("radio");

    await userEvent.click(colorButtons[1]);

    await expect(args.onSelectColor).toHaveBeenCalledTimes(1);
    await expect(args.onSelectColor).toHaveBeenCalledWith(PRESET_COLORS[1]);
  },
};

export const Disabled: Story = {
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[1],
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const colorButtons = canvas.getAllByRole("radio");

    await expect(async () => {
      await userEvent.click(colorButtons[2]);
    }).rejects.toThrow("pointer-events: none");

    await expect(args.onSelectColor).not.toHaveBeenCalled();
  },
};

export const InSmallWindow: Story = {
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[1],
  },
  decorators: [
    (Story) => (
      <View className="max-w-xs">
        <Story />
      </View>
    ),
  ],
};
