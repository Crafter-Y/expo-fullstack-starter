import { TranslationKey } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonType = "primary" | "ghost" | "destructive";
type ButtonSize = "small" | "regular";

interface BaseButtonProps extends PressableProps {
  t: TranslationKey;
  textClassName?: string;
}

interface ButtonProps extends BaseButtonProps {
  type: ButtonType;
  size?: ButtonSize;
}

const BaseButton = ({
  t,
  className,
  textClassName = "",
  ...props
}: BaseButtonProps) => {
  const { t: i18n } = useTranslation();

  return (
    <Pressable
      className={`rounded-lg ${className}`}
      {...props}
      role={props.role ?? "button"}
    >
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
  size = "regular",
  ...props
}: ButtonProps) {
  let sizeClassName;
  switch (size) {
    case "small":
      sizeClassName = "py-1 px-2";
      break;
    case "regular":
      sizeClassName = "p-4";
      break;
  }

  switch (type) {
    case "primary":
      return (
        <BaseButton
          textClassName={`text-white ${textClassName}`}
          className={`${disabled ? "bg-blue-400" : "bg-blue-600 active:bg-blue-700"} ${sizeClassName} ${className}`}
          disabled={disabled}
          {...props}
        />
      );
    case "ghost":
      return (
        <BaseButton
          textClassName={`text-gray-700 dark:text-gray-300 ${textClassName}`}
          className={`border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${disabled ? "opacity-50" : "active:bg-gray-50 dark:active:bg-gray-700"} ${sizeClassName} ${className}`}
          {...props}
        />
      );
    case "destructive":
      return (
        <BaseButton
          textClassName={`text-white ${textClassName}`}
          className={`${disabled ? "bg-red-300" : "bg-red-600 active:bg-red-700"} ${sizeClassName} ${className}`}
          disabled={disabled}
          {...props}
        />
      );
  }
}
