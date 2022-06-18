export interface IProcessEnv {
  /** Google Tag Manager */
  NEXT_PUBLIC_GTM_CONTAINER_ID: string;
  NEXT_PUBLIC_GTM_EVENTS?: string;
  NEXT_PUBLIC_DATA_LAYER_NAME?: string;
  NEXT_PUBLIC_GTM_PREVIEW?: string;
  NEXT_PUBLIC_GTM_AUTH?: string;

  /** Database */
  DB_CONNECTION_URL: string;

  /** Authentication */
  TOKEN_SECRET: string;
  PEPPER: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
