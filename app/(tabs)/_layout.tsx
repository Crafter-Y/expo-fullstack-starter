import { authClient } from "@/lib/auth-client";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, useWindowDimensions, View } from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center">
        <Image
          source={require("@/assets/images/icon.png")}
          // style={{ width: 100, height: 100, marginBottom: 20 }}
          className="mb-12"
          style={{ width: 100, height: 100 }}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function TabsLayout() {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      // User is not authenticated, redirect to login
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">
          {t("common.loading")}
        </Text>
      </View>
    );
  }

  const isLargeScreen = dimensions.width >= 768;
  const isDark = colorScheme === "dark";

  return (
    <Drawer
      drawerContent={CustomDrawer}
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
          drawerLabel: t("navigation.todos"),
          title: t("navigation.todos"),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: t("navigation.profile"),
          title: t("navigation.profile"),
        }}
      />
    </Drawer>
  );
}
