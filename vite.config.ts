import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') }
    ]
  }
});
