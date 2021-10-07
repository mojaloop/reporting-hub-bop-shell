#!/bin/bash
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' runtime-env.js
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' index.html

exec "$@"
