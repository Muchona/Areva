
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("Areva Loader: Looking for root element...");

const rootElement = document.getElementById('root');

if (rootElement) {
  console.log("Areva Loader: Root found. Mounting React...");
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const errorMsg = "Critical Fault: Root element 'root' not found.";
  console.error(errorMsg);
  document.body.innerHTML = `<div style="color:white; background:red; padding:20px;">${errorMsg}</div>`;
}
