// VSCP register abstraction model javascript library
// Copyright (c) 2015 Andreas Merkle
// <vscp@blue-andi.de>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2015 Paradise of the Frog/Grodans Paradis AB
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
var vscp = vscp || {};

/** VSCP registers */
vscp.constants.registers = {

    ALARM_STATUS: 128,
    VSCP_VERSION_MAJOR: 129,
    VSCP_VERSION_MINOR: 130,
    NODE_CONTROL_FLAGS: 131,
    USER_ID_0: 132,
    USER_ID_1: 133,
    USER_ID_2: 134,
    USER_ID_3: 135,
    USER_ID_4: 136,
    MANUFACTURER_DEV_ID_0: 137,
    MANUFACTURER_DEV_ID_1: 138,
    MANUFACTURER_DEV_ID_2: 139,
    MANUFACTURER_DEV_ID_3: 140,
    MANUFACTURER_SUB_DEV_ID_0: 141,
    MANUFACTURER_SUB_DEV_ID_1: 142,
    MANUFACTURER_SUB_DEV_ID_2: 143,
    MANUFACTURER_SUB_DEV_ID_3: 144,
    NICKNAME_ID: 145,
    PAGE_SELECT_MSB: 146,
    PAGE_SELECT_LSB: 147,
    FIRMWARE_VERSION_MAJOR: 148,
    FIRMWARE_VERSION_MINOR: 149,
    FIRMWARE_VERSION_SUB_MINOR: 150,
    BOOT_LOADER_ALGORITHM: 151,
    BUFFER_SIZE: 152,
    PAGES_USED: 153,
    STD_DEV_FAMILY_CODE_3: 154,
    STD_DEV_FAMILY_CODE_2: 155,
    STD_DEV_FAMILY_CODE_1: 156,
    STD_DEV_FAMILY_CODE_0: 157,
    STD_DEV_TYPE_3: 158,
    STD_DEV_TYPE_2: 159,
    STD_DEV_TYPE_1: 160,
    STD_DEV_TYPE_0: 161,
    RESTORE_STD_CFG: 162,
    GUID: 208,
    MDF_URL: 224
};

/* ---------------------------------------------------------------------- */

vscp._createNS( "vscp.register" );

/** Register read/write timeout in ms */
vscp.register.timeout = 5000;

/**
 * Read one or more register values.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - page: Register page
 * - offset: Register page offset
 * - count: Number of registers to read
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.read = function( options ) {

    var page            = 0;
    var count           = 1;
    var onError         = null;
    var eventData       = [];
    var eventListener   = null;
    var registerData    = [];
    var timerHandle     = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "number" !== typeof options.offset ) {
        console.error( vscp.utility.getTime() + " Register page offset is missing." );
        return;
    }

    if ( "number" === typeof options.offset ) {
        page = options.page;
    }

    if ( "number" === typeof options.count ) {
        if ( ( 0   > options.count ) ||
             ( 256 < options.count ) ) {
            console.error( vscp.utility.getTime() + " Invalid offset." );
            return;
        }

        if ( 256 === options.count ) {
            count = 0;
        }
        else {
            count = options.count;
        }
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }

    // Event listener to catch all CLASS1.PROTOCOL extended register read responses
    eventListener = function( conn, evt ) {

        var index = 0;

        if ( "undefined" === typeof evt ) {
            return;
        }

        if ( false === ( evt instanceof vscp.Event ) ) {
            return;
        }

        // Only CLASS1.PROTOCOL events are interesting
        if ( vscp.constants.classes.VSCP_CLASS1_PROTOCOL !== evt.vscpClass ) {
            return;
        }

        // Especially the extended register read/write responses
        if ( vscp.constants.types.VSCP_TYPE_PROTOCOL_EXTENDED_PAGE_RESPONSE !== evt.vscpType ) {
            return;
        }

        // Clear timer
        clearTimeout( timerHandle );

        // Copy event data
        for( index = 0; index < ( evt.vscpData.length - 4 ); ++index ) {

            // Avoid a negative count (paranoia check)
            if ( 0 === count ) {
                break;
            }

            registerData.push( evt.vscpData[ 4 + index ] );
            --count;
        }

        // Is register read finished?
        if ( 0 === count ) {
            options.connection.removeEventListener( eventListener );
            options.onSuccess( registerData );
        }
    };

    console.info( vscp.utility.getTime() + " Read " + count + " registers at page " + page + " and offset " + options.offset + " from node " + options.nodeId + "." );

    eventData = [
        options.nodeId,         // Node address
        (page >> 8) & 0x00FF,   // MSB of page where the register is located.
        (page >> 0) & 0x00FF,   // LSB of page where the register is located.
        options.offset,         // Register to read (offset into page).
        count                   // Number of registers to read.
    ];

    options.connection.sendEvent({

        event: new vscp.Event({
            vscpClass:      vscp.constants.classes.VSCP_CLASS1_PROTOCOL,
            vscpType:       vscp.constants.types.VSCP_TYPE_PROTOCOL_EXTENDED_PAGE_READ,
            vscpPriority:   vscp.constants.priorities.PRIORITY_3_NORMAL,
            vscpData:       eventData
        }),

        onSuccess: function( conn ) {
            options.connection.addEventListener( eventListener );

            timerHandle = setTimeout(
                function() {
                    console.info( vscp.utility.getTime() + " Read register timeout." );

                    options.connection.removeEventListener( eventListener );
                    
                    if ( null !== onError ) {
                        onError();
                    }
                },
                vscp.register.timeout
            );
        },

        onError: function( conn ) {
            console.error( vscp.utility.getTime() + " Reading register failed." );

            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Write one or more register values.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - page: Register page
 * - offset: Register page offset
 * - data: Data array
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.write = function( options ) {

    var page            = 0;
    var count           = 0;
    var onError         = null;
    var eventData       = [];
    var eventListener   = null;
    var timerHandle     = null;
    var index           = 0;
    var dataIndex       = 0;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "number" !== typeof options.offset ) {
        console.error( vscp.utility.getTime() + " Register page offset is missing." );
        return;
    }

    if ( "number" === typeof options.offset ) {
        page = options.page;
    }

    if ( false === ( options.data instanceof Array ) ) {
        console.error( vscp.utility.getTime() + " Data is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }

    // Event listener to catch all CLASS1.PROTOCOL extended register write responses
    eventListener = function( conn, evt ) {

        if ( "undefined" === typeof evt ) {
            return;
        }

        if ( false === ( evt instanceof vscp.Event ) ) {
            return;
        }

        // Only CLASS1.PROTOCOL events are interesting
        if ( vscp.constants.classes.VSCP_CLASS1_PROTOCOL !== evt.vscpClass ) {
            return;
        }

        // Especially the extended register read/write responses
        if ( vscp.constants.types.VSCP_TYPE_PROTOCOL_EXTENDED_PAGE_RESPONSE !== evt.vscpType ) {
            return;
        }

        // Clear timer
        clearTimeout( timerHandle );
        timerHandle = null;

        // Is register write finished?
        if ( 0 === count ) {
            options.connection.removeEventListener( eventListener );
            options.onSuccess();
        }
        else {
            console.info( vscp.utility.getTime() + " Write register at page " + page + " and offset " + ( options.offset + dataIndex ) + " to node " + options.nodeId + "." );

            eventData = [
                options.nodeId,             // Node address
                (page >> 8) & 0x00FF,       // MSB of page where the register is located.
                (page >> 0) & 0x00FF,       // LSB of page where the register is located.
                options.offset + dataIndex  // Register to read (offset into page).
            ];

            for( index = 0; index < 4; ++index ) {
                eventData.push( options.data[ dataIndex ] );
                dataIndex++;
                --count;

                if ( 0 === count ) {
                    break;
                }
            }

            options.connection.sendEvent({

                event: new vscp.Event({
                    vscpClass:      vscp.constants.classes.VSCP_CLASS1_PROTOCOL,
                    vscpType:       vscp.constants.types.VSCP_TYPE_PROTOCOL_EXTENDED_PAGE_WRITE,
                    vscpPriority:   vscp.constants.priorities.PRIORITY_3_NORMAL,
                    vscpData:       eventData
                }),

                onSuccess: function( conn ) {

                    timerHandle = setTimeout(
                        function() {
                            console.info( vscp.utility.getTime() + " Write register timeout." );

                            options.connection.removeEventListener( eventListener );
                            
                            if ( null !== onError ) {
                                onError();
                            }
                        },
                        vscp.register.timeout
                    );
                },

                onError: function( conn ) {
                    console.error( vscp.utility.getTime() + " Writing register failed." );

                    options.connection.removeEventListener( eventListener );

                    if ( null !== onError ) {
                        onError();
                    }
                }
            });
        }
    };

    count = options.data.length;

    console.info( vscp.utility.getTime() + " Write register at page " + page + " and offset " + options.offset + " to node " + options.nodeId + "." );

    eventData = [
        options.nodeId,         // Node address
        (page >> 8) & 0x00FF,   // MSB of page where the register is located.
        (page >> 0) & 0x00FF,   // LSB of page where the register is located.
        options.offset          // Register to read (offset into page).
    ];

    for( index = 0; index < 4; ++index ) {
        eventData.push( options.data[ dataIndex ] );
        dataIndex++;
        --count;

        if ( 0 === count ) {
            break;
        }
    }

    options.connection.sendEvent({

        event: new vscp.Event({
            vscpClass:      vscp.constants.classes.VSCP_CLASS1_PROTOCOL,
            vscpType:       vscp.constants.types.VSCP_TYPE_PROTOCOL_EXTENDED_PAGE_WRITE,
            vscpPriority:   vscp.constants.priorities.PRIORITY_3_NORMAL,
            vscpData:       eventData
        }),

        onSuccess: function( conn ) {
            options.connection.addEventListener( eventListener );

            timerHandle = setTimeout(
                function() {
                    console.info( vscp.utility.getTime() + " Write register timeout." );

                    options.connection.removeEventListener( eventListener );

                    if ( null !== onError ) {
                        onError();
                    }
                },
                vscp.register.timeout
            );
        },

        onError: function( conn ) {
            console.error( vscp.utility.getTime() + " Writing register failed." );

            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the alarm status from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readAlarmStatus = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read alarm status from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.ALARM_STATUS,

        count: 1,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the supported VSCP version from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readVscpVersion = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read VSCP version from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.VSCP_VERSION_MAJOR,

        count: 2,

        onSuccess: function( data ) {
            options.onSuccess({
                major: data[ 0 ],
                minor: data[ 1 ]
            });
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the node control flags from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readNodeControlFlags = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read node control flags from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.NODE_CONTROL_FLAGS,

        count: 1,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the user id from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readUserId = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read user id from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.USER_ID_0,

        count: 5,

        onSuccess: function( data ) {
        
            var index   = 0;
            var userId  = 0;
            
            for( index = 0; index < data.length; ++index ) {
                userId *= 256;
                userId += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( userId );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the manufacturer device id from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readManufacturerDevId = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read manufacturer device id from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.MANUFACTURER_DEV_ID_0,

        count: 4,

        onSuccess: function( data ) {
        
            var index               = 0;
            var manufacturerDevId   = 0;
            
            for( index = 0; index < data.length; ++index ) {
                manufacturerDevId *= 256;
                manufacturerDevId += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( manufacturerDevId );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the manufacturer sub device id from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readManufacturerSubDevId = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read manufacturer sub device id from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.MANUFACTURER_SUB_DEV_ID_0,

        count: 4,

        onSuccess: function( data ) {
        
            var index                   = 0;
            var manufacturerSubDevId    = 0;
            
            for( index = 0; index < data.length; ++index ) {
                manufacturerSubDevId *= 256;
                manufacturerSubDevId += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( manufacturerSubDevId );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the nickname id from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readNicknameId = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read nickname id from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.NICKNAME_ID,

        count: 1,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the current selected page from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readSelectedPage = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read selected page from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.PAGE_SELECT_MSB,

        count: 2,

        onSuccess: function( data ) {
        
            var index   = 0;
            var page    = 0;
            
            for( index = 0; index < data.length; ++index ) {
                page *= 256;
                page += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( page );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the firmware version from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readFirmwareVersion = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read firmware version from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.FIRMWARE_VERSION_MAJOR,

        count: 3,

        onSuccess: function( data ) {
            options.onSuccess({
                major: data[ 0 ],
                minor: data[ 1 ],
                subMinor: data[ 2 ]
            });
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the bootloader algorithm from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readBootloaderAlgorithm = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read bootloader algorithm from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.BOOT_LOADER_ALGORITHM,

        count: 1,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the number of used pages from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readUsedPages = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read used pages from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.PAGES_USED,

        count: 1,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the standard device family code from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readStdDevFamCode = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read standard device family code from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.STD_DEV_FAMILY_CODE_0,

        count: 4,

        onSuccess: function( data ) {
            var index               = 0;
            var stdDevFamilyCode    = 0;
            
            for( index = 0; index < data.length; ++index ) {
                stdDevFamilyCode *= 256;
                stdDevFamilyCode += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( stdDevFamilyCode );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the standard device type from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readStdDevType = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read standard device type from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.STD_DEV_TYPE_0,

        count: 4,

        onSuccess: function( data ) {
            var index       = 0;
            var stdDevType  = 0;
            
            for( index = 0; index < data.length; ++index ) {
                stdDevType *= 256;
                stdDevType += data[ data.length - index - 1 ];
            }
        
            options.onSuccess( stdDevType );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the GUID from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readGUID = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read GUID from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.GUID,

        count: 16,

        onSuccess: function( data ) {
            options.onSuccess( data );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};

/**
 * Read the MDF URL from a node.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.register.readMdfUrl = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "number" !== typeof options.nodeId ) {
        console.error( vscp.utility.getTime() + " Node id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    console.info( vscp.utility.getTime() + " Read MDF URL from node " + options.nodeId );

    // Read register
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: 0,

        offset: vscp.constants.registers.MDF_URL,

        count: 32,

        onSuccess: function( data ) {

            var mdfUrl = "http://";

            // Remove all trailing zeros
            while( 0 === data[ data.length - 1] ) {
                data.pop();
            }

            mdfUrl += String.fromCharCode.apply( null, data );

            options.onSuccess( mdfUrl );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });
};
