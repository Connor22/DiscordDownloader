# Summary

DiscordDownloader is a program written in Node.JS that will automatically download any image linked to or uploaded. The channels it downloads from are only those that you specifically active the bot in using the command ";enable" (this may have a different prefix depending on your settings).

Specific users can be ignored by using the ";ignore @user" command. This will stop the bot from downloading anything uploaded/linked by that specific user.

# Prerequisites

A rudimentary understanding of command lines is necessary. 

DiscordDownloader uses pm2 to run in the background, so if you want to have more control over the process, [http://pm2.keymetrics.io/](http://pm2.keymetrics.io/) is your go-to resource

# Install

### Step 1
Install [node.js](https://nodejs.org/en/download/) (this script has been tested on both node 4.4.0 and 5.8.0)

### Step 2
Download the latest release

### Step 3
Run ```setup.bat```

# Bot Operation

By default, the bot has no channels it's active in. Once a channel has been marked as active, the bot will actively download images that A: It doesn't recognize the filename of & B: Are not from an ignored user.

The files ```_startDownloader.bat``` and ```_stopDownloader.bat``` will stop the process running in the background respectively. 

#### The commands are as follows (with ; being replaced with your custom prefix if you chose one):

- ```;enable```
 - The bot will download images from the channel this is typed in.
- ```;disable```
 - The bot will no longer download images from the channel this is typed in.
- ```;ignore @user```
 - The bot will ignore the mentioned user, and will not download images from their messages
