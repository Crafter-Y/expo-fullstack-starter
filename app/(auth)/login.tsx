import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
      } else {
        // Navigate to main app
        router.replace("/(tabs)" as any);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardVisible}
      >
        <Text className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </Text>

        {error ? (
          <View className="mb-4 rounded-lg bg-red-100 p-3">
            <Text className="text-center text-sm text-red-700">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="your@email.com"
            placeholderTextColor="#9CA3AF"
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            inputMode="email"
            autoComplete="email"
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            submitBehavior="submit"
          />
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </Text>
          <TextInput
            ref={passwordRef}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            inputMode="text"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="password"
            keyboardType="visible-password"
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
        </View>

        <Pressable
          className={`mb-4 rounded-lg py-3 ${loading ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-center text-base font-semibold text-white">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/register" as any)}>
            <Text className="font-semibold text-blue-600 dark:text-blue-400">
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
