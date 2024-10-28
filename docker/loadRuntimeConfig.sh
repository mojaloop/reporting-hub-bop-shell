#!/bin/bash
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REMOTE_1_URL__#'"$REMOTE_1_URL"'#g' /usr/share/nginx/html/index.html

sed -i 's#__REMOTE_2_URL__#'"$REMOTE_2_URL"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REMOTE_2_URL__#'"$REMOTE_2_URL"'#g' /usr/share/nginx/html/index.html

sed -i 's#__REMOTE_3_URL__#'"$REMOTE_3_URL"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REMOTE_3_URL__#'"$REMOTE_3_URL"'#g' /usr/share/nginx/html/index.html

sed -i 's#__REMOTE_4_URL__#'"$REMOTE_4_URL"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REMOTE_4_URL__#'"$REMOTE_4_URL"'#g' /usr/share/nginx/html/index.html

sed -i 's#__REACT_APP_TITLE__#'"$REACT_APP_TITLE" '#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REACT_APP_TITLE__#'"$REACT_APP_TITLE" '#g' /usr/share/nginx/html/index.html

sed -i 's#__REACT_APP_SCSS__#'"$REACT_APP_SCSS"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REACT_APP_SCSS__#'"$REACT_APP_SCSS"'#g' /usr/share/nginx/html/index.html

sed -i 's#__REACT_APP_SUBTITLE__#'"$REACT_APP_SUBTITLE" '#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REACT_APP_SUBTITLE__#'"$REACT_APP_SUBTITLE" '#g' /usr/share/nginx/html/index.html

sed -i 's#__REACT_APP_DFSP_IMG__#'"$REACT_APP_DFSP_IMG" '#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__REACT_APP_DFSP_IMG__#'"$REACT_APP_DFSP_IMG" '#g' /usr/share/nginx/html/index.html

sed -i 's#__TEST_TEXT__#'"$TEST_TEXT"'#g' /usr/share/nginx/html/runtime-env.js
sed -i 's#__TEST_TEXT__#'"$TEST_TEXT" '#g' /usr/share/nginx/html/index.html

exec "$@"

