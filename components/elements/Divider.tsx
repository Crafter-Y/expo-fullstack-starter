import { View } from "react-native";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <View
      className={`border-t border-gray-200 dark:border-gray-700 ${className || ""}`}
    />
  );
}
