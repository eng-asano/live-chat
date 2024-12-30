#!/bin/bash

cd /var/www/live-chat

sudo unzip -o build.zip
sudo chmod -R 777 .next/cache
# /usr/bin/pm2 start /usr/bin/pnpm --name "live-chat" -- start
# /usr/bin/pm2 save
