// settings.js
// ===========
// This file contains settings for VSCP websocket and other JavaScript examples
//
// The vscpkey is the same key as set in the general/security settings of the
// VSCP daemon found in /etc/vscp/vscpd.conf  It should always be 32 bytes (64 characters)
// in length and always be kept secret.
//
// /vscp/ws1 is websocket interface 1

var settings = {
    user: "admin",
    password: "secret",
    authdomain: "mydomain.com",
    //passwordHash: "d50c3180375c27927c22e42a379c3f67", // Hash on "admin:vscptoken:secret"
    vscpkey: "A4A86F7D7E119BA3F0CD06881E371B989B33B6D606A863B633EF529D64544F8E",
    //url: "ws://192.168.1.9:8884/ws1" // Non SSL (to be able to use from remote machine)
    //url: "wss://192.168.1.9:8843/ws1" // SSL (to be able to use from remote machine)
    //url: "ws://demo.vscp.org:8884/ws1" // Demoserver
    url: "ws://localhost:8884/ws1" // Local server
};
