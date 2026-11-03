import apis from 'utils/api';
import { is200 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getSessionPermissions } from 'Auth/selectors';
import { getIsAuthEnabled, getRemoteList } from './selectors';
import { actions } from './slice';
import { Remote } from './types';

function* requestRemotes() {
  try {
    const { status, data } = yield call(apis.remotes.read, {});
    if (is200(status)) {
      yield put(actions.requestRemotesSuccess(Object.values(data)));
      yield put(actions.requestPermitted());
    } else {
      yield put(
        actions.requestRemotesFailed(
          'There was an error while retrieving remotes. Please try again later',
        ),
      );
    }
  } catch (e) {
    yield put(actions.requestRemotesFailed('Some internal error occurred. Please try again later'));
  }
}

// The permissions come from the session the shell signed in with. With
// authentication off there is no caller, and every remote is offered.
export function* requestPermitted() {
  const isAuthEnabled: boolean = yield select(getIsAuthEnabled);
  const remotes: Remote[] = yield select(getRemoteList);
  const held: Record<string, unknown> = yield select(getSessionPermissions);
  const permitted = remotes
    .filter(
      (remote) => !isAuthEnabled || !remote.permission || held[remote.permission] !== undefined,
    )
    .map((remote) => remote.path);
  yield put(actions.requestPermittedSuccess(permitted));
}

function* requestRemotesSaga() {
  yield takeLatest([actions.requestRemotes.type], requestRemotes);
}

function* requestPermittedSaga() {
  yield takeLatest([actions.requestPermitted.type], requestPermitted);
}

export default function* rootSaga() {
  yield all([requestRemotesSaga(), requestPermittedSaga()]);
}
