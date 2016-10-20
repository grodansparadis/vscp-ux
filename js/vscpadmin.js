//
// VSCP javascript websocket library
// Copyright (C) 2012-2016 Ake Hedman, Grodans Paradis AB
// <akhe@grodansparadis.com>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2016 Grodans Paradis AB (Paradise of the Frog)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Alternative licenses for VSCP & Friends may be arranged by contacting
// Grodans Paradis AB at info@grodansparadis.com, http://www.grodansparadis.com
//

// Namespace for all functionality of the VSCP admin libraries.
/*jshint bitwise: false */

/* Create the root namespace and making sure we're not overwriting it */
var vscp = vscp || {};

/* ---------------------------------------------------------------------- */

/**
 * VSCP service supporting functions
 * @namespace vscp.service
 */
vscp._createNS( "vscp.admin" );

/** VSCP response timeout in ms
 * @type {number}
 * @const
 */
vscp.admin.timeout = 5000;

// Admin interface Constants
vscp.admin.config = {
    copyright: 'Copyright &copy; 2000-2016 <a href="http://www.grodansparadis.com">Grodans Paradis AB (Paradise of the Frog)</a>',
    version: "0.0.1",
    // Defaults
    user: "admin",
    password: "secret",
    authdomain: "mydomain.com",
    passwordHash: "d50c3180375c27927c22e42a379c3f67", // Hash on "user:vscptoken:password"
    //url: "ws://192.168.1.9:8080" // Non SSL (to be able to use from remote machine)
    //url: "wss://192.168.1.9:8080" // SSL (to be able to use from remote machine)
    //url: "ws://demo.vscp.org:8080" // Demoserver
    url: "ws://127.0.0.1:8080" // Local server
};


/* ---------------------------------------------------------------------- */

/////////////////////////////////////////////////////////////////////////////////////////////
// vscp.admin.setCopyright
//
// Set copyright in footer
//

vscp.admin.setCopyright = function () {
    document.getElementById("copyright-info").innerHTML =
        "Version: " +
        vscp.admin.config.version +
        " - " +
        vscp.admin.config.copyright;
};

/////////////////////////////////////////////////////////////////////////////////////////////
// vscp.admin.setStatus
//
// Set status text
//

vscp.admin.setStatus = function ( info, bConnected ) {
    if ( bConnected ) {
        document.getElementById("status-footer").innerHTML = "<b>Server:</b> " + info + " - <b>Connected</b>.";
    }
    else {
        document.getElementById("status-footer").innerHTML = "<b>Server:</b> " + info + " - <b>Disonnected</b>.";
    }
};