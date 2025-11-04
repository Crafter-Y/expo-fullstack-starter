/**
 * Global type definitions for the application
 */

/**
 * Represents an error state in the application.
 * null means no error, string contains the error message.
 */
declare type ErrorState = string | null;

/**
 * Used to extract keys to build a proper type for i18n translation keys.
 *
 * See: https://github.com/i18next/i18next/discussions/2329
 **/
declare type Paths<T> = {
  [K in Extract<keyof T, string>]: T[K] extends Record<string, unknown>
    ? `${K}.${Paths<T[K]>}`
    : K;
}[Extract<keyof T, string>];
