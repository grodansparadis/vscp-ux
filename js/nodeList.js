// Node list handling.
//
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

var nodeList = (function() {

    var connection = null;  // VSCP connection
    var container  = null;  // Container for the node list
    
    function init( options ) {

        if ( "undefined" === typeof options ) {
            return;
        }
        
        if ( true === ( options.connection instanceof vscp.Connection ) ) {
            connection = options.connection;
            
            // Create node list container
            container = new vscp.service.Container({
                connection: connection,
                name: "nodeList"
            });
            
            // Fill the node list container
            container.read({
            
                onSuccess: options.onSuccess,
                
                onError: function() {
                    // Node list doesn't exists, create a empty one
                    container.create({
                        onSuccess: options.onSuccess,
                        onError: options.onError
                    });
                }
            });
        }
    }
    
    function get() {
        return container.data;
    }
    
    function set( options ) {
    
        if ( "undefined" === typeof options ) {
            return;
        }
        
        if ( false === ( options.guids instanceof Array ) ) {
            return;
        }
        
        container.data = options.guids;
    }
    
    function append( options ) {
        
        if ( "undefined" === typeof options ) {
            return;
        }
        
        if ( "string" !== typeof options.guid ) {
            return;
        }
        
        container.data.push( options.guid );
    }
    
    function clear() {
        
        container.data = [];
    }
    
    function write( options ) {
        
        if ( "undefined" === typeof options ) {
            return;
        }
        
        container.write({
            onSuccess: options.onSuccess,
            onError: options.onError
        });
    }
    
    return {
        init: init,
        get: get,
        set: set,
        append: append,
        clear: clear,
        write: write
    };
    
})();
