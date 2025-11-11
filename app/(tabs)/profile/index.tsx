import { LoadingScreen } from "@/components/elements/LoadingScreen";
import { ProfileScreen } from "@/components/profile/ProfileScreen";
import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useTheme } from "@/lib/hooks/useTheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  // Use custom hooks for language and theme management with persistence
  const { language, toggleLanguage } = useLanguage();
  const { theme, cycleTheme } = useTheme();

  const getLanguage = () => {
    return language === "en" ? "English" : "Deutsch";
  };

  const getTheme = () => {
    return theme === "light"
      ? t("profile.themeLight")
      : theme === "dark"
        ? t("profile.themeDark")
        : t("profile.themeSystem");
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
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 items-center bg-gray-50 dark:bg-gray-900">
      <View className="w-full max-w-2xl p-4">
        <ProfileScreen
          userName={user?.name}
          userEmail={user?.email}
          theme={getTheme()}
          language={getLanguage()}
          loggingOut={loggingOut}
          onCycleTheme={cycleTheme}
          onToggleLanguage={toggleLanguage}
          onLogout={handleLogout}
        />
      </View>
    </View>
  );
}
