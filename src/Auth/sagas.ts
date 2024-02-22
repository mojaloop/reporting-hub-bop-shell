import { is200, is401 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { MakeResponse } from '@modusbox/redux-utils/lib/api';
import * as selectors from './selectors';
import { actions } from './slice';
import { LoggedUser } from './types';

function* doAuth() {
  try {
    let response: MakeResponse<LoggedUser>;
    try {
      response = yield call(api.whoami.read);
    } catch (error) {
      response = error.response;
      if (!response) throw error;
    }
    const { data, status } = response;

    if (is200(status)) {
      yield put(actions.doAuthSuccess(data));
    } else if (is401(status)) {
      const loginProvider: string = yield select(selectors.getLoginProvider);
      const loginEndpoint: string = yield select(selectors.getLoginEndpoint);
      const loginUrl: string = `${loginEndpoint}?return_to=${window.location.href}`;
      if (loginProvider) {
        const loginResult: string = yield call(async () => {
          try {
            // obtain login flow
            const {
              ui: { method, action, nodes },
            } = await (await fetch(loginUrl, { headers: { accept: 'application/json' } })).json();
            const form = document.createElement('form');
            form.method = method;
            form.action = action;
            let submit: HTMLInputElement | undefined;

            nodes.forEach(
              ({
                attributes: { type, name, node_type, value },
              }: {
                attributes: Record<string, string>;
              }) => {
                if (name === 'provider' && value !== loginProvider) return;
                const element = document.createElement(node_type) as HTMLInputElement;
                if (name === 'provider') submit = element;
                element.type = type;
                element.value = value;
                element.name = name;
                form.appendChild(element);
              },
            );

            if (submit) {
              document.body.appendChild(form);
              submit.click();
            } else {
              window.location.assign(loginUrl);
            }
          } catch (error) {
            console.error(error);
            return 'Currently unable to perform authentication. Please try again later';
          }
          return '';
        });
        if (loginResult) {
          yield put(actions.doAuthFailed(loginResult));
        }
      } else {
        window.location.href = loginUrl;
      }
    } else {
      yield put(
        actions.doAuthFailed(
          'There was an error while performing authentication. Please try again later',
        ),
      );
    }
  } catch (error) {
    console.error(error);
    yield put(
      actions.doAuthFailed('Currently unable to perform authentication. Please try again later'),
    );
  }
}

function* logout() {
  const logoutEndpoint: string = yield select(selectors.getLogoutEndpoint);
  const loginProvider: string = yield select(selectors.getLoginProvider);
  if (loginProvider) {
    fetch(logoutEndpoint, { headers: { accept: 'application/json' } })
      .then((response) => response.json())
      .then((jsonResponse) => {
        window.location.assign(`${jsonResponse.logout_url}&return_to=${window.location.href}`);
      });
  } else {
    window.location.assign(`${logoutEndpoint}?return_to=${window.location.href}`);
  }
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
