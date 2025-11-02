import { TRPCProvider } from "@/components/TRPCProvider";
import { Stack } from "expo-router";

import "@/lib/i18n"; // Initialize i18n
import "../global.css";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TRPCProvider>
  );
}
