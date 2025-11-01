import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { Text, useColorScheme, useWindowDimensions, View } from "react-native";

export default function TabsLayout() {
  const dimensions = useWindowDimensions();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      // User is not authenticated, redirect to login
      router.replace("/login" as any);
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  const isLargeScreen = dimensions.width >= 768;
  const isDark = colorScheme === "dark";

  return (
    <Drawer
      screenOptions={{
        drawerType: isLargeScreen ? "permanent" : "front",
        headerShown: true,
        swipeEnabled: !isLargeScreen,
        overlayColor: isLargeScreen ? "transparent" : "rgba(0, 0, 0, 0.5)",
        headerLeft: isLargeScreen ? () => null : undefined,
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#374151" : "#e5e7eb",
        },
        headerTintColor: isDark ? "#ffffff" : "#111827",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderRightWidth: 1,
          borderRightColor: isDark ? "#374151" : "#e5e7eb",
        },
        drawerActiveTintColor: isDark ? "#60a5fa" : "#2563eb",
        drawerInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
        },
      }}
    >
      <Drawer.Screen
        name="(todos)"
        options={{
          drawerLabel: "Todos",
          title: "Todos",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
