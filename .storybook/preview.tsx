/// <reference types="nativewind/types" />

import "@/lib/i18n";
import "../global.css";

import type { Decorator, Preview } from "@storybook/react-native-web-vite";
import { changeLanguage } from "i18next";
import { colorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";

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
      <View
        className={`flex-1 ${isInDocs ? "-mx-[30px] -my-10 items-center px-7 py-10 dark:bg-gray-900" : "-m-4 h-screen p-4 dark:bg-gray-900"}`}
      >
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
  theme: {
    name: "Theme",
    description: "Color scheme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export default preview;
