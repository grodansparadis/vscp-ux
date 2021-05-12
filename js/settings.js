// settings.js
// ===========
// This file contains settings for VSCP websocket and other JavaScript examples
//
// The vscpkey is the same key as set in the general/security settings of the
// VSCP server found in /etc/vscp/.vscp.key  It should always be 32 bytes (64 charcater)
// in length and be kept secret.
//
// /vscp/ws1 is websocket interface 1

var settings = {
    user: "admin",
    password: "secret",
    vscpkey: "2DBB079A38985AF00EBEEFE22F9FFA0E7F72DF06EBE44563EDF4A1073CABC7D4"
    url: "ws://localhost:8884/ws1" // Local server
    //url: "ws://192.168.1.9:8884/ws1" // Non SSL (to be able to use from remote machine)
    //url: "wss://192.168.1.9:8843/ws1" // SSL (to be able to use from remote machine)
    //url: "ws://demo.vscp.org:8884/ws1" // Demoserver
};
