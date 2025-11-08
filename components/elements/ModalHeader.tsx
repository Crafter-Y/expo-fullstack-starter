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
    <View className="border-b border-gray-200 pb-3 pl-6 pr-4 pt-4 dark:border-gray-700">
      <View className="flex-row items-center justify-between">
        <Text className="cursor-text text-xl font-bold text-gray-900 dark:text-white">
          {t(title)}
        </Text>
        <Pressable
          onPress={onClose}
          className="h-10 w-10 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
        >
          <Text
            className="text-xl text-gray-500 dark:text-gray-400"
            selectable={false}
          >
            ✕
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
