import { TranslationKey } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface ModalHeaderProps {
  title: TranslationKey;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  const { t } = useTranslation();

  return (
    <View className="border-b border-gray-200 px-6 pb-4 pt-6 dark:border-gray-700">
      <View className="flex-row items-center justify-between">
        <Text className="cursor-text text-xl font-bold text-gray-900 dark:text-white">
          {t(title)}
        </Text>
        <Pressable
          onPress={onClose}
          className="rounded-full p-2 active:bg-gray-100 dark:active:bg-gray-700"
        >
          <Text className="text-xl text-gray-500 dark:text-gray-400">✕</Text>
        </Pressable>
      </View>
    </View>
  );
}
