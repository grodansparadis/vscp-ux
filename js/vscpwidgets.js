// VSCP widget javascript library
//
// Copyright (c) 2015, 2018 Andreas Merkle
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
/* eslint-env jquery */

/* Create the root namespace and making sure we're not overwriting it */
var vscp = vscp || {};

/* ---------------------------------------------------------------------- */

/**
 * VSCP widgets
 * @namespace vscp.widget
 */
vscp._createNS("vscp.widget");

/** VSCP response timeout in ms
 * @type {number}
 * @const
 */
vscp.widget.timeout = 5000;

/**
 * VSCP images
 * @namespace vscp.widget.images
 */

/**
 * VSCP images of thermometer
 * @namespace vscp.widget.images.thermometer
 */
vscp._createNS("vscp.widget.images.thermometer");

/** Base path of the thermometer images
 * @type {string}
 * @const
 */
vscp.widget.images.thermometer.BASE_PATH = "../lib/widgets/thermometer";

/** Thermometer images
 * @enum {string}
 */
vscp.widget.images.thermometer = [
    vscp.widget.images.thermometer.BASE_PATH + "/thermometer1.png",
    vscp.widget.images.thermometer.BASE_PATH + "/thermometer2.png",
    vscp.widget.images.thermometer.BASE_PATH + "/thermometer3.jpg",
    vscp.widget.images.thermometer.BASE_PATH + "/thermometer4.png"
];

/**
 * Generate a UUID.
 *
 * @return {string} UUID
 */
vscp.widget.generateUUID = function() {

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = (c === 'x') ? r : (r & 0x03 | 0x08);
        return v.toString(16);
    });

    return uuid;
};

/**
 * Add a image to the canvas.
 *
 * @param {object} options              - Options
 * @param {string} options.canvasName   - Name of the canvas, normally the canvas id
 * @param {string} options.url          - Path to the image
 * @param {number} options.x            - x position of the image in the canvas
 * @param {number} options.y            - y position of the image in the canvas
 */
vscp.widget.Image = function(options) {

    this.canvasName = "canvas";
    this.url = "";
    this.x = 0;
    this.y = 0;
    this._id = vscp.widget.generateUUID(); // Id used to identify the layer

    if ("undefined" !== typeof options) {
        if ("string" === typeof options.canvasName) {
            this.canvasName = options.canvasName;
        }
        if ("string" === typeof options.url) {
            this.url = options.url;
        }
        if ("number" === typeof options.x) {
            this.x = options.x;
        }
        if ("number" === typeof options.y) {
            this.y = options.y;
        }
    }

    $(this.canvasName).drawImage({
            name: this._id, // Layer name
            layer: true, // Create layer
            source: this.url, // Image path
            x: this.x, // x position in the canvas
            y: this.y, // y position in the canvas
            fromCenter: false // Coordinates origin is in the upper left corner
        })
        .drawLayers();
};

/**
 * A button widget.
 * @class
 *
 * @param {object} options                      - Options
 * @param {string} options.canvasName           - Name of the canvas, normally the canvas id
 * @param {number} options.offImageUrl          - URL to button which is in off state
 * @param {number} options.onImageUrl           - URL to button which is in on state
 * @param {number} options.x                    - x position of the image in the canvas
 * @param {number} options.y                    - y position of the image in the canvas
 * @param {number} [options.scale]               - Scale factor applied to the button image
 * @param {vscp.Connection} options.connection  - VSCP connection, used for event communication
 * @param {boolean} [options.bindToRemoteState] - Bind the button state to the remote state or not (default: false)
 * @param {number} [options.receiveZone]        - Zone where state events will come from (default: 255)
 * @param {number} [options.receiveSubZone]     - Sub-zone where state events will come from (default: 255)
 * @param {number} [options.transmitZone]       - Zone where button event will be sent to (default: 255)
 * @param {number} [options.transmitSubZone]    - Sub-zone where button event will be sent to (default: 255)
 * @param {number} [options.index]              - Button index (instance number)  (default: 0)
 * @param {boolean} [options.enable]            - Enable or disable button  (default: false)
 */
vscp.widget.Button = function(options) {

    this.canvasName = "canvas"; // Name of the canvas
    this.offImageUrl = ""; // URL to button which is in off state
    this.onImageUrl = ""; // URL to button which is in on state
    this.x = 0; // x-coordinate in the canvas
    this.y = 0; // y-coordinate in the canvas
    this.scale = 1; // Scale factor
    this._isEnabled = true; // Button is enabled or disabled
    this._idOn = vscp.widget.generateUUID(); // Id used to identify the layer
    this._idOff = vscp.widget.generateUUID(); // Id used to identify the layer
    this._idDisabled = vscp.widget.generateUUID(); // Id used to identify the layer

    this.connection = null; // VSCP connection
    this.bindToRemoteState = false; // Button state changes only local
    this.index = 0; // Button index (instance number)
    this.receiveZone = 255; // Zone where state events will come from
    this.receiveSubZone = 255; // Sub-zone where state events will come from
    this.transmitZone = 255; // Zone where button event will be sent to
    this.transmitSubZone = 255; // Sub-zone where button event will be sent to
    this._state = false; // Current button state

    if ("undefined" === typeof(options)) {
        console.error(vscp.utility.getTime() + " Options are missing.");
        return null;
    }

    if ("string" !== typeof options.canvasName) {
        console.error(vscp.utility.getTime() + " Canvas name is missing.");
        return null;
    }

    this.canvasName = options.canvasName;

    if ("string" !== typeof options.offImageUrl) {
        console.error(vscp.utility.getTime() + " Image URL for button in off state is missing.");
        return null;
    }

    this.offImageUrl = options.offImageUrl;

    if ("string" !== typeof options.onImageUrl) {
        console.error(vscp.utility.getTime() + " Image URL for button in on state is missing.");
        return null;
    }

    this.onImageUrl = options.onImageUrl;

    if ("number" !== typeof options.x) {
        console.error(vscp.utility.getTime() + " Image x-coordinate is missing.");
        return null;
    }

    this.x = options.x;

    if ("number" !== typeof options.y) {
        console.error(vscp.utility.getTime() + " Image y-coordinate is missing.");
        return null;
    }

    this.y = options.y;

    if ("number" === typeof options.scale) {
        this.scale = options.scale;
    }

    if ("object" !== typeof options.connection) {
        console.error(vscp.utility.getTime() + " VSCP connection is missing.");
        return null;
    }

    this.connection = options.connection;

    if ("boolean" === typeof options.bindToRemoteState) {
        this.bindToRemoteState = options.bindToRemoteState;
    }

    if ("number" === typeof options.transmitZone) {
        this.transmitZone = options.transmitZone;
    }

    if ("number" === typeof options.transmitSubZone) {
        this.transmitSubZone = options.transmitSubZone;
    }

    if ("number" === typeof options.receiveZone) {
        this.receiveZone = options.receiveZone;
    }

    if ("number" === typeof options.receiveSubZone) {
        this.receiveSubZone = options.receiveSubZone;
    }

    if ("number" === typeof options.index) {
        this.index = options.index;
    }

    if ("boolean" === typeof options.enable) {
        this._isEnabled = options.enable;
    }

    // Event listener for VSCP events
    var eventListener = (function(conn, evt) {

            if ("undefined" === typeof evt) {
                return;
            }

            if (false === (evt instanceof vscp.Event)) {
                return;
            }

            if (false === this.bindToRemoteState) {
                return;
            }

            if (vscp.constants.classes.VSCP_CLASS1_INFORMATION === evt.vscpClass) {

                if (vscp.constants.types.VSCP_TYPE_INFORMATION_ON === evt.vscpType) {

                    // Zone and sub-zone match?
                    if ((this.receiveZone === evt.vscpData[1]) &&
                        (this.receiveSubZone === evt.vscpData[2])) {

                        this._state = true;
                        this.draw();
                    }
                } else if (vscp.constants.types.VSCP_TYPE_INFORMATION_OFF === evt.vscpType) {

                    // Zone and sub-zone match?
                    if ((this.receiveZone === evt.vscpData[1]) &&
                        (this.receiveSubZone === evt.vscpData[2])) {

                        this._state = false;
                        this.draw();
                    }

                }
            }
        })
        .bind(this);

    var onClick = (function(layer) {

        if (null === this.connection) {
            return;
        }

        if (false === this._isEnabled) {
            return;
        }

        if (false === this._state) {

            this.connection.sendEvent({

                event: new vscp.Event({
                    vscpClass: vscp.constants.classes.VSCP_CLASS1_CONTROL,
                    vscpType: vscp.constants.types.VSCP_TYPE_CONTROL_TURNON,
                    vscpPriority: vscp.constants.priorities.PRIORITY_3_NORMAL,
                    vscpData: [
                        this.index,
                        this.transmitZone,
                        this.transmitSubZone
                    ]
                }),

                onSuccess: (function(conn) {
                    if (false === this.bindToRemoteState) {
                        this._state = true;
                        this.draw();
                    }
                }).bind(this)
            });

        } else {

            this.connection.sendEvent({

                event: new vscp.Event({
                    vscpClass: vscp.constants.classes.VSCP_CLASS1_CONTROL,
                    vscpType: vscp.constants.types.VSCP_TYPE_CONTROL_TURNOFF,
                    vscpPriority: vscp.constants.priorities.PRIORITY_3_NORMAL,
                    vscpData: [
                        this.index,
                        this.transmitZone,
                        this.transmitSubZone
                    ]
                }),

                onSuccess: (function(conn) {
                    if (false === this.bindToRemoteState) {
                        this._state = false;
                        this.draw();
                    }
                }).bind(this)
            });

        }
    }).bind(this);

    // Register the VSCP event handler
    if ((null !== this.connection) &&
        (true === this.bindToRemoteState)) {
        this.connection.addEventListener(eventListener);
    }

    /* Create
     * - one layer with the button in off state
     * - one layer with the button in on state
     * - one layer with the disabled sign
     */
    $(this.canvasName)
        .drawImage({
            name: this._idOff,
            source: this.offImageUrl,
            layer: true,
            x: this.x,
            y: this.y,
            scale: this.scale,
            click: onClick,
            visible: true
        })
        .drawImage({
            name: this._idOn,
            source: this.onImageUrl,
            layer: true,
            x: this.x,
            y: this.y,
            scale: this.scale,
            click: onClick,
            visible: false
        })
        .addLayer({
            type: 'function',
            name: this._idDisabled,
            fn: (function(ctx) {

                var imageWidth = $(this.canvasName).getLayer(this._idOff).width * this.scale;
                var imageHeight = $(this.canvasName).getLayer(this._idOff).height * this.scale;

                $(this.canvasName)
                    .drawLine({
                        strokeStyle: '#f00',
                        strokeWidth: 2,
                        x1: (this.x - imageWidth / 2),
                        y1: (this.y - imageHeight / 2),
                        x2: (this.x + imageWidth / 2),
                        y2: (this.y + imageHeight / 2)
                    })
                    .drawLine({
                        strokeStyle: '#f00',
                        strokeWidth: 2,
                        x1: (this.x - imageWidth / 2),
                        y1: (this.y + imageHeight / 2),
                        x2: (this.x + imageWidth / 2),
                        y2: (this.y - imageHeight / 2)
                    });
            }).bind(this),
            visible: true
        });

    this.draw();
};

/**
 * Draw the button depended on its current state.
 */
vscp.widget.Button.prototype.draw = function() {

    if (false === this._isEnabled) {
        $(this.canvasName).getLayer(this._idOff).visible = true;
        $(this.canvasName).getLayer(this._idOn).visible = false;
        $(this.canvasName).getLayer(this._idDisabled).visible = true;
    } else if (false === this._state) {
        $(this.canvasName).getLayer(this._idOff).visible = true;
        $(this.canvasName).getLayer(this._idOn).visible = false;
        $(this.canvasName).getLayer(this._idDisabled).visible = false;
    } else {
        $(this.canvasName).getLayer(this._idOff).visible = false;
        $(this.canvasName).getLayer(this._idOn).visible = true;
        $(this.canvasName).getLayer(this._idDisabled).visible = false;
    }

    $(this.canvasName).drawLayers();
};

/**
 * Enable or disable the button.
 *
 * @param {boolean} value - Enable (true) or disable (false) it
 */
vscp.widget.Button.prototype.setEnabled = function(value) {

    if ("boolean" !== typeof value) {
        return;
    }

    this._isEnabled = value;
    this.draw();
};

/**
 * A thermometer widget.
 * @class
 *
 * @param {object} options                      - Options
 * @param {string} options.canvasName           - Name of the canvas, normally the canvas id
 * @param {number} options.type                 - Thermometer type, see vscp.widget.images.thermometer
 * @param {number} options.x                    - x position of the image in the canvas
 * @param {number} options.y                    - y position of the image in the canvas
 * @param {number} options.scale                - Scale factor applied to the thermometer image
 * @param {vscp.Connection} options.connection  - VSCP connection, used for event communication
 * @param {number} options.receiveZone          - Zone where state events will come from
 * @param {number} options.receiveSubZone       - Sub-zone where state events will come from
 * @param {number} options.sensorIndex          - Sensor index
 * @param {number} options.vscpClass            - VSCP measurement class
 * @param {number} options.vscpType             - VSCP measurement type
 * @param {boolean} options.enable              - Enable or disable button
 */
vscp.widget.Thermometer = function(options) {

    this.canvasName = "canvas"; // Name of the canvas
    this.type = 0; // Widget type, see images
    this.x = 0; // x-coordinate in the canvas
    this.y = 0; // y-coordinate in the canvas
    this.scale = 1; // Scale factor
    this._isEnabled = true; // Widget is enabled or disabled
    this._idThermometer = vscp.widget.generateUUID(); // Id used to identify the layer
    this._idDisabled = vscp.widget.generateUUID(); // Id used to identify the layer
    this._idData = vscp.widget.generateUUID(); // Id used to identify the layer
    this._temperature = 0; // Temperature

    this.connection = null; // VSCP connection
    this.decoder = null; // VSCP measurement decoder
    this.sensorIndex = -1; // Sensor index (instance number)
    this.vscpClass = vscp.constants.classes.VSCP_CLASS1_MEASUREMENT; // Measurement class
    this.vscpType = vscp.constants.types.VSCP_TYPE_MEASUREMENT_TEMPERATURE; // Measurement type
    this.receiveZone = 255; // Zone where state events will come from
    this.receiveSubZone = 255; // Sub-zone where state events will come from

    if ("undefined" !== typeof options) {

        if ("string" === typeof options.canvasName) {
            this.canvasName = options.canvasName;
        }

        if ("number" === typeof options.type) {
            if ((0 > options.type) || (vscp.widget.images.thermometer.length <= options.type)) {
                console.error(vscp.utility.getTime() + " Thermometer type " + options.type + " unknown.");
            } else {
                this.type = options.type;
            }
        }

        if ("number" === typeof options.x) {
            this.x = options.x;
        }

        if ("number" === typeof options.y) {
            this.y = options.y;
        }

        if ("number" === typeof options.scale) {
            this.scale = options.scale;
        }

        if ("object" === typeof options.connection) {
            this.connection = options.connection;
        }

        if ("number" === typeof options.receiveZone) {
            this.receiveZone = options.receiveZone;
        }

        if ("number" === typeof options.receiveSubZone) {
            this.receiveSubZone = options.receiveSubZone;
        }

        if ("number" === typeof options.sensorIndex) {
            this.sensorIndex = options.sensorIndex;
        }

        if ("number" === typeof options.vscpClass) {
            this.vscpClass = options.vscpClass;
        }

        if ("number" === typeof options.vscpType) {
            this.vscpType = options.vscpType;
        }

        if ("boolean" === typeof options.enable) {
            this._isEnabled = options.enable;
        }
    }

    var onValue = function(measurement) {

        var value = 0;

        if ("undefined" === measurement) {
            return;
        }

        // Temperature in degree Celsius expected
        switch (measurement.unitId) {

            // Kelvin
            case 0:
                value = vscp.measurement.convertKelvinToCelsius(measurement.value);
                break;

                // Celsius
            case 1:
                value = measurement.value;
                break;

                // Fahrenheit
            case 2:
                value = vscp.measurement.convertFahrenheitToCelsius(measurement.value);
                break;

                // Should never happen
            default:
                break;
        }

        value = vscp.measurement.toFixed(value, 1);

        this._temperature = value;
        this.draw();

    }.bind(this);

    // Create a VSCP measurement event decoder
    this.decoder = new vscp.measurement.Decoder({
        connection: this.connection,
        onValue: onValue,
        filter: {
            vscpClass: this.vscpClass,
            vscpType: this.vscpType,
            sensorIndex: this.sensorIndex
        }
    });

    /* Create
     * - one layer with the thermometer
     * - one layer with the disabled sign
     */
    $(this.canvasName)
        .drawImage({
            name: this._idThermometer,
            source: vscp.widget.images.thermometer[this.type],
            layer: true,
            x: this.x,
            y: this.y,
            scale: this.scale,
            visible: true
        })
        .addLayer({
            type: 'function',
            name: this._idDisabled,
            fn: (function(ctx) {

                var imageWidth = $(this.canvasName).getLayer(this._idThermometer).width * this.scale;
                var imageHeight = $(this.canvasName).getLayer(this._idThermometer).height * this.scale;

                $(this.canvasName)
                    .drawLine({
                        strokeStyle: '#f00',
                        strokeWidth: 2,
                        x1: (this.x - imageWidth / 2),
                        y1: (this.y - imageHeight / 2),
                        x2: (this.x + imageWidth / 2),
                        y2: (this.y + imageHeight / 2)
                    })
                    .drawLine({
                        strokeStyle: '#f00',
                        strokeWidth: 2,
                        x1: (this.x - imageWidth / 2),
                        y1: (this.y + imageHeight / 2),
                        x2: (this.x + imageWidth / 2),
                        y2: (this.y - imageHeight / 2)
                    });
            }).bind(this),
            visible: true
        })
        .addLayer({
            type: 'function',
            name: this._idData,
            fn: (function(ctx) {

                var imageWidth = $(this.canvasName).getLayer(this._idThermometer).width * this.scale;
                var imageHeight = $(this.canvasName).getLayer(this._idThermometer).height * this.scale;

                var thermometerData = null;

                if ((0 === this.type) ||
                    (2 === this.type)) {
                    thermometerData = {
                        maxT: 35,
                        minT: -25,
                        x: 26,
                        y: 191,
                        height: 181,
                        width: 7,
                        yOffset: 5,
                        color: '#8A0000'
                    };
                } else if (1 === this.type) {
                    thermometerData = {
                        maxT: 42,
                        minT: -34,
                        x: 36,
                        y: 240,
                        height: 231,
                        width: 10,
                        yOffset: 0,
                        color: '#FF0000'
                    };
                } else if (3 === this.type) {
                    thermometerData = {
                        maxT: 55,
                        minT: -20,
                        x: 32,
                        y: 161,
                        height: 142,
                        width: 8,
                        yOffset: 2,
                        color: '#FF0000'
                    };
                }

                var maxDeltaT = thermometerData.maxT - thermometerData.minT;
                var realX = thermometerData.x * this.scale;
                var realY = thermometerData.y * this.scale;
                var realHeight = thermometerData.height * this.scale;
                var realWidth = thermometerData.width * this.scale;
                var realYOffset = thermometerData.yOffset * this.scale;
                var temperature = this._temperature;

                if (thermometerData.maxT < temperature) {
                    temperature = thermometerData.maxT;
                } else if (thermometerData.minT > this._temperature) {
                    temperature = thermometerData.minT;
                }

                var t = (temperature - thermometerData.minT) * realHeight / maxDeltaT;

                $(this.canvasName)
                    .drawRect({
                        fillStyle: thermometerData.color,
                        x: (this.x - imageWidth / 2) + realX,
                        y: (this.y - imageHeight / 2) + realY,
                        width: realWidth,
                        height: -realYOffset - t,
                        fromCenter: false
                    });
            }).bind(this),
            visible: true
        });

    this.draw();
};

/**
 * Draw the thermometer depended on its current state.
 */
vscp.widget.Thermometer.prototype.draw = function() {

    if (false === this._isEnabled) {
        $(this.canvasName).getLayer(this._idThermometer).visible = true;
        $(this.canvasName).getLayer(this._idData).visible = false;
        $(this.canvasName).getLayer(this._idDisabled).visible = true;
    } else {
        $(this.canvasName).getLayer(this._idThermometer).visible = true;
        $(this.canvasName).getLayer(this._idData).visible = true;
        $(this.canvasName).getLayer(this._idDisabled).visible = false;
    }

    $(this.canvasName).drawLayers();
};

/**
 * Enable or disable the thermometer.
 *
 * @param {boolean} value - Enable (true) or disable (false) it
 */
vscp.widget.Thermometer.prototype.setEnabled = function(value) {

    if ("boolean" !== typeof value) {
        return;
    }

    this._isEnabled = value;
    this.draw();
};