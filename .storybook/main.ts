import type { StorybookConfig } from "@storybook/react-native-web-vite";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { fileURLToPath } from "url";
import type { UserConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      modulesToTranspile: ["react-native-reanimated", "nativewind"],
      pluginReactOptions: {
        babel: {
          plugins: [
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-worklets/plugin",
          ],
        },
        jsxImportSource: "nativewind",
      },
    },
  },
  async viteFinal(config) {
    const customConfig: UserConfig = {
      css: {
        postcss: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          plugins: [tailwindcss, autoprefixer] as any,
        },
      },
      resolve: {
        alias: {
          ...config.resolve?.alias,
          "@": __dirname + "/..",
        },
      },
    };

    return {
      ...config,
      ...customConfig,
      resolve: {
        ...config.resolve,
        ...customConfig.resolve,
      },
    };
  },
};
export default config;
