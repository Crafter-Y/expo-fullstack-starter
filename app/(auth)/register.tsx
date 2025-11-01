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

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

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

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed");
      } else {
        // Navigate to main app
        router.replace("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Registration error:", err);
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
          Create Account
        </Text>

        {error ? (
          <View className="mb-4 rounded-lg bg-red-100 p-3">
            <Text className="text-center text-sm text-red-700">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="John Doe"
            placeholderTextColor="#9CA3AF"
            inputMode="text"
            autoComplete="name"
            onChangeText={setName}
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            submitBehavior="submit"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </Text>
          <TextInput
            ref={emailRef}
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

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </Text>
          <TextInput
            ref={passwordRef}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            onChangeText={setPassword}
            secureTextEntry
            inputMode="text"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="password"
            keyboardType="visible-password"
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            submitBehavior="submit"
          />
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </Text>
          <TextInput
            ref={confirmPasswordRef}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            inputMode="text"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="password"
            keyboardType="visible-password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />
        </View>

        <Pressable
          className={`mb-4 rounded-lg py-3 ${loading ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"}`}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-center text-base font-semibold text-white">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="font-semibold text-blue-600 dark:text-blue-400">
              Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
