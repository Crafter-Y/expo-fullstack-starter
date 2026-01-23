import { AuthWrapper } from "@/components/AuthWrapper";
import { RegisterScreen } from "@/components/auth/RegisterScreen";
import { useRegister } from "@/lib/hooks/useRegister";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const { error, loading, handleRegister } = useRegister();

  return (
    <AuthWrapper>
      <RegisterScreen
        error={error}
        loading={loading}
        onRegister={handleRegister}
        login={() => router.push("/login")}
      />
    </AuthWrapper>
  );
}
