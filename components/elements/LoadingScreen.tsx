import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";

export function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-gray-500 dark:text-gray-400">
        {t("common.loading")}
      </Text>
      <ActivityIndicator className="mt-2" />
    </View>
  );
}
