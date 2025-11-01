import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function TabsLayout() {
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

  return (
    <NativeTabs disableTransparentOnScrollEdge>
      <NativeTabs.Trigger name="(todos)">
        <Label>Todos</Label>
        <Icon
          sf={{
            default: "checkmark.circle",
            selected: "checkmark.circle.fill",
          }}
          drawable="ic_menu_agenda"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          sf={{
            default: "person.crop.circle",
            selected: "person.crop.circle.fill",
          }}
          drawable="ic_menu_myplaces"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
