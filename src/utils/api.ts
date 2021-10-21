import { State } from 'store';
import remotesMock from 'App/_mockData';
import buildApis, { buildEndpointBuilder } from '@modusbox/redux-utils/lib/api';

const services = {
  mainApi: {
    baseUrl: (state: State) => state.config.api.remoteApiBaseUrl,
    mock: (state: State) => state.config.api.remoteMockApi,
  },
};

const builder = buildEndpointBuilder<State>();

export default buildApis({
  // NOTE: instead of an actual api, using local json file to store
  //       remote microfrontend config
  remotes: builder({
    service: services.mainApi,
    url: '/remotes.json',
    mock: remotesMock,
  }),
});
