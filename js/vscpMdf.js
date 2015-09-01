// VSCP MDF javascript library
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

vscp._createNS( "vscp.mdf" );

/** VSCP response timeout in ms */
vscp.mdf.timeout = 5000;

vscp._createNS( "vscp.mdf.constants" );

/** MDF specific constants */
vscp.mdf.constants = {

    TYPE_SIZES: {
        "string": 0,
        "bitfield": 1,
        "bool": 1,
        "int8_t": 1,
        "uint8_t": 1,
        "int16_t": 2,
        "uint16_t": 2,
        "int32_t": 4,
        "uint32_t": 4,
        "int64_t": 8,
        "uint64_t": 8,
        "float": 4,
        "double": 8,
        "date": 4,
        "time": 4,
        "guid": 16,
        "char": 1,
        "byte": 1,
        "short": 2,
        "integer": 2,
        "long": 4
    },

    CONVERSION_FROM_DECIMAL: {
        "string": function( data ) {
            return String.fromCharCode.apply( null, data );
        },
        "bitfield": function( data ) {
            return data[ 0 ];
        },
        "bool": function( data ) {
            return ( "false" === data[ 0 ] ) ? false : true;
        },
        "int8_t": function( data ) {
            return ( 128 <= data[ 0 ] ) ? ( ( 256 - data[ 0 ] ) * -1 ) : data[ 0 ];
        },
        "uint8_t": function( data ) {
            return data[ 0 ];
        },
        "int16_t": function( data ) {
            var index   = 0;
            var value   = 0;
            var bSign   = false;

            if ( data[ 0 ] & 0x80 ) {
                bSign = true;

                for( index = 0; index < data.length; ++index ) {
                    data[ index ] ^= 0xFF;
                }
            }

            for( index = 0; index < data.length; ++index ) {
                value <<= 8;
                value += data[ index ];
            }

            if ( true === bSign ) {
                value = ( value + 1 ) * -1;
            }

            return value;
        },
        "uint16_t": function( data ) {
            var index = 0;
            var value = 0;

            for( index = 0; index < data.length; ++index ) {
                value <<= 8;
                value += data[ index ];
            }

            return value;
        },
        "int32_t": function( data ) {
            var index   = 0;
            var value   = 0;
            var bSign   = false;

            if ( data[ 0 ] & 0x80 ) {
                bSign = true;

                for( index = 0; index < data.length; ++index ) {
                    data[ index ] ^= 0xFF;
                }
            }

            for( index = 0; index < data.length; ++index ) {
                value <<= 8;
                value += data[ index ];
            }

            if ( true === bSign ) {
                value = ( value + 1 ) * -1;
            }

            return value;
        },
        "uint32_t": function( data ) {
            var index = 0;
            var value = 0;

            for( index = 0; index < data.length; ++index ) {
                value <<= 8;
                value += data[ index ];
            }

            return value;
        },
        "int64_t": function( data ) {
            // Javascript doesn't support signed 64 bit integer.
            // All numbers in javascript are 64 bit "double" precision IEE754 floating point.
            // The largest positive whole number that can therefore be accurately represented is 2^53
            return 0;
        },
        "uint64_t": function( data ) {
            // Javascript doesn't support signed 64 bit integer.
            // All numbers in javascript are 64 bit "double" precision IEE754 floating point.
            // The largest positive whole number that can therefore be accurately represented is 2^53
            return 0;
        },
        "float": function( data ) {
            var signValue       = 1;
            var exponent        = 0;
            var mantissa        = 0;
            var integral        = 0;
            var fractional      = 0;
            var value           = 0.0;
            var index           = 0;
            var mask            = 0;
            var powerOf2        = 1;
            var exponentSign    = false;

            //  1 bit sign
            //  8 bit exponent
            // 23 bit mantissa

            // Get sign
            if ( 0 < ( data[ 0 ] & 0x80 ) ) {
                signValue = -1;
            }

            exponent  = ( data[ 0 ] & 0x7F ) << 1;
            exponent += ( data[ 1 ] & 0x80 ) >> 7;
            exponent -= 127;    // Remove bias

            if ( 0 > exponent ) {
                exponent *= -1;
                exponentSign = true;
            }

            mantissa = data[ 1 ] & 0x7F;
            mantissa *= 256;
            mantissa += data[ 2 ];
            mantissa *= 256;
            mantissa += data[ 3 ];

            fractional = 0;
            mask = 0x00400000 >>> 0;
            powerOf2 = 1;

            if ( false === exponentSign ) {
                integral = 1;
            }
            else {
                integral = 0;
            }

            for( index = 0; index < exponent; ++index) {
                if ( false === exponentSign ) {
                    integral *= 2;  // integral <<= 1;

                    if ( 0 !== ( mantissa & mask ) ) {
                        integral += 1;
                    }

                    mask = Math.trunc( mask / 2 );  // mask >>= 1
                }
                else {
                    powerOf2 *= 2;  // powerOf2 <<= 1;
                }
            }

            if ( true === exponentSign ) {
                index = 0;
                fractional = 1.0 / powerOf2;
            }

            for( index = index; index < 23; ++index ) {
                powerOf2 *= 2;  // powerOf2 <<= 1;

                if ( 0 !== ( mantissa & mask ) ) {
                    fractional += 1.0 / powerOf2;
                }

                mask = Math.trunc( mask / 2 );  // mask >>= 1
            }

            value = signValue * ( integral + fractional );

            return value;
        },
        "double": function( data ) {
            var signValue       = 1;
            var exponent        = 0;
            var mantissaMsb     = 0;
            var mantissaLsb     = 0;
            var integral        = 0;
            var fractional      = 0;
            var value           = 0.0;
            var index           = 0;
            var maskMsb         = 0;
            var maskLsb         = 0;
            var powerOf2        = 1;
            var exponentSign    = false;

            //  1 bit sign
            // 11 bit exponent
            // 52 bit mantissa

            // Get sign
            if ( 0 < ( data[ 0 ] & 0x80 ) ) {
                signValue = -1;
            }

            exponent  = ( data[ 0 ] & 0x7F ) << 4;
            exponent += ( data[ 1 ] & 0xF0 ) >> 4;
            exponent -= 1023;   // Remove bias

            if ( 0 > exponent ) {
                exponent *= -1;
                exponentSign = true;
            }

            mantissaMsb = data[ 1 ] & 0x0F;
            mantissaMsb *= 256;
            mantissaMsb += data[ 2 ];
            mantissaMsb *= 256;
            mantissaMsb += data[ 3 ];

            mantissaLsb += data[ 4 ];
            mantissaLsb *= 256;
            mantissaLsb += data[ 5 ];
            mantissaLsb *= 256;
            mantissaLsb += data[ 6 ];
            mantissaLsb *= 256;
            mantissaLsb += data[ 7 ];

            fractional = 0;
            maskMsb = 0x00080000 >>> 0;
            maskLsb = 0x80000000 >>> 0;
            powerOf2 = 1;

            if ( false === exponentSign ) {
                integral = 1;
            }
            else {
                integral = 0;
            }

            for( index = 0; index < exponent; ++index) {
                if ( false === exponentSign ) {
                    integral *= 2;  // integral <<= 1;

                    if ( 0 < maskMsb ) {
                        if ( 0 !== ( mantissaMsb & maskMsb ) ) {
                            integral += 1;  // integral |= 1;
                        }

                        maskMsb = Math.trunc( maskMsb / 2 );  // maskMsb >>= 1
                    }
                    else {
                        if ( 0 !== ( mantissaLsb & maskLsb ) ) {
                            integral += 1;  // integral |= 1;
                        }

                        maskLsb = Math.trunc( maskLsb / 2 );  // maskLsb >>= 1
                    }
                }
                else {
                    powerOf2 *= 2;
                }
            }

            if ( true === exponentSign ) {
                index = 0;
                fractional = 1.0 / powerOf2;
            }

            for( index = index; index < 52; ++index ) {
                powerOf2 *= 2;  // powerOf2 <<= 1;

                if ( 0 < maskMsb ) {
                    if ( 0 !== ( mantissaMsb & maskMsb ) ) {
                        fractional += 1.0 / powerOf2;
                    }

                    maskMsb = Math.trunc( maskMsb / 2 );  // maskMsb >>= 1
                }
                else {
                    if ( 0 !== ( mantissaLsb & maskLsb ) ) {
                        fractional += 1.0 / powerOf2;
                    }

                    maskLsb = Math.trunc( maskLsb / 2 );  // maskLsb >>= 1
                }
            }

            value = signValue * ( integral + fractional );

            return value;
        },
        "date": function( data ) {
            // yy yy mm dd
            var day     = data[ 3 ];
            var month   = data[ 2 ];
            var year    = data[ 0 ] * 256 + data[ 1 ];

            return "" + day + "-" + month + "-" + year;
        },
        "time": function( data ) {
            // hh mm ss
            var hours   = data[ 0 ];
            var minutes = data[ 1 ];
            var seconds = data[ 2 ];

            return "" + hours + ":" + minutes + ":" + seconds;
        },
        "guid": function( data ) {
            return data;
        },
        "char": function( data ) {
            return vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ "int8_t" ]( data );
        },
        "byte": function( data ) {
            return vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ "int8_t" ]( data );
        },
        "short": function( data ) {
            return vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ "int16_t" ]( data );
        },
        "integer": function( data ) {
            return vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ "int16_t" ]( data );
        },
        "long": function( data ) {
            return vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ "int32_t" ]( data );
        }
    },

    CONVERSION_TO_DECIMAL: {
        "string": function( data ) {
            var dataArray   = [];
            var index       = 0;

            for( index = 0; index < data.length; ++index ) {
                dataArray.push( data[ index ] );
            }

            return dataArray;
        },
        "bitfield": function( data ) {
            return [ data ];
        },
        "bool": function( data ) {
            var dataArray   = [];

            if ( false === data ) {
                dataArray.push( 0 );
            }
            else {
                dataArray.push( 1 );
            }

            return dataArray;
        },
        "int8_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 127 < data ) {
                data = 127;
            }
            else if ( -128 > data ) {
                data = -128;
            }

            if ( 0 > data ) {
                dataArray.push( 256 - ( data * -1 ) );
            }
            else {
                dataArray.push( data );
            }

            return dataArray;
        },
        "uint8_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 255 < data ) {
                data = 255;
            }
            else if ( 0 > data ) {
                data = 0;
            }

            dataArray.push( data );

            return dataArray;
        },
        "int16_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 32766 < data ) {
                data = 32766;
            }
            else if ( -32767 > data ) {
                data = -32767;
            }

            if ( 0 > data ) {
                data = 65536 - ( data * -1 );
            }

            dataArray.push( ( data >> 8 ) & 0xFF );
            dataArray.push( ( data >> 0 ) & 0xFF );

            return dataArray;
        },
        "uint16_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 65535 < data ) {
                data = 65535;
            }
            else if ( 0 > data ) {
                data = 0;
            }

            dataArray.push( ( data >> 8 ) & 0xFF );
            dataArray.push( ( data >> 0 ) & 0xFF );

            return dataArray;
        },
        "int32_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 2147483646 < data ) {
                data = 2147483646;
            }
            else if ( -2147483647 > data ) {
                data = -2147483647;
            }

            if ( 0 > data ) {
                data = 4294967296 - ( data * -1 );
            }

            dataArray.push( ( data >> 24 ) & 0xFF );
            dataArray.push( ( data >> 16 ) & 0xFF );
            dataArray.push( ( data >>  8 ) & 0xFF );
            dataArray.push( ( data >>  0 ) & 0xFF );

            return dataArray;
        },
        "uint32_t": function( data ) {
            var dataArray   = [];

            // Check for limits
            if ( 4294967295 < data ) {
                data = 4294967295;
            }
            else if ( 0 > data ) {
                data = 0;
            }

            dataArray.push( ( data >> 24 ) & 0xFF );
            dataArray.push( ( data >> 16 ) & 0xFF );
            dataArray.push( ( data >>  8 ) & 0xFF );
            dataArray.push( ( data >>  0 ) & 0xFF );

            return dataArray;
        },
        "int64_t": function( data ) {
            // Javascript doesn't support signed 64 bit integer.
            // All numbers in javascript are 64 bit "double" precision IEE754 floating point.
            // The largest positive whole number that can therefore be accurately represented is 2^53
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        },
        "uint64_t": function( data ) {
            // Javascript doesn't support signed 64 bit integer.
            // All numbers in javascript are 64 bit "double" precision IEE754 floating point.
            // The largest positive whole number that can therefore be accurately represented is 2^53
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        },
        "float": function( data ) {

            //  1 bit sign
            //  8 bit exponent
            // 23 bit mantissa

            // TODO

            return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
        },
        "double": function( data ) {

            //  1 bit sign
            // 11 bit exponent
            // 52 bit mantissa

            // TODO

            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        },
        "date": function( data ) {
            var dataArray   = [];
            var items       = data.split( "-" );

            // yy yy mm dd
            var day     = parseInt( items[ 0 ] );
            var month   = parseInt( items[ 1 ] );
            var year    = parseInt( items[ 2 ] );

            dataArray.push( ( year >> 8 ) & 0xFF );
            dataArray.push( ( year >> 0 ) & 0xFF );
            dataArray.push( month & 0xFF );
            dataArray.push( day & 0xFF );

            return dataArray;
        },
        "time": function( data ) {
            var dataArray   = [];
            var items       = data.split( ":" );

            // hh mm ss
            var hours   = parseInt( items[ 0 ] );
            var minutes = parseInt( items[ 1 ] );
            var seconds = parseInt( items[ 2 ] );

            dataArray.push( hours & 0xFF );
            dataArray.push( minutes & 0xFF );
            dataArray.push( seconds & 0xFF );

            return dataArray;
        },
        "guid": function( data ) {
            return data;
        },
        "char": function( data ) {
            return vscp.mdf.constants.CONVERSION_TO_DECIMAL[ "int8_t" ]( data );
        },
        "byte": function( data ) {
            return vscp.mdf.constants.CONVERSION_TO_DECIMAL[ "int8_t" ]( data );
        },
        "short": function( data ) {
            return vscp.mdf.constants.CONVERSION_TO_DECIMAL[ "int16_t" ]( data );
        },
        "integer": function( data ) {
            return vscp.mdf.constants.CONVERSION_TO_DECIMAL[ "int16_t" ]( data );
        },
        "long": function( data ) {
            return vscp.mdf.constants.CONVERSION_TO_DECIMAL[ "int32_t" ]( data );
        }
    }

};

/**
 * Check for deep key in a object.
 *
 * @param[in] object Object
 * @param[in] properties Path as string or array
 *
 * @return If the key exists, it will return true otherwise false.
 */
vscp.mdf.isSafeObjectPath = function( object, properties ) {
    var path    = [];
    var root    = object;
    var prop;

    if ( !root ) {
        // if the root object is null we immediately returns
        return false;
    }

    if ( typeof properties === 'string' ) {
        // if a string such as 'foo.bar.baz' is passed,
        // first we convert it into an array of property names
        path = properties ? properties.split('.') : [];
    } else {
        if ( Object.prototype.toString.call( properties ) === '[object Array]' ) {
            // if an array is passed, we don't need to do anything but
            // to assign it to the internal array
            path = properties;
        } else {
            if ( properties ) {
                // if not a string or an array is passed, and the parameter
                // is not null or undefined, we return with false
                return false;
            }
        }
    }

    // if the path is valid or empty we return with true (because the
    // root object is itself a valid path); otherwise false is returned.
    while ( prop = path.shift() ) {
        // Before it was used an if..else statement only, but it
        // could generate an exception in case of inexistent
        // object member. We can fix it using a try..catch
        // statement. Thanks to @xecute for the contribution!
        try {
            if ( prop in root ) {
                root = root[ prop ];
            } else {
                return false;
            }
        } catch(e) {
            return false;
        }
    }

    return true;
}

/**
 * Get the MDF of a node as javascript object.
 *
 * @param[in] options   Options
 *
 * Options:
 * - url: MDF URL
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.mdf.get = function( options ) {

    var onError = null;

    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing. " );
        return;
    }

    if ( "string" !== typeof options.url ) {
        console.error( vscp.utility.getTime() + " MDF URL is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }

    console.info( vscp.utility.getTime() + " Load MDF from URL " + options.url );

    $.ajax({

        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: "get",

        // The URL to make the request to.
        url: options.url,

        // The 'contentType' property sets the 'Content-Type' header.
        // The jquery default for this property is
        // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
        // a preflight. If you set this value to anything other than
        // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
        // you will trigger a preflight request.
        contentType: "text/plain",

        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        xhrFields: {
            withCredentials: false
        },

        // Set any custom headers here.
        // If you set any non-simple headers, your server must include these
        // headers in the 'Access-Control-Allow-Headers' response header.
        headers: {
        },

        success: function( xml ) {
            var jsonObj = $.xml2json( xml ); // Convert XML to JSON object

            options.onSuccess( jsonObj );
        },

        error: function() {

            if ( null !== onError ) {
                onError();
            }
        }

    });

};

/**
 * Read a abstract value.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - mdf: MDF object
 * - id: Abstraction id
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.mdf.readAbstractValue = function( options ) {

    var onError         = null;
    var index           = 0;
    var page            = 0;
    var offset          = 0;
    var type            = "";
    var size            = 0;
    var abstraction     = null;
    var convFunc        = null;
    var abstractions    = [];

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

    if ( "object" !== typeof options.mdf ) {
        console.error( vscp.utility.getTime() + " MDF object is missing." );
        return;
    }

    if ( "string" !== typeof options.id ) {
        console.error( vscp.utility.getTime() + " Abstraction id is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    if ( false === vscp.mdf.isSafeObjectPath( options, "mdf.vscp.module.abstractions.abstraction" ) ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    
    if ( false === ( options.mdf.vscp.module.abstractions.abstraction instanceof Array ) ) {
        abstractions.push( options.mdf.vscp.module.abstractions.abstraction );
    }
    else {
        abstractions = options.mdf.vscp.module.abstractions.abstraction;
    }
    
    if ( 0 === abstractions.length ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    for( index = 0; index < abstractions.length; ++index ) {
        if ( options.id === abstractions[ index ].id ) {
            abstraction = abstractions[ index ];
            break;
        }
    }

    if ( null === abstraction ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    if ( "undefined" === typeof abstraction.page ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " page is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        page = parseInt( abstraction.page );
    }

    if ( "undefined" === typeof abstraction.offset ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " offset is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        offset = parseInt( abstraction.offset );
    }

    if ( "undefined" === typeof abstraction.type ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " type is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        type = abstraction.type;
    }

    if ( "string" === type ) {

        if ( "undefined" === typeof abstraction.size ) {
            console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " size is missing." );

            if ( null !== onError ) {
                onError();
            }

            return;
        }

        size = parseInt( abstraction.size );
    }
    else {
        size = vscp.mdf.constants.TYPE_SIZES[ type ];
    }

    convFunc = vscp.mdf.constants.CONVERSION_FROM_DECIMAL[ type ];

    if ( "undefined" === typeof convFunc ) {
        console.error( vscp.utility.getTime() + " Conversion function for type " + type + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    console.info( vscp.utility.getTime() + " Read abstract \"" + options.id + "\" value." );

    // Read registers
    vscp.register.read({

        connection: options.connection,

        nodeId: options.nodeId,

        page: page,

        offset: offset,

        count: size,

        onSuccess: function( data ) {

            options.onSuccess(
                convFunc( data )
            );
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });

};

/**
 * Write a abstract value.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - mdf: MDF object
 * - id: Abstraction id
 * - value: Value
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.mdf.writeAbstractValue = function( options ) {

    var onError         = null;
    var index           = 0;
    var page            = 0;
    var offset          = 0;
    var type            = "";
    var size            = 0;
    var abstraction     = null;
    var convFunc        = null;
    var abstractions    = [];

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

    if ( "object" !== typeof options.mdf ) {
        console.error( vscp.utility.getTime() + " MDF object is missing." );
        return;
    }

    if ( "string" !== typeof options.id ) {
        console.error( vscp.utility.getTime() + " Abstraction id is missing." );
        return;
    }

    if ( "undefined" === typeof options.value ) {
        console.error( vscp.utility.getTime() + " Value is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    if ( false === vscp.mdf.isSafeObjectPath( options, "mdf.vscp.module.abstractions.abstraction" ) ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    
    if ( false === ( options.mdf.vscp.module.abstractions.abstraction instanceof Array ) ) {
        abstractions.push( options.mdf.vscp.module.abstractions.abstraction );
    }
    else {
        abstractions = options.mdf.vscp.module.abstractions.abstraction;
    }

    if ( 0 === abstractions.length ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    for( index = 0; index < abstractions.length; ++index ) {
        if ( options.id === abstractions[ index ].id ) {
            abstraction = abstractions[ index ];
            break;
        }
    }

    if ( null === abstraction ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    if ( "undefined" === typeof abstraction.page ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " page is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        page = parseInt( abstraction.page );
    }

    if ( "undefined" === typeof abstraction.offset ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " offset is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        offset = parseInt( abstraction.offset );
    }

    if ( "undefined" === typeof abstraction.type ) {
        console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " type is missing." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }
    else {
        type = abstraction.type;
    }

    if ( "string" === type ) {

        if ( "undefined" === typeof abstraction.size ) {
            console.error( vscp.utility.getTime() + " Abstract value id " + options.id + " size is missing." );

            if ( null !== onError ) {
                onError();
            }

            return;
        }

        size = parseInt( abstraction.size );
    }
    else {
        size = vscp.mdf.constants.TYPE_SIZES[ type ];
    }

    convFunc = vscp.mdf.constants.CONVERSION_TO_DECIMAL[ type ];

    if ( "undefined" === typeof convFunc ) {
        console.error( vscp.utility.getTime() + " Conversion function for type " + type + " is unknown." );

        if ( null !== onError ) {
            onError();
        }

        return;
    }

    console.info( vscp.utility.getTime() + " Write abstract \"" + options.id + "\" value " + options.value + "." );

    // Write registers
    vscp.register.write({

        connection: options.connection,

        nodeId: options.nodeId,

        page: page,

        offset: offset,

        count: size,

        data: convFunc( options.value ),

        onSuccess: function( data ) {

            options.onSuccess();
        },

        onError: function() {
            if ( null !== onError ) {
                onError();
            }
        }
    });

};

/**
 * Change some bits in a abstract value.
 *
 * @param[in] options   Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 * - mdf: MDF object
 * - id: Abstraction id
 * - pos: Bit position
 * - width: Bit width
 * - value: Value
 * - onSuccess: Callback
 * - onError: Callback
 */
vscp.mdf.writeAbstractBits = function( options ) {

    var onError     = null;
    var index       = 0;
    var width       = 1;
    var mask        = 0;

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

    if ( "object" !== typeof options.mdf ) {
        console.error( vscp.utility.getTime() + " MDF object is missing." );
        return;
    }

    if ( "string" !== typeof options.id ) {
        console.error( vscp.utility.getTime() + " Abstraction id is missing." );
        return;
    }

    if ( "number" !== typeof options.pos ) {
        console.error( vscp.utility.getTime() + " Bit position is missing." );
        return;
    }

    if ( "number" === typeof options.width ) {
        width = options.width;
    }

    if ( "undefined" !== typeof options.value ) {
        console.error( vscp.utility.getTime() + " Value is missing." );
        return;
    }

    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess is missing." );
        return;
    }

    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }

    // Read value
    vscp.mdf.readAbstractValue({

        connection: options.connection,

        nodeId: options.nodeId,

        mdf: options.mdf,

        id: options.id,

        onSuccess: function( value ) {

            // Change the bits of the read register value
            mask = 1 << options.pos;
            for( index = 0; index < width; ++index ) {

                // Clear bit?
                if ( 0 === ( options.value & ( 1 << index ) ) ) {

                    value = value & ( ~mask );
                }
                // Set bit
                else {

                    value = value | mask;
                }

                mask = mask << 1;
            }

            // Write changed register value back
            vscp.mdf.writeAbstractValue({

                connection: options.connection,

                nodeId: options.nodeId,

                mdf: options.mdf,

                id: options.id,

                value: value,

                onSuccess: options.onSuccess,

                onError: onError
            });

        },

        onError: onError

    });

};

/**
 * A message box.
 *
 * @param[in] options   Options
 *
 * Options:
 * - messageBox: XML object in JSON format
 */
vscp.mdf.MessageBox = function( options ) {

    this.func           = "input";  // Function input or output
    this.head           = "";       // Head
    this.description    = "";       // Description
    this.variableType   = "";       // Variable type
    this.variableName   = "";       // Variable name
    this.variableValue  = "";       // Variable value
    this.variableMin    = 0;        // Min. value (for numbers only)
    this.variableMax    = 0;        // Max. value (for numbers only)

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.messageBox ) {

            this.parse( options.messageBox );
        }
    }
};

/**
 * Parse a messagebox object.
 *
 * @param[in] messageBox XML object in JSON format
 */
vscp.mdf.MessageBox.prototype.parse = function( messageBox ) {

    if ( "undefined" === typeof messageBox ) {
        return;
    }

    if ( "string" === typeof messageBox.function ) {
        this.func = messageBox.function;
    }

    if ( "string" === typeof messageBox.head.text ) {
        this.head = messageBox.head.text;
    }

    if ( "string" === typeof messageBox.description.text ) {
        this.description = messageBox.description.text;
    }

    if ( "string" === typeof messageBox.variable.type ) {
        this.variableType = messageBox.variable.type;

        if ( ( "int8_t" === this.variableType ) ||
             ( "char" === this.variableType ) ||
             ( "byte" === this.variableType ) ) {
            this.variableMin = -128;
            this.variableMax = 127;
        }
        else if ( "uint8_t" === this.variableType ) {
            this.variableMin = 0;
            this.variableMax = 255;
        }
        if ( ( "int16_t" === this.variableType ) ||
             ( "short" === this.variableType ) ||
             ( "integer" === this.variableType ) ) {
            this.variableMin = -32768;
            this.variableMax = 32767;
        }
        else if ( "uint16_t" === this.variableType ) {
            this.variableMin = 0;
            this.variableMax = 65535;
        }
        if ( ( "int32_t" === this.variableType ) ||
             ( "long" === this.variableType ) ) {
            this.variableMin = -2147483648;
            this.variableMax = 2147483647;
        }
        else if ( "uint32_t" === this.variableType ) {
            this.variableMin = 0;
            this.variableMax = 4294967295;
        }

    }

    if ( "string" === typeof messageBox.variable.name ) {
        this.variableName = messageBox.variable.name;
    }
};

/**
 * Bit in register access method.
 *
 * @param[in] options Options
 *
 * Options:
 * - bitInReg: XML object in JSON format
 */
vscp.mdf.BitInReg = function( options ) {

    this.pos            = 0;
    this.page           = 0;
    this.offset         = 0;
    this.width          = 1;
    this.value          = 0;
    this.variableName   = "";

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.bitInReg ) {

            this.parse( options.bitInReg );
        }
    }
};

/**
 * Parse a bit in register access method object.
 *
 * @param[in] bitInReg XML object in JSON format
 */
vscp.mdf.BitInReg.prototype.parse = function( bitInReg ) {

    if ( "undefined" === typeof bitInReg ) {
        return;
    }

    if ( "string" === typeof bitInReg.pos ) {
        this.pos = parseInt( bitInReg.pos );
    }

    if ( "string" === typeof bitInReg.page ) {
        this.page = parseInt( bitInReg.page );
    }

    if ( "string" === typeof bitInReg.offset ) {
        this.offset = parseInt( bitInReg.offset );
    }

    if ( "string" === typeof bitInReg.width ) {
        this.width = parseInt( bitInReg.width );
    }

    if ( "string" === typeof bitInReg.value ) {

        this.variableName = "";
        this.value = 0;
    
        if ( "false" === bitInReg.value ) {
            this.value = 0;
        }
        else if ( "true" === bitInReg.value ) {
            this.value = 1;
        }
        else if ( "$" === bitInReg.value.charAt( 0 ) ) {
            this.variableName = bitInReg.value.substring( 1 );
        }
        else {
            this.value = parseInt( bitInReg.value );
        }
    }
};

/**
 * Bit in abstraction access method.
 *
 * @param[in] options Options
 *
 * Options:
 * - bitInAbstraction: XML object in JSON format
 */
vscp.mdf.BitInAbstraction = function( options ) {

    this.id             = "";
    this.pos            = 0;
    this.width          = 1;
    this.value          = 0;
    this.variableName   = "";

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.bitInAbstraction ) {

            this.parse( options.bitInAbstraction );
        }
    }
};

/**
 * Parse a bit in abstraction access method object.
 *
 * @param[in] bitInAbstraction XML object in JSON format
 */
vscp.mdf.BitInAbstraction.prototype.parse = function( bitInAbstraction ) {

    if ( "undefined" === typeof bitInAbstraction ) {
        return;
    }

    if ( "string" === typeof bitInAbstraction.id ) {
        this.id = bitInAbstraction.id;
    }

    if ( "string" === typeof bitInAbstraction.pos ) {
        this.pos = parseInt( bitInAbstraction.pos );
    }

    if ( "string" === typeof bitInAbstraction.width ) {
        this.width = parseInt( bitInAbstraction.width );
    }

    if ( "string" === typeof bitInAbstraction.value ) {

        this.variableName = "";
        this.value = 0;
    
        if ( "false" === bitInAbstraction.value ) {
            this.value = 0;
        }
        else if ( "true" === bitInAbstraction.value ) {
            this.value = 1;
        }
        else if ( "$" === bitInAbstraction.value.charAt( 0 ) ) {
            this.variableName = bitInAbstraction.value.substring( 1 );
        }
        else {
            this.value = parseInt( bitInAbstraction.value );
        }
    }
};

/**
 * Register access method.
 *
 * @param[in] options Options
 *
 * Options:
 * - register: XML object in JSON format
 */
vscp.mdf.Register = function( options ) {

    this.page           = 0;
    this.offset         = 0;
    this.value          = 0;
    this.variableName   = "";

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.register ) {

            this.parse( options.register );
        }
    }
};

/**
 * Parse a register access method object.
 *
 * @param[in] register XML object in JSON format
 */
vscp.mdf.Register.prototype.parse = function( register ) {

    if ( "undefined" === typeof register ) {
        return;
    }

    if ( "string" === typeof register.page ) {
        this.page = parseInt( register.page );
    }

    if ( "string" === typeof register.offset ) {
        this.offset = parseInt( register.offset );
    }

    if ( "string" === typeof register.value ) {
        
        this.variableName = "";
        this.value = 0;
    
        if ( "$" === register.value.charAt( 0 ) ) {
            this.variableName = register.value.substring( 1 );
        }
        else {
            this.value = parseInt( register.value );
        }
    }
};

/**
 * Abstraction access method.
 *
 * @param[in] options Options
 *
 * Options:
 * - abstraction: XML object in JSON format
 */
vscp.mdf.Abstraction = function( options ) {

    this.id             = "";
    this.value          = 0;
    this.variableName   = "";

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.abstraction ) {

            this.parse( options.abstraction );
        }
    }
};

/**
 * Parse a abstraction access method object.
 *
 * @param[in] abstraction XML object in JSON format
 */
vscp.mdf.Abstraction.prototype.parse = function( abstraction ) {

    if ( "undefined" === typeof abstraction ) {
        return;
    }

    if ( "string" === typeof abstraction.id ) {
        this.id = abstraction.id;
    }

    if ( "string" === typeof abstraction.value ) {
    
        this.variableName = "";
        this.value = 0;
    
        if ( "$" === abstraction.value.charAt( 0 ) ) {
            this.variableName = abstraction.value.substring( 1 );
        }
        else {
            this.value = parseInt( abstraction.value );
        }
    }
};

/**
 * A recipe.
 *
 * @param[in] options Options
 *
 * Options:
 * - recipe: XML object in JSON format
 */
vscp.mdf.Recipe = function( options ) {

    this.name               = "";   // Recipe name
    this.description        = "";   // Recipe description
    this.bitInRegs          = [];   // Bit access methods in registers
    this.bitInAbstractions  = [];   // Bit access methods in abstract value
    this.registers          = [];   // Register access methods
    this.abstractions       = [];   // Abstract access methods
    this.messageBoxes       = [];   // Message box array
    this.mdf                = null; // MDF

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.recipe ) {

            this.parse( options.recipe );
        }

        if ( "object" ===  typeof options.mdf ) {

            this.mdf = options.mdf;
        }
    }
};

/**
 * Parse a recipe object.
 *
 * @param[in] recipe XML object in JSON format
 */
vscp.mdf.Recipe.prototype.parse = function( recipe ) {

    var index               = 0;
    var bitInRegs           = [];
    var bitInReg            = null;
    var bitInAbstractions   = [];
    var bitInAbstraction    = null;
    var registers           = [];
    var register            = null;
    var abstractions        = [];
    var abstraction         = null;
    var messageBoxes        = [];
    var messageBox          = null;

    if ( "undefined" === typeof recipe ) {
        return;
    }

    if ( "string" === typeof recipe.name ) {
        this.name = recipe.name;
    }

    if ( "string" === typeof recipe.description.text ) {
        this.description = recipe.description.text;
    }

    if ( "undefined" !== typeof recipe.bit_in_reg ) {
        if ( false === ( recipe.bit_in_reg instanceof Array ) ) {
            bitInRegs.push( recipe.bit_in_reg );
        }
        else {
            bitInRegs = recipe.bit_in_reg;
        }

        for( index = 0; index < bitInRegs.length; ++index ) {

            bitInReg = new vscp.mdf.BitInReg({
                bitInReg: bitInRegs[ index ]
            });

            this.bitInRegs.push( bitInReg );
        }
    }

    if ( "undefined" !== typeof recipe.bit_in_abstraction ) {
        if ( false === ( recipe.bit_in_abstraction instanceof Array ) ) {
            bitInAbstractions.push( recipe.bit_in_abstraction );
        }
        else {
            bitInAbstractions = recipe.bit_in_abstraction;
        }

        for( index = 0; index < bitInAbstractions.length; ++index ) {

            bitInAbstraction = new vscp.mdf.BitInAbstraction({
                bitInAbstraction: bitInAbstractions[ index ]
            });

            this.bitInAbstractions.push( bitInAbstraction );
        }
    }

    if ( "undefined" !== typeof recipe.register ) {
        if ( false === ( recipe.register instanceof Array ) ) {
            registers.push( recipe.register );
        }
        else {
            registers = recipe.register;
        }

        for( index = 0; index < registers.length; ++index ) {

            register = new vscp.mdf.Register({
                register: registers[ index ]
            });

            this.registers.push( register );
        }
    }

    if ( "undefined" !== typeof recipe.abstraction ) {
        if ( false === ( recipe.abstraction instanceof Array ) ) {
            abstractions.push( recipe.abstraction );
        }
        else {
            abstractions = recipe.abstraction;
        }

        for( index = 0; index < abstractions.length; ++index ) {

            abstraction = new vscp.mdf.Abstraction({
                abstraction: abstractions[ index ]
            });

            this.abstractions.push( abstraction );
        }
    }

    if ( "undefined" !== typeof recipe.messagebox ) {
        if ( false === ( recipe.messagebox instanceof Array ) ) {
            messageBoxes.push( recipe.messagebox );
        }
        else {
            messageBoxes = recipe.messagebox;
        }

        for( index = 0; index < messageBoxes.length; ++index ) {

            messageBox = new vscp.mdf.MessageBox({
                messageBox: messageBoxes[ index ]
            });

            this.messageBoxes.push( messageBox );
        }
    }
};

/**
 * Write a recipe.
 *
 * @param[in] options Options
 *
 * Options:
 * - connection: VSCP connection
 * - nodeId: Node id
 */
vscp.mdf.Recipe.prototype.write = function( options ) {

    var bitInRegsCnt            = 0;
    var bitInAbstractionsCnt    = 0;
    var registersCnt            = 0;
    var abstractionsCnt         = 0;
    var onError                 = null;
    var messageBoxIndex         = 0;
    var index                   = 0;
    var onProgress              = null;
    var steps                   = 0;
    var progress                = 0;

    var updateProgress = function( percent ) {
        if ( null !== onProgress ) {
            onProgress( percent );
        }
    };
    
    var process = function() {

        progress += Math.floor( 100 / steps );
        updateProgress( progress );
    
        if ( this.bitInRegs.length > bitInRegsCnt ) {
            console.debug( vscp.utility.getTime() + " Recipe " + this.name + ": Write bit in register value." );
            
            vscp.register.writeBits({

                connection: options.connection,

                nodeId: options.nodeId,

                page: this.bitInRegs[ bitInRegsCnt ].page,

                offset: this.bitInRegs[ bitInRegsCnt ].offset,

                pos: this.bitInRegs[ bitInRegsCnt ].pos,

                width: this.bitInRegs[ bitInRegsCnt ].width,

                value: this.bitInRegs[ bitInRegsCnt ].value,

                onSuccess: process,

                onError: onError
            });

            ++bitInRegsCnt;
        }
        else if ( this.bitInAbstractions.length > bitInAbstractionsCnt ) {
            console.debug( vscp.utility.getTime() + " Recipe " + this.name + ": Write bit in abstract value." );

            vscp.mdf.writeAbstractBits({

                connection: options.connection,

                nodeId: options.nodeId,

                mdf: this.mdf,

                id: this.bitInAbstractions[ bitInRegsCnt ].id,

                pos: this.bitInAbstractions[ bitInRegsCnt ].pos,

                width: this.bitInAbstractions[ bitInRegsCnt ].width,

                value: this.bitInAbstractions[ bitInRegsCnt ].value,

                onSuccess: process,

                onError: onError

            });

            ++bitInAbstractionsCnt;
        }
        else if ( this.registers.length > registersCnt ) {
            console.debug( vscp.utility.getTime() + " Recipe " + this.name + ": Write register value." );

            vscp.register.write({

                connection: options.connection,

                nodeId: options.nodeId,

                page: this.registers[ registersCnt ].page,

                offset: this.registers[ registersCnt ].offset,

                count: 1,
                
                data: [ this.registers[ registersCnt ].value ],

                onSuccess: process,

                onError: onError

            });

            ++registersCnt;
        }
        else if ( this.abstractions.length > abstractionsCnt ) {
            console.debug( vscp.utility.getTime() + " Recipe " + this.name + ": Write abstract value." );

            vscp.mdf.writeAbstractValue({

                connection: options.connection,

                nodeId: options.nodeId,

                mdf: this.mdf,

                id: this.abstractions[ abstractionsCnt ].id,

                value: this.abstractions[ abstractionsCnt ].value,

                onSuccess: process,

                onError: onError

            });

            ++abstractionsCnt;
        }
        else {
            console.info( "Recipe written." );

            options.onSuccess();
        }

    }.bind( this );
    
    if ( "undefined" === typeof options ) {
        console.error( vscp.utility.getTime() + " Options are missing." );
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
    
    if ( "function" === typeof options.onProgress ) {
        onProgress = options.onProgress;
    }
    
    if ( "function" !== typeof options.onSuccess ) {
        console.error( vscp.utility.getTime() + " onSuccess callback is missing." );
        return;
    }
    
    if ( "function" === typeof options.onError ) {
        onError = options.onError;
    }
    
    // Get all messagebox variables and set the variable value to the access method objects
    for( messageBoxIndex = 0; messageBoxIndex < this.messageBoxes.length; ++messageBoxIndex ) {

        for( index = 0; index < this.bitInRegs.length; ++index ) {
            if ( this.messageBoxes[ messageBoxIndex ].variableName === this.bitInRegs[ index ].variableName ) {
                this.bitInRegs[ index ].value = this.messageBoxes[ messageBoxIndex ].variableValue;
            }
        }
        
        for( index = 0; index < this.bitInAbstractions.length; ++index ) {
            if ( this.messageBoxes[ messageBoxIndex ].variableName === this.bitInAbstractions[ index ].variableName ) {
                this.bitInAbstractions[ index ].value = this.messageBoxes[ messageBoxIndex ].variableValue;
            }
        }

        for( index = 0; index < this.registers.length; ++index ) {
            if ( this.messageBoxes[ messageBoxIndex ].variableName === this.registers[ index ].variableName ) {
                this.registers[ index ].value = this.messageBoxes[ messageBoxIndex ].variableValue;
            }
        }
        
        for( index = 0; index < this.abstractions.length; ++index ) {
            if ( this.messageBoxes[ messageBoxIndex ].variableName === this.abstractions[ index ].variableName ) {
                this.abstractions[ index ].value = this.messageBoxes[ messageBoxIndex ].variableValue;
            }
        }
    }
    
    // How many steps are necessary to write the whole recipe?
    steps += this.bitInRegs.length;
    steps += this.bitInAbstractions.length;
    steps += this.registers.length;
    steps += this.abstractions.length;
    steps += 1;
    
    // Start writing the recipe
    console.info( vscp.utility.getTime() + " Writing recipe " + this.name + "." );
    process();
};

/**
 * Get recipes from a MDF in JSON format.
 *
 * @param[in] options Options
 *
 * @return Recipe array
 *
 * Options:
 * - mdf: XML in JSON format
 */
vscp.mdf.getRecipes = function( options ) {

    var index   = 0;
    var recipes = [];
    var recipe  = null;

    if ( "object" !== typeof options.mdf ) {
        console.error( vscp.utility.getTime() + " MDF object is missing." );
        return recipes;
    }
    
    if ( false === vscp.mdf.isSafeObjectPath( options, "mdf.vscp.module.setup.recipe" ) ) {
        console.warning( vscp.utility.getTime() + " No recipes available." );
        return recipes;
    }

    // Only one single recipe available?
    if ( false === ( options.mdf.vscp.module.setup.recipe instanceof Array ) ) {

        recipe = new vscp.mdf.Recipe({
            recipe: options.mdf.vscp.module.setup.recipe,
            mdf: options.mdf
        });

        recipes.push( recipe );
    }
    // Several recipes available
    else {

        for( index = 0; index < options.mdf.vscp.module.setup.recipe.length; ++index ) {

            recipe = new vscp.mdf.Recipe({
                recipe: options.mdf.vscp.module.setup.recipe[ index ],
                mdf: options.mdf
            });

            recipes.push( recipe );
        }
    }

    return recipes;
};

