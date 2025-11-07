import { RouterOutput } from "@/lib/routers/_app";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";

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

interface CreateCategoryModalProps {
  category?: RouterOutput["category"]["getAll"][number];
  visible: boolean;
  error: string;
  isPending: boolean;
  onSubmit: (name: string, color: string, icon: string) => void;
  onCancel: () => void;
}

export function CreateCategoryModal({
  category,
  visible,
  error,
  isPending,
  onSubmit,
  onCancel,
}: CreateCategoryModalProps) {
  const { t } = useTranslation();
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
      {error ? (
        <View className="mb-4 rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
          <Text className="text-sm text-red-700 dark:text-red-400">
            {error}
          </Text>
        </View>
      ) : null}

      {/* Name Input */}
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("category.name")} *
        </Text>
        <TextInput
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          placeholder={t("category.namePlaceholder")}
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          editable={!isPending}
          maxLength={100}
        />
        <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {name.length}/100
        </Text>
      </View>

      {/* Icon Selection */}
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("category.icon")}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {PRESET_ICONS.map((presetIcon) => (
            <Pressable
              key={presetIcon}
              onPress={() => setIcon(presetIcon)}
              className={`h-12 w-12 items-center justify-center rounded-lg border ${
                icon === presetIcon
                  ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
              }`}
              disabled={isPending}
            >
              <Text className="text-xl">{presetIcon}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Color Selection */}
      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("category.color")}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {PRESET_COLORS.map((presetColor) => (
            <Pressable
              key={presetColor}
              onPress={() => setColor(presetColor)}
              className={`h-12 w-12 items-center justify-center rounded-lg border ${
                color === presetColor
                  ? "border-gray-900 dark:border-white"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ backgroundColor: presetColor }}
              disabled={isPending}
            >
              {color === presetColor ? (
                <Text className="text-xl text-white">✓</Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mb-4 flex-row gap-3">
        <Pressable
          onPress={onCancel}
          className="flex-1 rounded-lg border border-gray-300 py-3 active:bg-gray-50 dark:border-gray-600 dark:active:bg-gray-700"
          disabled={isPending}
        >
          <Text className="text-center text-base font-semibold text-gray-700 dark:text-gray-300">
            {t("todos.cancel")}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSubmit}
          className={`flex-1 rounded-lg py-3 ${
            isPending ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"
          }`}
          disabled={isPending}
        >
          <Text className="text-center text-base font-semibold text-white">
            {isPending
              ? category
                ? t("category.updating")
                : t("category.creating")
              : category
                ? t("todos.update")
                : t("todos.create")}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
