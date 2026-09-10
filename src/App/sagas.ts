import apis from 'utils/api';
import { is200 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getCapabilitiesEndpoint, getRemoteList } from './selectors';
import { actions } from './slice';
import { Remote } from './types';

interface CheckResult {
  allowed: boolean;
}

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

// One request covers every gated remote: the permissions go out in a batch and
// come back in the order they were asked. An unanswered request reads as
// "unknown", never as "denied"
function* requestPermitted() {
  const endpoint: string = yield select(getCapabilitiesEndpoint);
  const remotes: Remote[] = yield select(getRemoteList);
  const gated = remotes.filter((remote) => remote.permission);

  if (!endpoint || gated.length === 0) {
    yield put(actions.requestPermittedSuccess(remotes.map((remote) => remote.path)));
    return;
  }

  try {
    const response: Response = yield call(fetch, endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tuples: gated.map((remote) => remote.permission) }),
    });
    if (!response.ok) {
      yield put(actions.requestPermittedFailed('Unable to retrieve permissions'));
      return;
    }
    const { results }: { results: CheckResult[] } = yield call([response, response.json]);
    const permitted = remotes
      .filter((remote) => {
        if (!remote.permission) return true;
        return results[gated.indexOf(remote)]?.allowed === true;
      })
      .map((remote) => remote.path);
    yield put(actions.requestPermittedSuccess(permitted));
  } catch (e) {
    yield put(actions.requestPermittedFailed('Unable to retrieve permissions'));
  }
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
