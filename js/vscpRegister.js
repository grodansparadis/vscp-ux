//
// VSCP register abstraction model javascript library
// Copyright (C) 2012-2015 Ake Hedman, Grodans Paradis AB
// <akhe@grodansparadis.com>
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

    console.info( vscp.utility.getTime() + " Read register at page " + page + " and offset " + options.offset + " from node " + options.nodeId + "." );
    
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
    var registerData    = [];
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
            options.onSuccess( registerData );
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
                    
                    console.debug( "Timer handle = " + timerHandle );
                    
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
