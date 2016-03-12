@echo off

start npm install --save discord.js ^&^& exit
start npm install --save jsonfile ^&^& exit
start npm install --save request ^&^& exit
start npm install pm2 -g ^&^& exit

echo Please press enter after all the other windows have closed...
pause >nul

set /p user= "Enter login email (I recommend you enter your own credentials so you can easily ignore spammers, but a throwaway account also works as long as it's on the server you want to download from): "
set /p pass= "Enter password: "
set /p prefix= "Enter a custom prefix for commands (if nothing is entered then ; will be used): "

node setup.js %user% %pass% %prefix%

pm2 start app.js --name downloader
pm2 stop downloader
pause