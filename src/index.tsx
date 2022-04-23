import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error("The element #root wasn't found");
}
const root = createRoot(container);
root.render(<App />);
