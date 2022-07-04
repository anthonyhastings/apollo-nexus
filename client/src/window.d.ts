interface AppConfig {
  apolloServerURL: string;
}

declare global {
  interface Window {
    appConfig: AppConfig;
  }
}

export {};
