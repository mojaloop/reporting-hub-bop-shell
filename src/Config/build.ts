import { ApiConfig, AppConfig, AuthConfig, CustomizationConfig } from './types';

export default async (): Promise<AppConfig & AuthConfig & ApiConfig & CustomizationConfig> => {
  const { protocol, host } = window.location;
  const baseUrl = `${protocol}//${host}`;
  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  const defaults = {
    loginEndpoint: `${process.env.REACT_APP_LOGIN_URL}`,
    loginProvider: `${process.env.REACT_APP_LOGIN_PROVIDER}`,
    logoutEndpoint: `${process.env.REACT_APP_LOGOUT_URL}`,
    authTokenEndpoint: `${process.env.REACT_APP_AUTH_TOKEN_URL}`,
    isAuthEnabled: process.env.REACT_APP_AUTH_ENABLED !== 'false',
    basename: baseUrl,
    authApiBaseUrl: `${process.env.REACT_APP_AUTH_API_BASE_URL}`,
    authMockApi: process.env.REACT_APP_AUTH_MOCK_API === 'true',
    remoteApiBaseUrl: `${process.env.REACT_APP_REMOTE_API_BASE_URL}`,
    remoteMockApi: process.env.REACT_APP_REMOTE_MOCK_API === 'true',
    title: `${process.env.REACT_APP_TITLE}`,
    titleImage: `${process.env.REACT_APP_TITLE_IMAGE}`,
    titleBarColor: `${process.env.REACT_APP_TITLE_BAR_COLOR}`,
    subTitle: `${process.env.REACT_APP_SUBTITLE}`,
    dfspImg: `${process.env.REACT_APP_DFSP_IMG}`,
  };

  const config = { ...defaults };
  try {
    const {
      AUTH_API_BASE_URL,
      AUTH_MOCK_API,
      REMOTE_API_BASE_URL,
      REMOTE_MOCK_API,
      AUTH_ENABLED,
      LOGIN_URL,
      LOGIN_PROVIDER,
      LOGOUT_URL,
      AUTH_TOKEN_URL,
      TITLE,
      TITLE_IMAGE,
      TITLE_BAR_COLOR,
      SUBTITLE,
      DFSP_IMG,
    } = await fetch(`${baseUrl}/config.json`).then((response) => response.json());

    if (LOGIN_URL !== undefined) {
      config.loginEndpoint = LOGIN_URL;
    }
    if (TITLE !== undefined) {
      config.title = TITLE;
    }
    if (TITLE_IMAGE !== undefined) {
      config.titleImage = TITLE_IMAGE;
    }
    if (TITLE_BAR_COLOR !== undefined) {
      config.titleBarColor = TITLE_BAR_COLOR;
    }
    if (LOGIN_PROVIDER !== undefined) {
      config.loginProvider = LOGIN_PROVIDER;
    }
    if (LOGOUT_URL !== undefined) {
      config.logoutEndpoint = LOGOUT_URL;
    }
    if (AUTH_TOKEN_URL !== undefined) {
      config.authTokenEndpoint = AUTH_TOKEN_URL;
    }
    if (AUTH_API_BASE_URL !== undefined) {
      config.authApiBaseUrl = AUTH_API_BASE_URL;
    }
    if (AUTH_MOCK_API !== undefined) {
      config.authMockApi = AUTH_MOCK_API === 'true';
    }
    if (REMOTE_API_BASE_URL !== undefined) {
      // NOTE: instead of an actual api, using local json file to store
      //       remote microfrontend config
      config.remoteApiBaseUrl = baseUrl;
    }
    if (REMOTE_MOCK_API !== undefined) {
      config.remoteMockApi = REMOTE_MOCK_API === 'true';
    }
    if (AUTH_ENABLED !== undefined) {
      config.isAuthEnabled = AUTH_ENABLED !== 'false';
    }
    if (SUBTITLE !== undefined) {
      config.subTitle = SUBTITLE;
    }
    if (DFSP_IMG !== undefined) config.dfspImg = DFSP_IMG;
  } catch (err) {
    // eslint-disable-next-line
    console.info('config returned error', err);
  }

  return config;
};
