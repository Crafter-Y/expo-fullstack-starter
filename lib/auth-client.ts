import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const baseURL =
  Constants.expoConfig?.extra?.apiUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:8081";
const scheme = Array.isArray(Constants.expoConfig?.scheme)
  ? Constants.expoConfig.scheme[0]
  : Constants.expoConfig?.scheme || "expofullstackstarter";

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme,
      storagePrefix: scheme,
      storage: SecureStore,
    }),
  ],
});
