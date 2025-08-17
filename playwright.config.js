// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright', // carpeta donde están los tests
  use: {
    headless: false, // ver navegador
  },
});
