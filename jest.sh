#!/bin/bash

set -eu

source .env.test

docker compose run -e DATABASE_URL=${DATABASE_URL:-} app yarn prisma db push --force-reset
docker compose run -e DATABASE_URL=${DATABASE_URL:-} app yarn run test "$@"
