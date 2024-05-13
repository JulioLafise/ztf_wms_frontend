import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { manifestForPluginPWA } from './vite-pwa.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA(manifestForPluginPWA)
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
      { find: '@wms/config', replacement: path.resolve(__dirname, 'src/config/index.ts') },
      { find: '@wms/apis', replacement: path.resolve(__dirname, 'src/data/apis/index.ts') },
      { find: '@wms/static', replacement: path.resolve(__dirname, 'src/data/static/index.ts') },
      { find: '@wms/redux/store', replacement: path.resolve(__dirname, 'src/data/redux/store/store.ts') },
      { find: '@wms/redux/selector', replacement: path.resolve(__dirname, 'src/data/redux/selector/selector.ts') },
      { find: '@wms/redux/reducer', replacement: path.resolve(__dirname, 'src/data/redux/reducer/reducer.ts') },
      { find: '@wms/redux/actions', replacement: path.resolve(__dirname, 'src/data/redux/actions/index.ts') },
      { find: '@wms/interfaces', replacement: path.resolve(__dirname, 'src/interfaces/index.ts') },
      { find: '@wms/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@wms/components', replacement: path.resolve(__dirname, 'src/components/index.ts') },
      { find: '@wms/helpers', replacement: path.resolve(__dirname, 'src/helpers/index.ts') },
      { find: '@wms/hooks', replacement: path.resolve(__dirname, 'src/hooks/index.ts') },
      { find: '@wms/pages', replacement: path.resolve(__dirname, 'src/pages/index.ts') },
      { find: '@wms/routes', replacement: path.resolve(__dirname, 'src/routes/router.tsx') },
      { find: '@wms/styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@wms/templates', replacement: path.resolve(__dirname, 'src/templates/index.ts') },
      { find: '@wms/utils', replacement: path.resolve(__dirname, 'src/utils/index.ts') },
    ]
  },
  build: {
    chunkSizeWarningLimit: 7168
  },
  server: {
    cors: false,
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    headers: {
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'Cross-Origin-Opener-Policy': ['same-origin', 'same-origin-allow-popups']
    }
  }
})
