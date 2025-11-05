import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button } from "../elements/Button";
import { ErrorMessage } from "../elements/ErrorMessage";
import { FormTextInput } from "../elements/FormTextInput";

interface RegisterScreenProps {
  error: ErrorState;
  loading: boolean;
  onRegister: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  login: () => void;
}

export function RegisterScreen({
  error,
  loading,
  onRegister,
  login,
}: RegisterScreenProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    onRegister(name, email, password, confirmPassword);
  };

  return (
    <>
      <Text className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {t("auth.createAccount")}
      </Text>

      <ErrorMessage error={error} />

      <FormTextInput
        type="name"
        onChangeText={setName}
        editable={!loading}
        onSubmitEditing={() => emailRef.current?.focus()}
        submitBehavior="submit"
        returnKeyType="next"
        placeholder="auth.namePlaceholder"
        label="auth.name"
        containerClassName="mb-4"
      />

      <FormTextInput
        ref={emailRef}
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
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        submitBehavior="submit"
        returnKeyType="next"
        placeholder="auth.passwordPlaceholder"
        label="auth.password"
        containerClassName="mb-4"
      />

      <FormTextInput
        ref={confirmPasswordRef}
        type="password"
        onChangeText={setConfirmPassword}
        editable={!loading}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        placeholder="auth.passwordPlaceholder"
        label="auth.confirmPassword"
        containerClassName="mb-4"
      />

      <Button
        className="mb-4"
        type="primary"
        onPress={handleSubmit}
        disabled={loading}
        t={loading ? "auth.creatingAccount" : "auth.signUp"}
      />

      <View className="flex-row justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          {t("auth.alreadyHaveAccount")}{" "}
        </Text>
        <Pressable onPress={login}>
          <Text
            className="font-semibold text-blue-600 dark:text-blue-400"
            selectable={false}
          >
            {t("auth.signIn")}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
