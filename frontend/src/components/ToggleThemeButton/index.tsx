import './ToggleThemeButton.css';
import { useTheme } from '../../providers/ThemeProvider';

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return <button className="ToggleThemeButton" onClick={() => toggleTheme()}>{theme} Theme</button>
};
