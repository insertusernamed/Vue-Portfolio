/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string
  readonly VITE_SCREENSHOT_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
