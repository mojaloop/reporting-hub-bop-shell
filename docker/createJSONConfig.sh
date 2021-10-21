#!/bin/sh

# Creates the JSON config based on environment variables
echo "{
  \"AUTH_API_BASE_URL\": \"${AUTH_API_BASE_URL}\",
  \"AUTH_MOCK_API\": \"${AUTH_MOCK_API}\",
  \"REMOTE_API_BASE_URL\": \"${REMOTE_API_BASE_URL}\",
  \"REMOTE_MOCK_API\": \"${REMOTE_MOCK_API}\",
  \"AUTH_ENABLED\": \"${AUTH_ENABLED}\",
  \"LOGIN_URL\": \"${LOGIN_URL}\",
  \"LOGOUT_URL\": \"${LOGOUT_URL}\",
  \"WHOAMI_URL\": \"${WHOAMI_URL}\"
}" | jq '.' > /usr/share/nginx/html/config.json

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
