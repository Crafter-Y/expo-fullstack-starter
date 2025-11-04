import { TranslationKey } from "@/lib/i18n";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface BaseTextInputProps extends TextInputProps {
  placeholder: TranslationKey;
}

interface FormTextInputProps extends TextInputProps {
  type: "name" | "email" | "password";
  placeholder: TranslationKey;
  label: TranslationKey;
}

const BaseTextInput = forwardRef<TextInput, BaseTextInputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <TextInput
        className={`rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${className}`}
        placeholderTextColor="#9CA3AF"
        placeholder={t(placeholder)}
        ref={ref}
        {...props}
      />
    );
  }
);

BaseTextInput.displayName = "BaseTextInput";

export const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  ({ type, label, ...props }, ref) => {
    const { t } = useTranslation();

    const getTypeSpecificProps = () => {
      switch (type) {
        case "name":
          return {
            inputMode: "text" as const,
            autoComplete: "name" as const,
            returnKeyType: "next" as const,
            submitBehavior: "submit" as const,
          };
        case "email":
          return {
            inputMode: "email" as const,
            autoCapitalize: "none" as const,
            keyboardType: "email-address" as const,
            autoComplete: "email" as const,
          };
        case "password":
          return {
            inputMode: "text" as const,
            autoCorrect: false,
            autoCapitalize: "none" as const,
            autoComplete: "password" as const,
            keyboardType: "visible-password" as const,
            secureTextEntry: true,
          };
      }
    };

    return (
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t(label)}
        </Text>
        <BaseTextInput ref={ref} {...props} {...getTypeSpecificProps()} />
      </View>
    );
  }
);

FormTextInput.displayName = "FormTextInput";
