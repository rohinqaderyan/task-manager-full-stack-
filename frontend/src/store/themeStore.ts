import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => {
        const newMode = !state.isDarkMode;
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
        return { isDarkMode: newMode };
      }),
      setTheme: (isDark: boolean) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
