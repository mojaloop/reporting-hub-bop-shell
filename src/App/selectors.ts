import { State } from 'store';

export const getRemotes = (state: State) => state.app.remotes;
export const getCustomization = (state: State) => state.config.customization;
