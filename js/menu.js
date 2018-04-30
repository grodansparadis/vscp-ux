// Menu definition
// Copyright (c) 2015-2018 Andreas Merkle
// <vscp@blue-andi.de>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2018 Grodans Paradis AB (Paradise of the Frog)
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
        title: "General demos",
        url: "#",
        dropDown: [
            {
                title: "Authentication",
                url: "authentication/authentication.html"
            },
            {
                title: "Control events",
                url: "control_events/control_events.html"
            },
            {
                title: "Button widget demo",
                url: "button_widget/button_widget.html"
            },
            {
                title: "Variables",
                url: "variables/variables.html"
            },
            {
                title: "Node discovery",
                url: "node_discovery/node_discovery.html"
            },
            {
                title: "Slider",
                url: "slider/slider.html"
            },
            {
                title: "Progress bar",
                url: "progress_bar/progress_bar.html"
            },
            {
                title: "Simple text",
                url: "simple_text/simple_text.html"
            },
            {
                title: "Thermometer widget demo",
                url: "thermometer_widget/thermometer_widget.html"
            },
            {
                title: "lm-sensors demo",
                url: "lm_sensors/lm_sensors.html"
            }
        ]
    },
    {
        title: "Epoch chart demos",
        url: "#",
        dropDown: [
            {
                title: "Epoch simple",
                url: "epoch_simple/epoch_simple.html"
            },
            {
                title: "Dynamic table",
                url: "dynamic_table/dynamic_table.html"
            }
        ]
    },
    {
        title: "Google Charts demos",
        url: "#",
        dropDown: [
            {
                title: "Gauge demo",
                url: "google_gauge/google_gauge.html"
            },
            {
                title: "Line chart demo",
                url: "google_line_chart/google_line_chart.html"
            },
            {
                title: "Table demo",
                url: "google_table/google_table.html"
            }
        ]
    },
    {
        title: "REST interface demos",
        url: "#",
        dropDown: [
            {
                title: "REST demo",
                url: "rest/rest.html"
            }
        ]
    }
];
