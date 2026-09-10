import { createSelector } from 'reselect';
import { State } from 'store';
import { Remote } from './types';

export const getRemotes = (state: State) => state.app.remotes;
export const getCustomization = (state: State) => state.config.customization;
export const getPermitted = (state: State) => state.app.permitted;
export const getCapabilitiesEndpoint = (state: State) => state.config.api.capabilitiesEndpoint;

export const getRemoteList = (state: State): Remote[] => (state.app.remotes.data as Remote[]) || [];

// Withheld only where the permission is known to be absent
export const getVisibleRemotes = createSelector(
  getRemoteList,
  getPermitted,
  (remotes, permitted): Remote[] => {
    const enabled = remotes.filter((remote) => remote.enabled !== false);
    if (!permitted.initialized || permitted.error) {
      return enabled;
    }
    const allowed = new Set((permitted.data as string[]) || []);
    return enabled.filter((remote) => !remote.permission || allowed.has(remote.path));
  },
);
