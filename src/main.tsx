import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build ships prerendered HTML (scripts/build.mjs); attach to it instead of re-rendering.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
