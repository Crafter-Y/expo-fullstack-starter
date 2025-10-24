import { Stack } from "expo-router";
import { TRPCProvider } from "@/components/TRPCProvider";

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
