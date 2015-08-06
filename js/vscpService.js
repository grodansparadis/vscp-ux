// VSCP service javascript library
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

/* ---------------------------------------------------------------------- */

vscp._createNS( "vscp.service" );

/** VSCP response timeout in ms */
vscp.service.timeout = 5000;

/**
 * Request a response from all nodes on the communication bus and returns
 * their GUID and MDF URL.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.service.whoIsThere = function( options ) {

    var onError         = null;
    var eventData       = [];
    var eventListener   = null;
    var timerHandle     = null;
    var nodeData        = [];

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( false === ( options.connection instanceof vscp.Connection ) ) {
        console.error( vscp.utility.getTime() + " VSCP connection object is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }

    // Event listener to catch all CLASS1.PROTOCOL who is there responses
    eventListener = function( conn, evt ) {

        var index           = 0;
        var seqId           = 0;
        var nodeDataIndex   = 0;
        var nodes           = [];
        var current         = "";
        var nodeId          = 0;
        var guid            = [];
        var mdfUrl          = [];

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
        if ( vscp.constants.types.VSCP_TYPE_PROTOCOL_WHO_IS_THERE_RESPONSE !== evt.vscpType ) {
            return;
        }

        // Clear timer
        clearTimeout( timerHandle );
        
        // Store node data
        nodeData.push({
            guid: evt.vscpGuid,
            data: evt.vscpData
        });

        timerHandle = setTimeout(
            function() {
                options.connection.removeEventListener( eventListener );
                
                // Sort data array for GUID and sequence number
                nodeData.sort( function( a, b ) {
                
                    // 1. Sort after GUID
                    if ( a.guid < b.guid ) {
                        return -1;
                    }
                    
                    if ( a.guid > b.guid ) {
                        return 1;
                    }
                    
                    // 2. Sort after sequence number
                    if ( a.data[ 0 ] < b.data[ 0 ] ) {
                        return -1;
                    }
                    
                    if ( a.data[ 0 ] > b.data[ 0 ] ) {
                        return 1;
                    }
                    
                    return 0;
                });
                
                for( nodeDataIndex = 0; nodeDataIndex < nodeData.length; ++nodeDataIndex ) {
                    
                    if ( current !== nodeData[ nodeDataIndex ].guid ) {
                    
                        if ( 0 < nodeDataIndex ) {
                            if ( 7 !== seqId ) {
                                console.warn( vscp.utility.getTime() + " Missing who is there response detected." );
                            }
                        }
                    
                        // Reset
                        seqId = 0;
                        
                        // Next node
                        current = nodeData[ nodeDataIndex ].guid;
                        
                        // Get node id
                        nodeId = parseInt( nodeData[ nodeDataIndex ].guid.split( ":" )[ 15 ] );
                    }
                    
                    // Event missing?
                    if ( seqId !== nodeData[ nodeDataIndex ].data[ 0 ] ) {                        
                        // Throw all other events from this node away until the event comes from another node
                        seqId = -1;
                    }
                    else if ( 0 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        guid = [];
                        for( index = 1; index < 8; ++index ) {
                            guid.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 1 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 8; ++index ) {
                            guid.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 2 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 3; ++index ) {
                            guid.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                        mdfUrl = [];
                        for( index = 3; index < 8; ++index ) {
                            mdfUrl.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 3 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 8; ++index ) {
                            mdfUrl.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 4 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 8; ++index ) {
                            mdfUrl.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 5 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 8; ++index ) {
                            mdfUrl.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                    }
                    else if ( 6 === nodeData[ nodeDataIndex ].data[ 0 ] ) {
                        for( index = 1; index < 7; ++index ) {
                            mdfUrl.push( nodeData[ nodeDataIndex ].data[ index ] );
                        }
                        
                        // Remove all trailing zeros
                        while( 0 === mdfUrl[ mdfUrl.length - 1] ) {
                            mdfUrl.pop();
                        }
                        
                        nodes.push({
                            nodeId: nodeId,
                            guid: guid,
                            mdfUrl: "http://" + String.fromCharCode.apply( null, mdfUrl )
                        });
                    }
                    
                    if ( 0 <= seqId ) {
                        ++seqId;
                    }
                }
                
                console.info( vscp.utility.getTime() + " Found " + nodes.length + " nodes." );
                
                options.onSuccess( nodes );
            },
            vscp.service.timeout
        );
    };

    console.info( vscp.utility.getTime() + " Who is there?" );

    eventData = [
        0xFF    // All nodes shall respond
    ];

    options.connection.sendEvent({

        event: new vscp.Event({
            vscpClass:      vscp.constants.classes.VSCP_CLASS1_PROTOCOL,
            vscpType:       vscp.constants.types.VSCP_TYPE_PROTOCOL_WHO_IS_THERE,
            vscpPriority:   vscp.constants.priorities.PRIORITY_3_NORMAL,
            vscpData:       eventData
        }),

        onSuccess: function( conn ) {
            options.connection.addEventListener( eventListener );

            timerHandle = setTimeout(
                function() {
                    console.info( vscp.utility.getTime() + " Who is there timeout." );

                    options.connection.removeEventListener( eventListener );
                    
                    if ( null !== onError ) {
                        onError();
                    }
                },
                vscp.service.timeout
            );
        },

        onError: function( conn ) {
            console.error( vscp.utility.getTime() + " Who is there failed." );

            if ( null !== onError ) {
                onError();
            }
        }
    });
};
