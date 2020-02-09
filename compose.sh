#!/usr/bin/env sh
# ------------------------------------------------------------------
# AUTHOR
#     Plínio Naves <pliniopjn@hotmail.com>
#
# TITLE       
#     Custom Docker Compose
#
# DESCRIPTION
#     This script is a customization for the docker-compose
#     command allowing the use of multiple .env files,
#     differentiating environments such as dev, prod, test, stage, etc
#
# ARGS
#     $0      The command/file itself, ex: ./compose.sh
#     $1      The docker-compose command, ex: up, config, "up -d", build
#     $2      The environment to use, ex: dev, prod, test, stage
#
# EXAMPLES
#     > ./compose.sh up dev
#     > ./compose.sh "up -d" prod
# ------------------------------------------------------------------

# variables
COMMAND=$1
ENVIRONMENT=$2
COMPOSE_FILE=$ENVIRONMENT
FILES=(
  ".env.local"
  ".env.$ENVIRONMENT"
  ".env.$ENVIRONMENT.local"
)

# check for docker command arg
if [ -z "$1" ]
  then
    echo "No Docker command supplied"
    exit 1
fi

# check for environment arg
if [ -z "$2" ]
  then
    echo "No environment supplied"
    echo "Possible values: dev, test, stage or prod"
    exit 1
fi

# create the .env file
echo "Creating .env file..."
> .env

for file in ${FILES[@]}
do
  if [ -e $file ]
  then
    echo "`cat $file`" >> .env
  fi
done

echo "Success!"

# check if environment is dev, if so change COMPOSE_FILE
if [ $ENVIRONMENT == "dev" ]
then
  COMPOSE_FILE="override"
fi

# run docker-compose command
echo "Running docker-compose $COMMAND in $ENVIRONMENT ($COMPOSE_FILE)..."
#docker-compose -f docker-compose.yml -f docker-compose.$COMPOSE_FILE.yml $COMMAND