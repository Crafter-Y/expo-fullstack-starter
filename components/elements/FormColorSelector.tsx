import { TranslationKey } from "@/lib/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface FormColorSelectorProps {
  label: TranslationKey;
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  disabled?: boolean;
  containerClassName?: string;
}

export function FormColorSelector({
  label,
  colors,
  selectedColor,
  onSelectColor,
  disabled = false,
  containerClassName,
}: FormColorSelectorProps) {
  const { t } = useTranslation();

  return (
    <View className={containerClassName}>
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {t(label)}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {colors.map((color) => (
          <Pressable
            key={color}
            onPress={() => onSelectColor(color)}
            className={`h-12 w-12 items-center justify-center rounded-lg border ${
              selectedColor === color
                ? "border-gray-900 dark:border-white"
                : "border-gray-300 dark:border-gray-600"
            }`}
            style={{ backgroundColor: color }}
            disabled={disabled}
            role="radio"
            aria-label={color}
            aria-checked={selectedColor === color}
          >
            {selectedColor === color ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
