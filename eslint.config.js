const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const storybook = require("eslint-plugin-storybook");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  ...storybook.configs['flat/recommended'],
]);
