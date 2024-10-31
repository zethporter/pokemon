// app/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/start';
import { createRouter } from './router';
import './styles/main.css';

const router = createRouter();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

hydrateRoot(root, <StartClient router={router} />);
