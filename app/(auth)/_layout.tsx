import { authClient } from "@/lib/auth-client";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        const isAuthenticated =
          session && "data" in session && session.data?.user;

        if (isAuthenticated) {
          // User is already authenticated, redirect to tabs
          router.replace("/(tabs)" as any);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
