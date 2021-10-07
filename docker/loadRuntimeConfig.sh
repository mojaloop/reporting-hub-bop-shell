#!/bin/bash
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' /usr/share/nginx/html/index.html

sed -i 's#__PUBLIC_PATH__#'"$PUBLIC_PATH"'#g' /usr/share/nginx/html/index.html
sed -i 's#__PUBLIC_PATH__#'"$PUBLIC_PATH"'#g' /usr/share/nginx/html/main.js

exec "$@"

