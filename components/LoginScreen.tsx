import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import { ErrorMessage } from "./elements/ErrorMessage";

interface LoginScreenProps {
  error: ErrorState;
  loading: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
}

export function LoginScreen({ error, loading, onLogin }: LoginScreenProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    onLogin(email, password);
  };

  return (
    <>
      <Text className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {t("auth.welcomeBack")}
      </Text>

      <ErrorMessage error={error} />

      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.email")}
        </Text>
        <TextInput
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.emailPlaceholder")}
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          inputMode="email"
          autoComplete="email"
          editable={!loading}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          submitBehavior="submit"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.password")}
        </Text>
        <TextInput
          ref={passwordRef}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.passwordPlaceholder")}
          placeholderTextColor="#9CA3AF"
          value={password}
          inputMode="text"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password"
          keyboardType="visible-password"
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <Pressable
        className={`mb-4 rounded-lg py-3 ${loading ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"}`}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className="text-center text-base font-semibold text-white">
          {loading ? t("auth.signingIn") : t("auth.signIn")}
        </Text>
      </Pressable>

      <View className="flex-row justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          {t("auth.dontHaveAccount")}{" "}
        </Text>
        <Pressable onPress={() => router.push("/register")}>
          <Text className="font-semibold text-blue-600 dark:text-blue-400">
            {t("auth.signUp")}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
