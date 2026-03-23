import { AuthWrapper } from "@/components/AuthWrapper";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { useLogin } from "@/lib/hooks/useLogin";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const { error, loading, handleLogin } = useLogin();

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
