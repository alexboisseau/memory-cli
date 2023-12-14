#!/bin/bash

# Change this to the actual path of your app directory
APP_DIR="your-app-directory"

cd "$APP_DIR" || exit
node dist/index.js