/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string,
  readonly VITE_APP_SHORT_NAME: string,
  readonly VITE_API_URL: string,
  readonly VITE_AWS_ACCESS_KEY: string,
  readonly VITE_AWS_SECRET_ACCESS_KEY: string,
  readonly VITE_AWS_REGION: string,
  readonly VITE_MINUTES_INACTIVE: string,
  readonly VITE_APP_COPYRIGHT: string,
  readonly VITE_APP_VERSION: string,
  readonly VITE_BUSINESS_NAME: string,
  // more env variables...
}