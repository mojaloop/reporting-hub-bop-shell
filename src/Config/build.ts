import { ApiConfig, AppConfig, AuthConfig } from './types';

export default async (): Promise<AppConfig & AuthConfig & ApiConfig> => {
  const { protocol, host } = window.location;
  const baseUrl = `${protocol}//${host}`;
  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  const defaults = {
    loginEndpoint: `${baseUrl}/auth/auth/login`,
    logoutEndpoint: `${baseUrl}/kratos/self-service/browser/flows/logout`,
    tokenEndpoint: `${baseUrl}/kratos/sessions/whoami`,
    isAuthEnabled: process.env.REACT_APP_AUTH_ENABLED !== 'false',
    basename: baseUrl,
    authApiBaseUrl: `${process.env.REACT_APP_AUTH_API_BASE_URL}`,
    authMockApi: process.env.REACT_APP_AUTH_MOCK_API === 'true',
    remoteApiBaseUrl: `${process.env.REACT_APP_REMOTE_API_BASE_URL}`,
    remoteMockApi: process.env.REACT_APP_REMOTE_MOCK_API === 'true',
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
      LOGOUT_URL,
    } = await fetch(`${baseUrl}/config.json`).then((response) => response.json());

    if (LOGIN_URL !== undefined) {
      config.loginEndpoint = LOGIN_URL;
    }
    if (LOGOUT_URL !== undefined) {
      config.logoutEndpoint = LOGOUT_URL;
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
  } catch (err) {
    // eslint-disable-next-line
    console.info('config returned error', err);
  }

  return config;
};
