import { is200, is401 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { MakeResponse } from '@modusbox/redux-utils/lib/api';
import * as selectors from './selectors';
import { actions } from './slice';
import { LoggedUser } from './types';

function* doAuth() {
  try {
    // @ts-ignore
    const response = yield call(api.whoami.read) as MakeResponse<LoggedUser>;
    const { data, status } = response;

    if (is200(status)) {
      yield put(actions.doAuthSuccess(data));
    } else if (is401(status)) {
      window.location.href = yield select(selectors.getLoginEndpoint);
    } else {
      yield put(
        actions.doAuthFailed(
          'There was an error while performing authentication. Please try again later',
        ),
      );
    }
  } catch (e) {
    yield put(
      actions.doAuthFailed('Currently unable to perform authentication. Please try again later'),
    );
  }
}

function* logout() {
  const logoutEndpoint: string = yield select(selectors.getLogoutEndpoint);
  window.location.href = logoutEndpoint;
}

function* doAuthSaga() {
  yield takeLatest([actions.doAuth.type], doAuth);
}

function* logoutSaga() {
  yield takeLatest([actions.logout.type], logout);
}

export default function* rootSaga() {
  yield all([doAuthSaga(), logoutSaga()]);
}
