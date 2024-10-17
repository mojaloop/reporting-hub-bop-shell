## Environment Variables

The application is driven by some environment variables used at build and runtime.


### Always Available Environment Variables

| Name | Description | Default |
|---|---|---|
| `REACT_APP_VERSION` | version extracted from `package.json` | - |
| `REACT_APP_COMMIT` | commit extracted from git history | - |

### Used Locally / Static Files CDN

| Name | Description | Default | Used Locally | Used In A Deployment
|---|---|---|---|---|
| `REACT_APP_API_BASE_URL` | base url / path for api | /api | V | ? |
| `REACT_APP_AUTH_ENABLED` | enabled or disables auth | true | V | ? |
| `REACT_APP_MOCK_API` |  enables mock api locally | true | V | ? |
| `DEV_PORT` | webpack server dev http port | 3001 | V |   |
| `REMOTE_1_URL` | where to load the app 1 | http://localhost:3012 | V | V |

### Docker Only Environment Variables

| Name | Description |
|---|---|
| `API_BASE_URL` | base path for api (could be a URL) |
| `LOGIN_URL` | where to redirect for login |
| `LOGIN_PROVIDER` | enable automatic redirect to Kratos provider |
| `LOGOUT_URL` | where to redirect for logout |
| `MOCK_API` | enable mocking api |
| `AUTH_ENABLED` | enable auth |
