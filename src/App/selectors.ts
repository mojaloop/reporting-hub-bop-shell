import { createSelector } from 'reselect';
import { State } from 'store';
import { Remote } from './types';

export const getRemotes = (state: State) => state.app.remotes;
export const getCustomization = (state: State) => state.config.customization;
export const getPermitted = (state: State) => state.app.permitted;
export const getIsAuthEnabled = (state: State) => state.config.auth.isAuthEnabled;

export const getRemoteList = (state: State): Remote[] => (state.app.remotes.data as Remote[]) || [];

export const getVisibleRemotes = createSelector(
  getRemoteList,
  getPermitted,
  (remotes, permitted): Remote[] => {
    const allowed = new Set((permitted.data as string[]) || []);
    return remotes.filter((remote) => remote.enabled !== false && allowed.has(remote.path));
  },
);
