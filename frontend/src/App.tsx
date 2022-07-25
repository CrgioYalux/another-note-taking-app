import './App.css'; 
import { useState, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="App">
      <h3>Hello!</h3>
      <h4>current theme: {theme}</h4>
      <button onClick={() => toggleTheme()}>toggle theme</button>
    </div>
  );
};

export default App;
