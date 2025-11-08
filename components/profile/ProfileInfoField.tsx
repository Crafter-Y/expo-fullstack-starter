import { TranslationKey } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface ProfileInfoFieldProps {
  label: TranslationKey;
  value: string;
  onPress?: () => void;
}

export function ProfileInfoField({
  label,
  value,
  onPress,
}: ProfileInfoFieldProps) {
  const { t } = useTranslation();

  const Container = onPress ? Pressable : View;
  const containerClassName = onPress
    ? "mb-4 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700"
    : "mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800";

  return (
    <Container className={containerClassName} onPress={onPress}>
      <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        {t(label)}
      </Text>
      <Text className="text-base font-medium text-gray-900 dark:text-white">
        {value}
      </Text>
    </Container>
  );
}
