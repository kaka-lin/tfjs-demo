#! /bin/bash -xe

CONTAINER="${USER}_tfjs_demo"
COMPOSE_FILE="./docker-compose-dev.yml"
START_SHELL="sh"

# test if the container is running
HASH=`docker ps -q -f name=$CONTAINER`

# test if the container is stopped
HASH_STOPPED=`docker ps -qa -f name=$CONTAINER`

if [ -n "$HASH" ];then
    echo "found existing running container $CONTAINER, proceeding to exec another shell"
    # docker-compose -f $COMPOSE_FILE restart # for db container
    docker exec -it $HASH $START_SHELL
elif [ -n "$HASH_STOPPED" ];then
    echo "found existing stopped container $CONTAINER, starting"
    # docker-compose -f $COMPOSE_FILE restart # for db container
    docker start --attach -i $HASH_STOPPED
else
    echo "existing container not found, creating a new one, named $CONTAINER"
    # rm -rf node_modules
    docker-compose -f $COMPOSE_FILE run --service-ports --name=$CONTAINER app
fi
echo "see you, use 'docker rm $CONTAINER' to kill the dev container or 'docker-compose -f $COMPOSE_FILE down' to kill both the postgres and the dev container if you want a fresh env next time"
