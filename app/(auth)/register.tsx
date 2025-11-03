import { AuthWrapper } from "@/components/AuthWrapper";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError(t("errors.fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("errors.passwordsDontMatch"));
      return;
    }

    if (password.length < 8) {
      setError(t("errors.passwordTooShort"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || t("errors.registrationFailed"));
      } else {
        // Navigate to main app
        router.replace("/");
      }
    } catch (err) {
      setError(t("errors.unexpectedError"));
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Text className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {t("auth.createAccount")}
      </Text>

      <ErrorMessage error={error} />

      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.name")}
        </Text>
        <TextInput
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.namePlaceholder")}
          placeholderTextColor="#9CA3AF"
          inputMode="text"
          autoComplete="name"
          onChangeText={setName}
          editable={!loading}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          submitBehavior="submit"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.email")}
        </Text>
        <TextInput
          ref={emailRef}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.emailPlaceholder")}
          placeholderTextColor="#9CA3AF"
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

      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.password")}
        </Text>
        <TextInput
          ref={passwordRef}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.passwordPlaceholder")}
          placeholderTextColor="#9CA3AF"
          onChangeText={setPassword}
          secureTextEntry
          inputMode="text"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password"
          keyboardType="visible-password"
          editable={!loading}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          submitBehavior="submit"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("auth.confirmPassword")}
        </Text>
        <TextInput
          ref={confirmPasswordRef}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("auth.passwordPlaceholder")}
          placeholderTextColor="#9CA3AF"
          inputMode="text"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password"
          keyboardType="visible-password"
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />
      </View>

      <Pressable
        className={`mb-4 rounded-lg py-3 ${loading ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"}`}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-center text-base font-semibold text-white">
          {loading ? t("auth.creatingAccount") : t("auth.signUp")}
        </Text>
      </Pressable>

      <View className="flex-row justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          {t("auth.alreadyHaveAccount")}{" "}
        </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text
            className="font-semibold text-blue-600 dark:text-blue-400"
            selectable={false}
          >
            {t("auth.signIn")}
          </Text>
        </Pressable>
      </View>
    </AuthWrapper>
  );
}
