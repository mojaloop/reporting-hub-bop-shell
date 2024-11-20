export type AppConfig = {
  basename: string;
};

export type ApiConfig = {
  authApiBaseUrl: string;
  authMockApi: boolean;
  remoteApiBaseUrl: string;
  remoteMockApi: boolean;
};

export interface AuthConfig {
  loginEndpoint: string;
  loginProvider: string;
  logoutEndpoint: string;
  authTokenEndpoint: string;
  isAuthEnabled: boolean;
}

export interface CustomizationConfig {
  title: string;
  subTitle: string;
  titleImage: string;
  titleBarColor: string;
  dfspImg: string;
}

export type ConfigState = {
  app: AppConfig;
  api: ApiConfig;
  auth: AuthConfig;
  customization: CustomizationConfig;
  isDevelopment: boolean;
};
