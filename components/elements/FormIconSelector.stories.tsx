import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { translationKeyArgType } from "@/.storybook/translation-keys";
import { PRESET_ICONS } from "@/components/todos/CategoryFormModal";
import { View } from "react-native";
import { FormIconSelector } from "./FormIconSelector";

const meta = {
  title: "elements/FormIconSelector",
  component: FormIconSelector,
  tags: ["autodocs"],
  args: {
    onSelectIcon: fn(),
  },
  argTypes: {
    label: translationKeyArgType,
  },
  render: (args) => {
    const [selectedIcon, setSelectedIcon] = useState(args.selectedIcon);

    return (
      <FormIconSelector
        {...args}
        selectedIcon={selectedIcon}
        onSelectIcon={(icon) => {
          setSelectedIcon(icon);
          args.onSelectIcon(icon);
        }}
      />
    );
  },
} satisfies Meta<typeof FormIconSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[0],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const iconButtons = canvas.getAllByRole("radio");

    await userEvent.click(iconButtons[1]);

    await expect(args.onSelectIcon).toHaveBeenCalledTimes(1);
    await expect(args.onSelectIcon).toHaveBeenCalledWith(PRESET_ICONS[1]);
  },
};

export const Disabled: Story = {
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[1],
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const iconButtons = canvas.getAllByRole("radio");

    await expect(async () => {
      await userEvent.click(iconButtons[2]);
    }).rejects.toThrow("pointer-events: none");

    await expect(args.onSelectIcon).not.toHaveBeenCalled();
  },
};

export const InSmallWindow: Story = {
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[1],
  },
  decorators: [
    (Story) => (
      <View className="max-w-xs">
        <Story />
      </View>
    ),
  ],
};
