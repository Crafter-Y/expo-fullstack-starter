import { Button } from "@/components/elements/Button";
import { Divider } from "@/components/elements/Divider";
import { RouterOutput } from "@/lib/routers/_app";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ErrorMessage } from "../elements/ErrorMessage";
import { FormTextInput } from "../elements/FormTextInput";
import { FormColorSelector } from "./FormColorSelector";
import { FormIconSelector } from "./FormIconSelector";

export const PRESET_COLORS = [
  "#EF4444", // red
  "#F59E0B", // amber
  "#10B981", // emerald
  "#3B82F6", // blue
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#6B7280", // gray
];

export const PRESET_ICONS = ["📋", "🏠", "💼", "🎯", "🛒", "💪", "📚", "🎨"];

interface CategoryFormModalProps {
  category?: RouterOutput["category"]["getAll"][number];
  visible: boolean;
  error: ErrorState;
  isPending: boolean;
  onSubmit: (name: string, color: string, icon: string) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function CategoryFormModal({
  category,
  visible,
  error,
  isPending,
  onSubmit,
  onDelete,
  onCancel,
}: CategoryFormModalProps) {
  const [name, setName] = useState(category?.name || "");
  const [color, setColor] = useState(category?.color || PRESET_COLORS[0]);
  const [icon, setIcon] = useState(category?.icon || PRESET_ICONS[0]);

  const handleSubmit = () => {
    onSubmit(name, color, icon);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (visible && category) {
      setName(category.name);
      setColor(category.color || PRESET_COLORS[0]);
      setIcon(category.icon || PRESET_ICONS[0]);
    } else if (visible && !category) {
      setName("");
      setColor(PRESET_COLORS[0]);
      setIcon(PRESET_ICONS[0]);
    }
  }, [visible, category]);

  return (
    <>
      <ErrorMessage error={error} />

      <FormTextInput
        type="text"
        label="category.name"
        placeholder="category.namePlaceholder"
        testID="category-name-input"
        value={name}
        onChangeText={setName}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        editable={!isPending}
        maxLength={100}
        containerClassName="mb-1"
      />
      <Text className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        {name.length}/100
      </Text>

      <FormIconSelector
        label="category.icon"
        icons={PRESET_ICONS}
        selectedIcon={icon}
        onSelectIcon={setIcon}
        disabled={isPending}
        containerClassName="mb-4"
      />

      <FormColorSelector
        label="category.color"
        colors={PRESET_COLORS}
        selectedColor={color}
        onSelectColor={setColor}
        disabled={isPending}
        containerClassName="mb-6"
      />

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        <Button
          type="ghost"
          t="todos.cancel"
          testID="category-cancel-button"
          disabled={isPending}
          onPress={onCancel}
          className="flex-1"
        />

        <Button
          type="primary"
          t={
            isPending
              ? category
                ? "category.updating"
                : "category.creating"
              : category
                ? "todos.update"
                : "todos.create"
          }
          testID="category-submit-button"
          disabled={isPending}
          onPress={handleSubmit}
          className="flex-1"
        />
      </View>

      {/* Delete Button */}
      {category && onDelete && (
        <>
          <Divider className="my-4" />
          <Button
            type="destructive"
            t="todos.delete"
            testID="category-delete-button"
            disabled={isPending}
            onPress={onDelete}
          />
        </>
      )}
    </>
  );
}
