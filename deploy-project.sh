#!/bin/bash

cd ./backend
npm install
npm audit fix
npm run build

cd ../build-backend
npm install
npm audit fix

cd ../
cp -R ./data ./build-backend/
docker-compose up -d
