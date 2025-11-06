import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      // Ensure Vite looks for the main entry point correctly
      build: {
        outDir: 'dist',
      },
    });
    