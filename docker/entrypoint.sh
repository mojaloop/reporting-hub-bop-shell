#!/bin/sh

# Run the script before starting the server
sh /usr/share/nginx/html/createJSONConfig.sh
sh /usr/share/nginx/html/createRemoteConfig.sh
sh /usr/share/nginx/html/loadRuntimeConfig.sh

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"
