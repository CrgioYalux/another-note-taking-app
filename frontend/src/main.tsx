import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProvidersWrapper } from './components/ProvidersWrapper';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </React.StrictMode>
);
