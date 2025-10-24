import { authClient } from "@/lib/auth-client";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      // User is already authenticated, redirect to tabs
      router.replace("/(tabs)" as any);
    }
  }, [session, isPending, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
