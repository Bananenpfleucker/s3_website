import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './assets/icon/favicon.ico';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
