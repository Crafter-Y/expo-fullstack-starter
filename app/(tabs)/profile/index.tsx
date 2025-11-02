import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <View className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Name
          </Text>
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {user?.name || "Not set"}
          </Text>
        </View>

        <View className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Email
          </Text>
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {user?.email || "Not set"}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            Settings
          </Text>

          <Pressable className="mb-2 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700">
            <Text className="text-base text-gray-900 dark:text-white">
              Theme
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              System default
            </Text>
          </Pressable>

          <Pressable className="mb-2 rounded-lg border border-gray-200 bg-white p-4 active:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:active:bg-gray-700">
            <Text className="text-base text-gray-900 dark:text-white">
              Language
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              English
            </Text>
          </Pressable>
        </View>

        <Pressable
          className={`mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${loggingOut ? "opacity-50" : "active:bg-gray-50 dark:active:bg-gray-700"}`}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          <Text className="text-center text-base text-red-600 dark:text-red-400">
            {loggingOut ? "Signing out..." : "Sign Out"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
