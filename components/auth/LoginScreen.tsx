import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button } from "../elements/Button";
import { ErrorMessage } from "../elements/ErrorMessage";
import { FormTextInput } from "../elements/FormTextInput";

interface LoginScreenProps {
  error: ErrorState;
  loading: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  register: () => void;
}

export function LoginScreen({
  error,
  loading,
  onLogin,
  register,
}: LoginScreenProps) {
  const { t } = useTranslation();
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
        containerClassName="mb-4"
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
        containerClassName="mb-4"
      />

      <Button
        className="mb-4"
        type="primary"
        onPress={handleSubmit}
        disabled={loading}
        t={loading ? "auth.signingIn" : "auth.signIn"}
      />

      <View className="flex-row justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          {t("auth.dontHaveAccount")}{" "}
        </Text>
        <Pressable onPress={register}>
          <Text className="font-semibold text-blue-600 dark:text-blue-400">
            {t("auth.signUp")}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
