import { Stack } from "expo-router";

export default function TodosLayout() {
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
          title: "Todos",
        }}
      />
    </Stack>
  );
}
