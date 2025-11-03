import { usePreferencesStore } from "../stores/preferences";

/**
 * Custom hook for theme management
 * Use this hook in components that need to change the theme
 *
 * How it works:
 * 1. Zustand loads persisted theme from AsyncStorage automatically
 * 2. The store's setTheme() updates both Zustand (persisted) and NativeWind (runtime)
 * 3. No manual syncing needed!
 */
export function useTheme() {
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme); // This updates both store and NativeWind
  };

  const cycleTheme = () => {
    const themeOrder: ("light" | "dark" | "system")[] = [
      "light",
      "dark",
      "system",
    ];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    changeTheme(themeOrder[nextIndex]);
  };

  return {
    theme,
    changeTheme,
    cycleTheme,
  };
}
