import { Stack } from "expo-router";
import { Platform, useColorScheme } from "react-native";

export default function TodosLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack
      screenOptions={{
        headerShown: Platform.OS !== "web",
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
        },
        headerTintColor: isDark ? "#ffffff" : "#111827",
        headerLargeTitleStyle: {
          fontWeight: "700",
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Todos",
        }}
      />
    </Stack>
  );
}
