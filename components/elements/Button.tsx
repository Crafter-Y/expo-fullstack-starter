import { TranslationKey } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonType = "primary" | "ghost" | "destructive";

interface BaseButtonProps extends PressableProps {
  t: TranslationKey;
  textClassName?: string;
}

interface ButtonProps extends BaseButtonProps {
  type: ButtonType;
}

const BaseButton = ({
  t,
  className,
  textClassName = "",
  ...props
}: BaseButtonProps) => {
  const { t: i18n } = useTranslation();

  return (
    <Pressable className={`rounded-lg ${className}`} {...props}>
      <Text
        className={`text-center text-base font-semibold ${textClassName}`}
        selectable={false}
      >
        {i18n(t)}
      </Text>
    </Pressable>
  );
};

export function Button({
  type,
  textClassName,
  className,
  disabled,
  ...props
}: ButtonProps) {
  switch (type) {
    case "primary":
      return (
        <BaseButton
          textClassName={`text-white ${textClassName}`}
          className={`p-4 ${disabled ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"} ${className}`}
          disabled={disabled}
          {...props}
        />
      );
    case "ghost":
      return (
        <BaseButton
          textClassName={`text-gray-700 dark:text-gray-300 ${textClassName}`}
          className={`border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${disabled ? "opacity-50" : "active:bg-gray-50 dark:active:bg-gray-700"} ${className}`}
          {...props}
        />
      );
    case "destructive":
      return (
        <BaseButton
          textClassName={`text-white ${textClassName}`}
          className={`p-4 ${disabled ? "bg-red-300" : "bg-red-500 active:bg-red-600"} ${className}`}
          disabled={disabled}
          {...props}
        />
      );
  }
}
