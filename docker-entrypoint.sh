#! /bin/sh

cd /root
# because docker compose is not used, we need to install the dependencies
npm install && exec "$@"
