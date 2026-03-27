import type { StorybookConfig } from "@storybook/react-native-web-vite";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { fileURLToPath } from "url";
import type { UserConfig } from "vite";
import { exportsPolyfillPlugin } from "./vite-plugin-exports-polyfill.ts";

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
    "@github-ui/storybook-addon-performance-panel/preset",
  ],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      modulesToTranspile: [
        "react-native-reanimated",
        "nativewind",
        "react-native-css-interop",
      ],
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
      plugins: [exportsPolyfillPlugin()],
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
      build: {
        commonjsOptions: {
          include: [/nativewind/, /react-native-css-interop/, /node_modules/],
          transformMixedEsModules: true,
        },
        rollupOptions: {
          output: {
            format: "es",
          },
        },
      },
      optimizeDeps: {
        include: ["nativewind", "react-native-css-interop"],
        esbuildOptions: {
          // Ensure proper module format during dependency optimization
          format: "esm",
        },
      },
    };

    return {
      ...config,
      ...customConfig,
      plugins: [...(config.plugins || []), ...(customConfig.plugins || [])],
      resolve: {
        ...config.resolve,
        ...customConfig.resolve,
      },
      build: {
        ...config.build,
        ...customConfig.build,
        commonjsOptions: {
          ...config.build?.commonjsOptions,
          ...customConfig.build?.commonjsOptions,
        },
        rollupOptions: {
          ...config.build?.rollupOptions,
          ...customConfig.build?.rollupOptions,
          output: {
            ...(typeof config.build?.rollupOptions?.output === "object"
              ? config.build?.rollupOptions?.output
              : {}),
            ...(typeof customConfig.build?.rollupOptions?.output === "object"
              ? customConfig.build?.rollupOptions?.output
              : {}),
          },
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        ...customConfig.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          ...(customConfig.optimizeDeps?.include || []),
        ],
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          ...customConfig.optimizeDeps?.esbuildOptions,
        },
      },
    };
  },
};
export default config;
