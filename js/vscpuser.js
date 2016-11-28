//
// VSCP javascript websocket library
// Copyright (C) 2012-2016 Ake Hedman, Grodans Paradis AB
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

/** Namespace for all functionality of the VSCP provided libraries.
 * @namespace vscp
 */
var vscp = vscp || {};

vscp.nusers = 0;
vscp.users = new Array;
vscp.userinfo = new Array;

///////////////////////////////////////////////////////////////////////////////////////////
// fetchUsers
//

vscp.fetchUsers = function ( onSuccessEx, onErrorEx ) {

    var _onSuccess = null;
    var _onError = null;

    if ( "function" === typeof onSuccessEx ) {
        _onSuccess = onSuccessEx;
    }

    if ( "function" !== typeof onErrorEx ) {
        _onError = null;
    }
    else {
        _onError = onErrorEx;
    }

    vscpConn.readVar({
    
        name: "vscp.user.count",

        onSuccess: function( conn, options ) {

            //alert( options.value );
            //vscp.users = options.value.split(',');
            //vscp.users.forEach( function(u) {
            vscp.nusers = options.value;    
            for ( i=0; i<options.value; i++ ) {    

                // Add to edit user drop down
                //$("#dlgedit_userdd").append("<li><a href=\"javascript:$('#dlgedit_owner').val('"
                //                                    + u + "');\">" + u + "</a></li>");
                // Add to add user drop down                            
                //$("#dlgadd_userdd").append("<li><a href=\"javascript:$('#dlgadd_owner').val('"
                //                                    + u + "');\">" + u + "</a></li>");  
                vscpConn.readVar({

                    name: "vscp.user." + i.toString(),
                    idx: i,

                    onSuccess: function( conn, options ) {  

                        // Add to array
                        var items = options.value.split(";");
                        //vscp.guserinfo.push( items );
                        vscp.userinfo.push( items );

                        var dd =  options.name.split("."); 

                        // Signal success when last user is read
                        if ( (vscp.nusers-1) == dd[2] ) {
                            _onSuccess && _onSuccess();
                        }

                    },

                    onError: function( conn ) {
                        _onError && _onError();
                    }
                }); 

            }; // forEach   

            
                                    
        },

        onError: function( conn ) {
            _onError && _onError();
        }
                
    });

    /**
     * Signal success of the current asynchronous operation.
     */
    this.signalSuccessEx = function( onSuccess ) {

        if ( ( "function" === typeof onSuccess ) && ( null !== onSuccess ) ) {
            onSuccess( this );
        }
    };

    /**
     * Signal error of the current asynchronous operation.
     */
    this.signalErrorEx = function( onError ) {

        if ( ( "function" === typeof onError ) && ( null !== onError ) ) {
            onError( this );
        }
    };

};

///////////////////////////////////////////////////////////////////////////////////////////
// getUserFromId
//

vscp.getUserFromId = function( id ) {
    for ( i=0;i<vscp.userinfo.length; i++ ) {     
        console.log( parseInt( vscp.userinfo[i][0] ), id );
        if ( id == parseInt( vscp.userinfo[i][0] ) ) {
            return vscp.userinfo[i][1];
        }
    }

    return "Unknown";
};