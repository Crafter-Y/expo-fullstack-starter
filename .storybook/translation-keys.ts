import type { TranslationKey } from "../lib/i18n";
import en from "../locales/en/translation.json";

/**
 * Recursively extracts all translation keys from the translation object
 */
function extractKeys(
  obj: Record<string, unknown>,
  prefix = ""
): TranslationKey[] {
  const keys: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      keys.push(...extractKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys as TranslationKey[];
}

/**
 * All available translation keys from the English translation file
 */
export const allTranslationKeys = extractKeys(en);

/**
 * Storybook argType for TranslationKey with select control
 */
export const translationKeyArgType = {
  control: { type: "select" as const },
  options: allTranslationKeys,
  description: "Translation key from i18n",
  table: {
    type: { summary: "TranslationKey" },
  },
};
