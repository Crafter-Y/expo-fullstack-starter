import { Button } from "@/components/elements/Button";
import { ErrorMessage } from "@/components/elements/ErrorMessage";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface TodoDeleteModalProps {
  visible: boolean;
  todoTitle: string;
  error: ErrorState;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TodoDeleteModal({
  visible,
  todoTitle,
  error,
  isPending,
  onConfirm,
  onCancel,
}: TodoDeleteModalProps) {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <View className="gap-4">
      <Text className="text-base text-gray-900 dark:text-white">
        {t("todos.deleteConfirmation")}
      </Text>

      <View className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Text className="font-semibold text-gray-900 dark:text-white">
          {todoTitle}
        </Text>
      </View>

      <ErrorMessage error={error} />

      <View className="flex-row gap-3">
        <Button
          type="ghost"
          t="todos.cancel"
          onPress={onCancel}
          disabled={isPending}
          className="flex-1"
        />
        <Button
          type="destructive"
          t="todos.confirmDelete"
          onPress={onConfirm}
          disabled={isPending}
          className="flex-1"
        />
      </View>
    </View>
  );
}
