import { TranslationKey } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface FormIconSelectorProps {
  label: TranslationKey;
  icons: string[];
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  disabled?: boolean;
  containerClassName?: string;
}

export function FormIconSelector({
  label,
  icons,
  selectedIcon,
  onSelectIcon,
  disabled = false,
  containerClassName,
}: FormIconSelectorProps) {
  const { t } = useTranslation();

  return (
    <View className={containerClassName}>
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {t(label)}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {icons.map((icon) => (
          <Pressable
            key={icon}
            onPress={() => onSelectIcon(icon)}
            className={`h-12 w-12 items-center justify-center rounded-lg border ${
              selectedIcon === icon
                ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/30"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
            }`}
            disabled={disabled}
            role="radio"
            aria-label={icon}
            aria-checked={selectedIcon === icon}
          >
            <Text className="text-xl">{icon}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
