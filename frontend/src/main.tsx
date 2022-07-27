import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ExecModeProvider } from './providers/ExecModeProvider';
import { NoteDatabaseProvider } from './providers/NoteDatabaseProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExecModeProvider>
      <NoteDatabaseProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NoteDatabaseProvider>
    </ExecModeProvider>
  </React.StrictMode>
);
