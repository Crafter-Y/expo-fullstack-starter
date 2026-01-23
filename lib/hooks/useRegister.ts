import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useRegister() {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
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
        router.replace("/");
      }
    } catch (err) {
      setError(t("errors.unexpectedError"));
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleRegister,
  };
}
