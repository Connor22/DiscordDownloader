/* IMPORT MODULES */
	var jsonfs = require('jsonfile');
	jsonfs.spaces = 4;

	var userOptions = require('./userOptions.json');

function setup(username, password, prefix){
	if (prefix && prefix.length === 1){
		userOptions.prefix = prefix;
	}
	userOptions.username = username;
	userOptions.password = password;
	jsonfs.writeFileSync('./userOptions.json', userOptions);
}

setup(process.argv[2], process.argv[3], process.argv[4])