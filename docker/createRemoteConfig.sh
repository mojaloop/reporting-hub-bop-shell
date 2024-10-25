#!/bin/sh

# Creates the Remotes config based on environment variables
echo "[
  {
    \"path\": \"/iam\",
    \"label\": \"Roles\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_1_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_role_ui\",
    \"cssUrl\": \"${REACT_APP_SCSS}\"
  },
  {
    \"path\": \"/transfers\",
    \"label\": \"Transfers\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_2_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_trx_ui\",
    \"cssUrl\": \"${REACT_APP_SCSS}\"
  },
  {
    \"path\": \"/settlements\",
    \"label\": \"Settlements\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_3_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_settlements_ui\",
    \"cssUrl\": \"${REACT_APP_SCSS}\"
  },
  {
    \"path\": \"/positions\",
    \"label\": \"Financial Positions\",
    \"menuComponent\": \"Menu\",
    \"appComponent\": \"App\",
    \"url\": \"${REMOTE_4_URL}/app.js\",
    \"appName\": \"reporting_hub_bop_positions_ui\",
    \"cssUrl\": \"${REACT_APP_SCSS}\"
  }
]" | jq '.' > /usr/share/nginx/html/remotes.json

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
