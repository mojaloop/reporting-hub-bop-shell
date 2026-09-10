import { RequestState } from '@modusbox/redux-utils/lib/reducers/request';

// Passed through to the capabilities service untouched. The shell reads
// nothing out of it, so the permission model stays out of the portal.
export interface RemotePermission {
  namespace: string;
  object: string;
  relation: string;
}

export interface Remote {
  path: string;
  label: string;
  menuComponent: string;
  appComponent: string;
  url: string;
  scope: string;
  // Decides whether the entry is offered, never whether access is allowed:
  // the frontend's own edge rule and its APIs enforce that
  permission?: RemotePermission;
  enabled?: boolean;
  // Needs Access-Control-Allow-Origin from the remote's host
  crossOrigin?: boolean;
}

export interface AppState {
  remotes: RequestState<Remote[]>;
  // Paths of the remotes the caller may use
  permitted: RequestState<string[]>;
}
