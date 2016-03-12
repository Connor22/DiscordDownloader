/* DISCORD BOT INITIALIZATION */
	var Discord = require("discord.js");
	var downloader = new Discord.Client();

/* IMPORT MODULES */
	var jsonfs = require('jsonfile');
	jsonfs.spaces = 4;

	var fs = require('fs');
    var request = require('request');
    var path = require('path');

/* IMPORT USER OPTIONS */
	var userOptions = require("./userOptions.json");
	var channelsFile = require("./activeChannels.json");
	var activeChannels = load(channelsFile);

/* REGEXES */
	var captureURL = /http.*([^\/]+)(?=\.\w{3,4}\b)(?!\.\w{3,4}\b\/)(\.\w{3,4})/g;
	var captureFilename = /([^\/]+)(?=\.\w{3,4}\b)(?!\.\w{3,4}\b\/)(\.\w{3,4})/;

/* IMAGE DOWNLOAD */
	var download = function(uri, filename, callback){
	  request.head(uri, function(err, res, body){
	    console.log('content-type:', res.headers['content-type']);
	    console.log('content-length:', res.headers['content-length']);
	    request(uri).pipe(fs.createWriteStream(path.join(userOptions.folder, filename))).on('close', callback);
	  });
	};



/* EVENT TRIGGER */
	downloader.on('message', function(message){
		if (isActive(message.channel.id) && checkMessageValidity(message)){
			checkAttachments(message);
			checkURLS(message.cleanContent);
		}

		if (message.author.equals(downloader.user) && message.cleanContent.charAt(0) === userOptions.prefix){
			userCommands(message);
		}
	});

/* MAIN FUNCTIONS */
	function checkAttachments(message){
		if (message.attachments.length > 0){
			setTimeout(delayedDownload, 2000, message.attachments[0].url, message.attachments[0].filename);
		}
	}

	function checkURLS(messageString){
		if (messageString.match(captureURL)){
			console.log("URL: " + messageString.match(captureURL));
			console.log("Filename: " + messageString.match(captureFilename));
		}
	}

	function userCommands(message){
		var command = message.cleanContent.substr(1);
		var splitCommands = command.split(" ");		

		if (command === "enable" && !isActive(message.channel.id)){
			activeChannels[message.channel.id] = message.channel;
			save(activeChannels, path.join(__dirname, 'activeChannels.json'), true);
		} else if (command === "disable" && isActive(message.channel.id)){
			delete activeChannels[message.channel.id];
			save(activeChannels, path.join(__dirname, 'activeChannels.json'), true);
		}

		if (splitCommands[0] === "ignore"){
			if (message.mentions.length === 1){
				userOptions.ignoredUsers.push(message.mentions[0].id);
				save(userOptions, path.join(__dirname, 'userOptions.json'));
			}
		}
	}

/* HELPER FUNCTIONS */
	function checkArray(item, array){ //Parent function : modCheck
		return (array.indexOf(item) != -1);
	}

	function isActive(channelID){
		return (channelID in activeChannels);
	}

	function delayedDownload(url, filename){
		download(url, filename, function(){
		  console.log('Downloaded ' + filename);
		  userOptions.downloaded.push(filename);
		  save(userOptions, path.join(__dirname, 'userOptions.json'));
		});
	}

	function checkMessageValidity(message){
		var shouldContinue = true;
		if (message.attachments.length > 0 && checkArray(message.attachments[0].filename, userOptions.downloaded)){
			shouldContinue = false;
		}
		if (checkArray(message.author.id, userOptions.ignoredUsers)){
			shouldContinue = false;
		}

		return shouldContinue;
	}

/* FILE OPERATIONS */
	function load(Obj){
	    var recon = {};

	    for(var channelList in Obj){
	        recon[channelList] = {};
	        if (Object.keys(Obj[channelList]).length){
	            for (var id in Obj[channelList]){
	            	recon[channelList][id] = downloader.channels.get("id", id);
	            }
	        }
	    }
	    
	    return recon;
	}

	function save(Obj, file, encrypt){
		if (!encrypt){
			jsonfs.writeFileSync(file, Obj);
		} else {
			var decon = {};

		    for(var channelList in Obj){
		        decon[channelList] = {};
		        if (Object.keys(Obj[channelList]).length){
		            for (var id in Obj[channelList]){
		                decon[channelList][id] = id;
		            }
		        }
		    }
		    
		    jsonfs.writeFileSync(file, decon);
		}
	}

/* LOGIN */
	downloader.login(userOptions.username, userOptions.password);