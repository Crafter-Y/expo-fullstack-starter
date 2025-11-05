import { AuthWrapper } from "@/components/AuthWrapper";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError(t("errors.fillAllFields"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || t("errors.loginFailed"));
      } else {
        // Navigate to main app
        router.replace("/");
      }
    } catch (err) {
      setError(t("errors.unexpectedError"));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <LoginScreen
        error={error}
        loading={loading}
        onLogin={handleLogin}
        register={() => router.push("/register")}
      />
    </AuthWrapper>
  );
}
