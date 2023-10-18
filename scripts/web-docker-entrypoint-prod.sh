#!/bin/sh
set -e

# Check if RUN_MIGRATIONS environment variable is set to "true"
if [ "$INITIALIZE_DB" = "true" ]; then
    echo "Dropping existing database..."
    yarn typeorm schema:drop
fi

echo "Running migrations if there are any that need to be run..."
yarn typeorm migration:run

# Start the application
echo "Starting application..."
yarn start:prod
