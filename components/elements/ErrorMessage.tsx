import { Text, View } from "react-native";

interface ErrorMessageProps {
  error: ErrorState;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <View className="mb-4 rounded-lg bg-red-100 p-3">
      <Text className="text-center text-sm text-red-700">{error}</Text>
    </View>
  );
}
