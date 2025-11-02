import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  // Use custom hook for language management with persistence
  const { language, toggleLanguage } = useLanguage();

  const getLanguageLabel = () => {
    return language === "en" ? "English" : "Deutsch";
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">
          {t("common.loading")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <View className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {t("profile.name")}
          </Text>
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {user?.name || t("profile.notSet")}
          </Text>
        </View>

        <View className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {t("profile.email")}
          </Text>
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {user?.email || t("profile.notSet")}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            {t("profile.settings")}
          </Text>

          <Pressable className="mb-2 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700">
            <Text className="text-base text-gray-900 dark:text-white">
              {t("profile.theme")}
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("profile.themeValue")}
            </Text>
          </Pressable>

          <Pressable
            className="mb-2 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700"
            onPress={toggleLanguage}
          >
            <Text className="text-base text-gray-900 dark:text-white">
              {t("profile.language")}
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {getLanguageLabel()}
            </Text>
          </Pressable>
        </View>

        <Pressable
          className={`mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${loggingOut ? "opacity-50" : "active:bg-gray-50 dark:active:bg-gray-700"}`}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          <Text className="text-center text-base text-red-600 dark:text-red-400">
            {loggingOut ? t("profile.signingOut") : t("profile.signOut")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
