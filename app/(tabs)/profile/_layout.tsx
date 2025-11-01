import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLargeTitle: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
        }}
      />
    </Stack>
  );
}
