import { runSaga, Saga } from 'redux-saga';
import requestState from '@modusbox/redux-utils/lib/reducers/request';
import { requestPermitted } from './sagas';
import { getVisibleRemotes } from './selectors';
import { actions } from './slice';
import { Remote } from './types';

const ROLES = 'portalRoles.view';
const TRANSFERS = 'portalTransfers.view';

const remote = (path: string, permission?: string): Remote => ({
  path,
  label: path,
  menuComponent: 'Menu',
  appComponent: 'App',
  url: '',
  scope: '',
  ...(permission !== undefined ? { permission } : {}),
});

const REMOTES = [remote('/iam', ROLES), remote('/transfers', TRANSFERS), remote('/open')];

const stateWith = ({
  permissions,
  isAuthEnabled = true,
  remotes = REMOTES,
}: {
  permissions?: Record<string, unknown>;
  isAuthEnabled?: boolean;
  remotes?: Remote[];
}) => ({
  config: { auth: { isAuthEnabled } },
  app: { remotes: { data: remotes } },
  auth: {
    user: {
      identity: {
        traits: {},
        ...(permissions !== undefined ? { metadata_public: { permissions } } : {}),
      },
    },
  },
});

const run = async (state: ReturnType<typeof stateWith>) => {
  const dispatched: unknown[] = [];
  await runSaga(
    { dispatch: (action) => dispatched.push(action), getState: () => state },
    requestPermitted as Saga,
  ).toPromise();
  return dispatched;
};

describe('which remotes the caller is offered, from their session', () => {
  it('offers the remotes whose permission the session holds, and those that name none', async () => {
    const dispatched = await run(stateWith({ permissions: { [ROLES]: {} } }));

    expect(dispatched).toEqual([actions.requestPermittedSuccess(['/iam', '/open'])]);
  });

  it('offers only the remotes that name no permission when the session holds none', async () => {
    const dispatched = await run(stateWith({}));

    expect(dispatched).toEqual([actions.requestPermittedSuccess(['/open'])]);
  });

  it('offers every remote with authentication off', async () => {
    const dispatched = await run(stateWith({ isAuthEnabled: false }));

    expect(dispatched).toEqual([actions.requestPermittedSuccess(['/iam', '/transfers', '/open'])]);
  });
});

describe('the menu', () => {
  const stateOf = (permitted: ReturnType<typeof requestState>, remotes: Remote[] = REMOTES) =>
    ({ app: { remotes: { data: remotes }, permitted } } as unknown as Parameters<
      typeof getVisibleRemotes
    >[0]);
  const paths = (remotes: Remote[]) => remotes.map((r) => r.path);

  it('lists the permitted remotes that are enabled', () => {
    const remotes = [...REMOTES, { ...remote('/off'), enabled: false }];
    const permitted = requestState.succeeded(requestState(), ['/iam', '/open', '/off']);

    expect(paths(getVisibleRemotes(stateOf(permitted, remotes)))).toEqual(['/iam', '/open']);
  });

  it('lists nothing while what the caller holds is unknown', () => {
    expect(getVisibleRemotes(stateOf(requestState()))).toEqual([]);
  });
});
