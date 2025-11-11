import { Button } from "@/components/elements/Button";
import { Divider } from "@/components/elements/Divider";
import { ProfileInfoField } from "@/components/profile/ProfileInfoField";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface ProfileScreenProps {
  userName?: string;
  userEmail?: string;
  theme: string;
  language: string;
  loggingOut: boolean;
  onCycleTheme: () => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function ProfileScreen({
  userName,
  userEmail,
  theme,
  language,
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
        className="mb-4"
      />

      <ProfileInfoField
        label="profile.email"
        value={userEmail || t("profile.notSet")}
        className="mb-4"
      />

      <Text className="mb-3 mt-6 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
        {t("profile.settings")}
      </Text>

      <ProfileInfoField
        label="profile.theme"
        value={theme}
        onPress={onCycleTheme}
        className="mb-4"
      />

      <ProfileInfoField
        label="profile.language"
        value={language}
        onPress={onToggleLanguage}
      />

      <Divider className="my-4" />

      <Button
        type="ghost"
        t={loggingOut ? "profile.signingOut" : "profile.signOut"}
        onPress={onLogout}
        disabled={loggingOut}
        textClassName="text-red-600 dark:text-red-400"
        testID="profile-sign-out"
      />
    </>
  );
}
