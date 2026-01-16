import { Text, View } from "react-native";

interface ErrorMessageProps {
  error: ErrorState;
  testID?: string;
}

export function ErrorMessage({ error, testID }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <View
      className="mb-4 rounded-lg bg-red-100 p-3 dark:bg-red-900/30"
      testID={testID}
    >
      <Text className="text-center text-sm text-red-700 dark:text-red-400">
        {error}
      </Text>
    </View>
  );
}
