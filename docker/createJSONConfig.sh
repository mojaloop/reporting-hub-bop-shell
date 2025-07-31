#!/bin/sh

# Creates the JSON config based on environment variables
if [ ! -f /usr/share/nginx/html/config.json ]; then
echo "{
  \"AUTH_API_BASE_URL\": \"${AUTH_API_BASE_URL}\",
  \"AUTH_MOCK_API\": \"${AUTH_MOCK_API}\",
  \"REMOTE_API_BASE_URL\": \"${REMOTE_API_BASE_URL}\",
  \"REMOTE_MOCK_API\": \"${REMOTE_MOCK_API}\",
  \"AUTH_ENABLED\": \"${AUTH_ENABLED}\",
  \"LOGIN_URL\": \"${LOGIN_URL}\",
  \"LOGIN_PROVIDER\": \"${LOGIN_PROVIDER}\",
  \"LOGOUT_URL\": \"${LOGOUT_URL}\",
  \"TITLE\": \"${REACT_APP_TITLE}\",
  \"TITLE_IMAGE\": \"${REACT_APP_TITLE_IMAGE}\",
  \"TITLE_BAR_COLOR\": \"${REACT_APP_TITLE_BAR_COLOR}\",
  \"SUBTITLE\": \"${REACT_APP_SUBTITLE}\",
  \"DFSP_IMG\": \"${REACT_APP_DFSP_IMG}\",
  \"AUTH_TOKEN_URL\": \"${AUTH_TOKEN_URL}\"
}" | jq '.' > /usr/share/nginx/html/config.json
else
  echo "Config file already exists, skipping creation."
fi
# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
