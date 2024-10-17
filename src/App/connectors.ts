import { State, Dispatch } from 'store';
import ReduxContext from 'store/context';
import { connect, ConnectedProps } from 'react-redux';
import { actions } from './slice';
import * as selectors from './selectors';
import * as authSelectors from '../Auth/selectors';
import { actions as authActions } from '../Auth/slice';

const appConnector = connect(
  (state: State) => ({
    remotes: selectors.getRemotes(state),
    isLoggedIn: authSelectors.getIsLoggedIn(state),
    userEmail: authSelectors.getUserEmail(state),
  }),
  (dispatch: Dispatch) => ({
    onMount: () => dispatch(actions.requestRemotes()),
    logout: () => dispatch(authActions.logout()),
  }),
  null,
  { context: ReduxContext },
);

export type AppProps = ConnectedProps<typeof appConnector>;
export default appConnector;
