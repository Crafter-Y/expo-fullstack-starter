import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import { ErrorMessage } from "./elements/ErrorMessage";
import { FormTextInput } from "./elements/FormTextInput";

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

      <FormTextInput
        type="email"
        onChangeText={setEmail}
        editable={!loading}
        onSubmitEditing={() => passwordRef.current?.focus()}
        submitBehavior="submit"
        returnKeyType="next"
        placeholder="auth.emailPlaceholder"
        label="auth.email"
      />

      <FormTextInput
        ref={passwordRef}
        type="password"
        onChangeText={setPassword}
        editable={!loading}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        placeholder="auth.passwordPlaceholder"
        label="auth.password"
      />

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
