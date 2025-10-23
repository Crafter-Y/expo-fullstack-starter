import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 justify-center px-6">
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
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
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
      </View>
    </View>
  );
}
