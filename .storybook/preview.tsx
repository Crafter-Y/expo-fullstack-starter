/// <reference types="nativewind/types" />

import "@/lib/i18n";
import "../global.css";

import type { Decorator, Preview } from "@storybook/react-native-web-vite";
import { changeLanguage } from "i18next";
import { colorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import { translationKeyArgType } from "./translation-keys";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  argTypes: {
    t: translationKeyArgType,
  },
};

export const decorators: Decorator[] = [
  (Story, context) => {
    const { locale } = context.globals;
    const isInDocs = context.viewMode === "docs";

    // Get theme from addon-themes global
    const theme = context.globals.theme || "light";

    useEffect(() => {
      changeLanguage(locale);
    }, [locale]);

    useEffect(() => {
      colorScheme.set(theme);
    }, [theme]);

    return (
      <View className={`flex-1 ${isInDocs ? "items-center" : ""}`}>
        <Story />
      </View>
    );
  },
];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "de", title: "Deutsch" },
        { value: "en", title: "English" },
      ],
      showName: true,
    },
  },
};

export default preview;
