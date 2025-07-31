#!/bin/sh

# Creates the Remotes config based on environment variables
if [ ! -f /usr/share/nginx/html/remotes.json ]; then
echo "{
  \"roles\": {
    \"path\": \"/iam\",
    \"label\": \"Roles\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"baseUrl\": \"${REMOTE_1_URL}\",
    \"url\": \"${REMOTE_1_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_role_ui\"
  },
  \"transfers\": {
    \"path\": \"/transfers\",
    \"label\": \"Transfers\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"baseUrl\": \"${REMOTE_2_URL}\",
    \"url\": \"${REMOTE_2_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_trx_ui\"
  },
  \"settlements\": {
    \"path\": \"/settlements\",
    \"label\": \"Settlements\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"baseUrl\": \"${REMOTE_3_URL}\",
    \"url\": \"${REMOTE_3_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_settlements_ui\"
  },
  \"positions\": {
    \"path\": \"/positions\",
    \"label\": \"Financial Positions\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"baseUrl\": \"${REMOTE_4_URL}\",
    \"url\": \"${REMOTE_4_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_positions_ui\"
  }
}" | jq '.' > /usr/share/nginx/html/remotes.json
else
  echo "Remotes config file already exists, skipping creation."
fi
# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
