import { Button } from "@/components/elements/Button";
import { ProfileInfoField } from "@/components/profile/ProfileInfoField";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface ProfileScreenProps {
  userName?: string;
  userEmail?: string;
  themeLabel: string;
  languageLabel: string;
  loggingOut: boolean;
  onCycleTheme: () => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function ProfileScreen({
  userName,
  userEmail,
  themeLabel,
  languageLabel,
  loggingOut,
  onCycleTheme,
  onToggleLanguage,
  onLogout,
}: ProfileScreenProps) {
  const { t } = useTranslation();

  return (
    <>
      <ProfileInfoField
        label="profile.name"
        value={userName || t("profile.notSet")}
      />

      <ProfileInfoField
        label="profile.email"
        value={userEmail || t("profile.notSet")}
      />

      <Text className="mb-3 mt-6 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
        {t("profile.settings")}
      </Text>

      <ProfileInfoField
        label="profile.theme"
        value={themeLabel}
        onPress={onCycleTheme}
      />

      <ProfileInfoField
        label="profile.language"
        value={languageLabel}
        onPress={onToggleLanguage}
      />

      <Button
        type="ghost"
        t={loggingOut ? "profile.signingOut" : "profile.signOut"}
        onPress={onLogout}
        disabled={loggingOut}
        className="mt-6"
        textClassName="text-red-600 dark:text-red-400"
      />
    </>
  );
}
