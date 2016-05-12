// Menu definition
// Copyright (c) 2015 Andreas Merkle
// <vscp@blue-andi.de>
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

/*jshint bitwise: false */

/** Create the root namespace and making sure we're not overwriting it */
var navBarMenu = navBarMenu || {};

/* ---------------------------------------------------------------------- */

navBarMenu.content = [
    {
        title: "Home",
        url: "../index.html"
    },
    {
        title: "Widget & general demos",
        url: "#",
        dropDown: [
            {
                title: "Authentication test",
                url: "testauth.html"
            },
            {
                title: "Control events",
                url: "event.html"
            },
            {
                title: "Button widget demo",
                url: "statebutton.html"
            },
            {
                title: "Handle variables",
                url: "variable.html"
            },
            {
                title: "Passive node discovery",
                url: "node_discovery.html"
            },
            {
                title: "Slider demo",
                url: "slider.html"
            },
            {
                title: "Progress bar demo",
                url: "progress.html"
            },
            {
                title: "Simple text demo",
                url: "simpletext.html"
            },
            {
                title: "Thermometer widget demo",
                url: "thermometercelsius.html"
            },
            {
                title: "lm-sensors demo",
                url: "lmsensors.html"
            },
            {
                title: "Dynamic table demo",
                url: "table_dynamic.html"
            }
        ]
    },
    {
        title: "Epoch chart demos",
        url: "#",
        dropDown: [
            {
                title: "Simple demo",
                url: "epoch_simple.html"
            }
        ]
    },
    {
        title: "Google Charts demos",
        url: "#",
        dropDown: [
            {
                title: "Gauge demo",
                url: "google_gauge.html"
            },
            {
                title: "LineChart demo",
                url: "google_line_simple.html"
            },
            {
                title: "Table demo",
                url: "google_table.html"
            }
        ]
    },
    {
        title: "REST interface demos",
        url: "#",
        dropDown: [
            {
                title: "REST demo",
                url: "../rest/index.html"
            }
        ]
    }
];
