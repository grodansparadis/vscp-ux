// settings.js
// ===========
// This file contains settings for VSCP websocket and other JavaScript examples
//

var settings = {

    user: "admin",
    password: "secret",
    vscptoken: "Stay Hungry. Stay Foolish.",
    passwordHash: "6f3bd42ff3cce26016a7251d7c897594", // Hash on "user:authdomain:password"
    //url: "ws://192.168.1.9:8080" // Non SSL (to be able to use from remote machine)
    //url: "wss://192.168.1.9:8080" // SSL (to be able to use from remote machine)
    //url: "ws://demo.vscp.org:8080" // Demoserver
    url: "ws://127.0.0.1:8080" // Local server
};
