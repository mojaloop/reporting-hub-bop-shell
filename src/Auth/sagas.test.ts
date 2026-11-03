import { runSaga, stdChannel } from 'redux-saga';
import rootSaga from './sagas';
import { actions } from './slice';

const LOGOUT_ENDPOINT = 'https://kratos.example/self-service/logout/browser';
const LOGOUT_URL = 'https://kratos.example/self-service/logout?token=t';

test('logout sends the session cookie to Kratos and follows the logout URL it answers', async () => {
  const fetchMock = jest.fn().mockResolvedValue({ json: async () => ({ logout_url: LOGOUT_URL }) });
  global.fetch = fetchMock as unknown as typeof fetch;
  const assign = jest.fn();
  const followed = new Promise((resolve) => assign.mockImplementation(resolve));
  Object.defineProperty(window, 'location', { value: { assign }, writable: true });

  const channel = stdChannel();
  const task = runSaga(
    { channel, getState: () => ({ config: { auth: { logoutEndpoint: LOGOUT_ENDPOINT } } }) },
    rootSaga,
  );
  channel.put(actions.logout());
  await followed;
  task.cancel();

  expect(fetchMock).toHaveBeenCalledWith(
    LOGOUT_ENDPOINT,
    expect.objectContaining({ credentials: 'include' }),
  );
  expect(assign).toHaveBeenCalledWith(LOGOUT_URL);
});
