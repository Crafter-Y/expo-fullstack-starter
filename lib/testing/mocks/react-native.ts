export const Platform = { OS: "web" as const };

export const NativeModules: Record<string, unknown> = {};

export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T) => styles,
};

export default {
  Platform,
  NativeModules,
  StyleSheet,
};
