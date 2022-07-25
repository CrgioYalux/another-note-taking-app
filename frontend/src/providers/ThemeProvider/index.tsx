import { useState, useEffect, useContext, createContext } from "react";

enum Theme {
  Dark = 'dark',
  Light = 'light'
};

interface ThemeProviderProps {
  children: React.ReactNode;
};

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  toggleTheme: () => {}
});

export const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return Theme.Dark
  else return Theme.Light
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }:ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => getSystemTheme());

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => { setTheme((current) => current === Theme.Dark ? Theme.Light : Theme.Dark); };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
