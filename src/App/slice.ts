import requestState from '@modusbox/redux-utils/lib/reducers/request';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Remote } from './types';

export const initialState: AppState = {
  remotes: requestState(),
  permitted: requestState(),
};

const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    requestRemotes(state: AppState) {
      return {
        ...state,
        remotes: requestState.request(state.remotes),
      };
    },
    requestRemotesSuccess(state: AppState, action: PayloadAction<Remote[]>) {
      return {
        ...state,
        remotes: requestState.succeeded(state.remotes, action.payload),
      };
    },
    requestRemotesFailed(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        remotes: requestState.failed(state.remotes, action.payload),
      };
    },
    requestPermitted(state: AppState) {
      return {
        ...state,
        permitted: requestState.request(state.permitted),
      };
    },
    requestPermittedSuccess(state: AppState, action: PayloadAction<string[]>) {
      return {
        ...state,
        permitted: requestState.succeeded(state.permitted, action.payload),
      };
    },
    requestPermittedFailed(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        permitted: requestState.failed(state.permitted, action.payload),
      };
    },
  },
});

export const { reducer, actions } = slice;
export default reducer;
