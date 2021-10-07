import { State } from 'store';
import authMock from 'Auth/_mockData';
import remotesMock from 'App/_mockData';
import buildApis, { buildEndpointBuilder } from '@modusbox/redux-utils/lib/api';

const services = {
  kratos: {
    baseUrl: (state: State) => state.config.api.authApiBaseUrl,
    mock: (state: State) => state.config.api.authMockApi,
  },
  mainApi: {
    baseUrl: (state: State) => state.config.api.remoteApiBaseUrl,
    mock: (state: State) => state.config.api.remoteMockApi,
  },
};

const builder = buildEndpointBuilder<State>();

export default buildApis({
  whoami: builder({
    service: services.kratos,
    url: (state: State) => state.config.auth.tokenEndpoint,
    mock: authMock,
  }),
  // NOTE: instead of an actual api, using local json file to store
  //       remote microfrontend config
  remotes: builder({
    service: services.mainApi,
    url: '/remotes.json',
    mock: remotesMock,
  }),
});
