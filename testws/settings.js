// settings.js
// ===========
// This file contains settings for VSCP websocket and 
// other JavaScript examples
//

var vscp_setting_user = "admin";
var vscp_setting_authdomain = "mydomain.com";
var vscp_setting_passwordhash = "d50c3180375c27927c22e42a379c3f67";  // hash on "user:authdomain:password"

// Set the server where you have websockets installed.
//var vscp_setting_url="ws://127.0.0.1:8080";		// Non SSL
var vscp_setting_url="ws://192.168.1.8:8080";			// Non SSL (to be able to use form remote machine)

//var vscp_setting_url="wss://127.0.0.1:8080";
//var vscp_setting_url="wss://192.168.1.8:8080";	// SSL (to be able to use form remote machine)