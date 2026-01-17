import { usePreferencesStore } from "../stores/preferences";

export function useTheme() {
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
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
