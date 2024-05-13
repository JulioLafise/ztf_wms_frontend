import { VitePWAOptions } from 'vite-plugin-pwa';

export const manifestForPluginPWA: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  // mode: 'development', // In production comment line
  srcDir: 'src',
  filename: 'sw-vite.ts',
  strategies: 'injectManifest',
  injectRegister: 'script',
  injectManifest: {
    injectionPoint: 'self.__WB_MANIFEST',
    maximumFileSizeToCacheInBytes: 5242880,
    globPatterns: ['**/*.{js,css,html,woff,woff2,ico,png,jpg,svg}'],        
    swSrc: 'src/sw-vite.ts',
    swDest: 'dist/sw-vite.js',
  },
  includeAssets: ['**/*.{js,css,html,woff,woff2,ico,png,jpg,svg}'],
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  manifest: {
    name: 'ZTF - Warehouse Management System',
    short_name: 'ZTF - WMS',
    description: 'Sistema para el control de inventario',
    theme_color: '#2f6c57',
    background_color: '#2f6c57',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    // start_url: './auth/login',
    lang: 'es-MX',
    icons: [],
  },
};