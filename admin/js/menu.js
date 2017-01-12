// Menu definition
// Copyright (c) 2016 Ake Hedman
// <akhe@paradiseofthefrog.com>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2017 Grodans Paradis AB (Paradise of the Frog)
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

/*jshint bitwise: false */

/** Create the root namespace and making sure we're not overwriting it */
var navBarMenu = navBarMenu || {};

/* ---------------------------------------------------------------------- */

navBarMenu.content = [
    {
        title: "Home",
        url: "index.html"
    },
    {
        title: "Server",
        url: "#",
        dropDown: [
            {
                title: "Select VSCP server...",
                url: "javascript:setServerModal();"
            },
            {
                title: "Test VSCP server...",
                url: "javascript:doTestConnect();"
            },
   
        ]
    },
    {
        title: "Client",
        url: "#",
        dropDown: [
            {
                title: "Open new client session",
                url: "client.html"
            },
            {
                title: "Open new client session in new window/tab",
                url: "javascript:window.open('client.html');",
            },
        ]
    },
    {
        title: "Maintenance",
        url: "#",
        dropDown: [
            {
                title: "Variables",
                url: "variable.html"
            },
            {
                title: "Decision Matrix",
                url: "dm.html"
            },
            {
                title: "MDF - Module Description Files",
                url: "mdf.html"
            },
            {
                title: "Daemon Configuration",
                url: "configure.html"
            },
            {
                title: "Users",
                url: "users.html"
            },
            {
                title: "Location",
                url: "users.html"
            },
            {
                title: "Drivers",
                url: "users.html"
            },
            {
                title: "Zones",
                url: "users.html"
            },
            {
                title: "GUIDS",
                url: "users.html"
            },
            {
                title: "Drivers",
                url: "users.html"
            },
            {
                title: "MDF cache",
                url: "users.html"
            },
            {
                title: "acl",
                url: "acl.html"
            },
            {
                title: "Server log file viewer",
                url: "logview.html"
            },
        ]
    },
    {
        title: "Device tools",
        url: "#",
        dropDown: [
            {
                title: "Device Session",
                url: "google_gauge.html"
            },
            {
                title: "Device configuration",
                url: "google_line_simple.html"
            },
            {
                title: "Devices scan",
                url: "google_table.html"
            },
            {
                title: "Update device firmware",
                url: "google_table.html"
            }
        ]
    },
    {
        title: "Decision matrix",
        url: "#",
        dropDown: [
            {
                title: "DM",
                url: "dm.html"
            }
        ]
    },
    {
        title: "MDF",
        url: "#",
        dropDown: [
            {
                title: "Get MDF",
                url: "mdf.html"
            },
            {
                title: "Build MDF",
                url: "mdf.html"
            },
            {
                title: "Test MDF wizad",
                url: "mdf.html"
            },
            {
                title: "Test MDF embedded UI",
                url: "mdf.html"
            },
        ]
    },
    {
        title: "Discovery",
        url: "#",
        dropDown: [
            {
                title: "xxxx",
                url: "simpleui.html"
            }
        ]
    },
    {
        title: "Simple UI",
        url: "#",
        dropDown: [
            {
                title: "UI worker",
                url: "simpleui.html"
            }
        ]
    },
    {
        title: "User tables",
        url: "#",
        dropDown: [
            {
                title: "Tables",
                url: "tables.html"
            }
        ]
    },
    {
        title: "Settings",
        url: "#",
        dropDown: [
            {
                title: "REST demo",
                url: "../rest/index.html"
            }
        ]
    }
];
