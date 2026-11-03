import { RequestState } from '@modusbox/redux-utils/lib/reducers/request';

export interface Remote {
  path: string;
  label: string;
  menuComponent: string;
  appComponent: string;
  url: string;
  scope: string;
  // The IAM permission that opens the remote, `<service>.<operationId>`. It
  // decides whether the entry is offered, never whether access is allowed:
  // the gateway and the remote's APIs enforce that
  permission?: string;
  enabled?: boolean;
  // Needs Access-Control-Allow-Origin from the remote's host
  crossOrigin?: boolean;
}

export interface AppState {
  remotes: RequestState<Remote[]>;
  // Paths of the remotes the caller may use
  permitted: RequestState<string[]>;
}
