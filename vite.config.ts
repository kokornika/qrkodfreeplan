import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'stream', 'util']
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          qr: ['qrcode', 'qrcode.react'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['qrcode', 'qrcode.react'],
    exclude: ['@netlify/functions']
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env.VITE_EMAIL_SERVICE_ID': JSON.stringify(process.env.VITE_EMAIL_SERVICE_ID || ''),
    'process.env.VITE_EMAIL_TEMPLATE_ID': JSON.stringify(process.env.VITE_EMAIL_TEMPLATE_ID || ''),
    'process.env.VITE_EMAIL_USER_ID': JSON.stringify(process.env.VITE_EMAIL_USER_ID || ''),
    'process.env.VITE_GITHUB_TOKEN': JSON.stringify(process.env.VITE_GITHUB_TOKEN || ''),
    'process.env.VITE_GITHUB_OWNER': JSON.stringify(process.env.VITE_GITHUB_OWNER || '')
  }
});