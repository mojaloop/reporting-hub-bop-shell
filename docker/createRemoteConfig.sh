#!/bin/sh

# Creates the Remotes config based on environment variables
echo "[
  {
    \"path\": \"/iam\",
    \"label\": \"Roles Microfrontend\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_1_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_role_ui\"
  },
  {
    \"path\": \"/transfers\",
    \"label\": \"Transfers Microfrontend\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_2_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_trx_ui\"
  }
]" | jq '.' > remotes.json

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
