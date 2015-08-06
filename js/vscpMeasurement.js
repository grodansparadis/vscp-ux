// VSCP measurement javascript library
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

/** VSCP units */
vscp.constants.units = [

    // Generic
    [],
    // Count
    [],
    // Length/Distance
    [ "Meter" ],
    // Mass
    [ "Kilogram" ],
    // Time
    [ "Millisecond", "Seconds" ],
    // Electrical Current
    [ "Ampere" ],
    // Temperature
    [ "Kelvin", "Celsius", "Fahrenheit" ],
    // Amount of substance
    [ "Mole" ],
    // Luminous Intensity (Intensity of light)
    [ "Candela" ],
    // Frequency
    [ "Hertz" ],
    // Radioactivity and other random events
    [ "Becquerel" ],
    // Force
    [ "Newton" ],
    // Pressure
    [ "Pascal", "Bar", "Psi" ],
    // Energy
    [ "Joule" ],
    // Power
    [ "Watt" ],
    // Electrical Charge
    [ "Coulomb" ],
    // Electrical Potential (Voltage)
    [ "Volt" ],
    // Electrical Capacitance
    [ "Farad" ],
    // Electrical Resistance
    [ "Ohm" ],
    // Electrical Conductance
    [ "Siemens" ],
    // Magnetic Field Strength
    [ "Ampere meters" ],
    // Magnetic Flux
    [ "Weber" ],
    // Magnetic Flux Density
    [ "Tesla" ],
    // Inductance
    [ "Henry" ],
    // Luminous Flux
    [ "Lumen" ],
    // Illuminance
    [ "Lux" ],
    // Radiation dose
    [ "Gray", "Sievert" ],
    // Catalytic activity
    [ "Katal" ],
    // Volume
    [ "Cubic meter", "Liter" ],
    // Sound intensity
    [ "Bel","Neper","dB" ],
    // Angle
    [ "Rad","Degree", "Arcminute", "Arcseconds" ],
    // Position
    [ "Longitude", "Latitude" ],
    // Speed
    [ "Meters per second" ],
    // Acceleration
    [ "Meters per second/second" ],
    // Tension
    [ "N/m" ],
    // Damp/moist (Hygrometer reading)
    [ "%" ],
    // Flow
    [ "Cubic meters/second", "Liter/Second" ],
    // Thermal resistance
    [ "K/W" ],
    //  Refractive power
    [ "Dioptre" ],
    // Dynamic viscosity
    [ "Poiseuille" ],
    // Sound impedance
    [ "Rayal" ],
    // Sound resistance
    [ "Acoustic ohm" ],
    // Electric elastance
    [ "Darag" ],
    // Luminous energy
    [ "Talbot" ],
    // Luminance
    [ "Nit" ],
    // Chemical concentration
    [ "Molal" ],
    // Reserved
    [ "Reserved" ],
    // Dose equivalent
    [ "Sievert" ],
    // Reserved
    [ "Reserved" ],
    // Dew Point
    [ "Levin", "Celsius", "Fahrenheit" ],
    // Relative Level
    [ "Relative" ],
    // Altitude
    [ "Meter", "Feet", "Inches" ],
    // Area
    [ "Square meter" ],
    // Radiant intensity
    [ "Watt per steradian" ],
    // Radiance
    [ "Att per steradian per square metre" ],
    // Irradiance, Exitance, Radiosity
    [ "Watt per square metre" ],
    // Spectral radiance
    [ "Watt per steradian per square metre per nm" ],
    // Spectral irradiance
    [ "Watt per square metre per nm" ]
];

/* ---------------------------------------------------------------------- */

vscp._createNS( "vscp.measurement" );

/** VSCP measurement timeout in ms */
vscp.measurement.timeout = 5000;

/**
 * Round value to a fixed precision.
 *
 * @param[in] value Value
 * @param[in] precision Precision
 * Rounded value
 */
vscp.measurement.toFixed = function( value, precision ) {
    var power = Math.pow( 10, precision || 0 );
    return String((Math.round(value * power) / power).toFixed(precision));
};

/**
 * Convert a integer value to float
 *
 * @param[in] data  Byte array
 * @return Float value
 */
vscp.measurement.varInteger2Float = function( data ) {
    var rval        = 0.0;
    var bNegative   = false;
    var i           = 0;

    if ( data[ 0 ] & 0x80 ) {
        bNegative = true;

        for ( i = 0; i < data.length; i++ ) {
            data[ i ] = ~data[ i ] & 0xff;
        }
    }

    for ( i = 0; i< data.length; i++ ) {
        rval = rval << 8;
        rval += data[ i ];
    }

    if ( bNegative ) {
        rval = -1.0 * ( rval + 1 );
    }

    return rval;
};

/**
 * Get data coding.
 *
 * @param[in] data  Data
 * @return Coding
 */
vscp.measurement.getDataCoding = function( data ) {
    return ( data >> 5 ) & 7;
};

/**
 * Get unit from data coding.
 *
 * @param[in] data  Data coding
 * @return Unit
 */
vscp.measurement.getUnitFromDataCoding = function( data ) {
    return ( data >> 3 ) & 3;
};

/**
 * Get sensor index from data coding.
 *
 * @param[in] data  Data coding
 * @return Sensor index
 */
vscp.measurement.getSensorIndexFromDataCoding = function( data ) {
    return data & 7;
};

/**
 * Decode a class 10 measurement.
 *
 * @param[in] data  Data (event data array where first data byte is the data coding)
 * @return Value as float
 */
vscp.measurement.decodeClass10 = function( data ) {
    var rval        = 0.0;
    var newData     = [];
    var sign        = 0;
    var exp         = 0;
    var mantissa    = 0;
    var str         = "";
    var i           = 0;

    switch ( vscp.measurement.getDataCoding( data[ 0 ] ) ){
        case 0: // Bits
        case 1: // Bytes
        case 3: // Integer
            {
                for ( i = 1 ;i < data.length; i++ ) {
                    newData[ i - 1 ] = data[ i ];
                }
                rval = vscp.measurement.varInteger2Float( newData );
            }
            break;

        case 2: // String
            {
                for ( i = 1 ;i < data.length; i++ ) {
                    str +=  String.fromCharCode(data[ i ]);
                }
                rval = parseFloat(str);
            }
            break;
        case 4: // Normalized integer
            {
                exp = data[ 1 ];

                for ( i = 2; i < data.length; i++ ) {
                    newData[ i - 2 ] = data[ i ];
                }

                rval = vscp.measurement.varInteger2Float( newData );

                // Handle mantissa
                if ( exp & 0x80 ) {
                    exp &= 0x7f;
                    rval = rval / Math.pow(10,exp);
                }
                else {
                    exp &= 0x7f;
                    rval = rval * Math.pow(10,exp);
                }

            }
            break;
        case 5: // Floating point
            {
                if ( 5 == data.length ) {
                    sign = data[1] & 0x80;  // Negative if != 0
                    exp = (data[1] & 0x7f) << 1 + (data[2] & 0x80) ? 1 : 0;
                    mantissa = (data[2] & 0x7f) << 16 + data[3] << 8 + data[4];
                    // sign * 2^exponent * mantissa
                    rval = Math.pow(2,exp) * mantissa;
                    if (sign) rval = -1*rval;
                }
            }
            break;
        case 6: // Reserved
            break;
        case 7: // Reserved
            break;
    }

    return rval;
};

/**
 * Decode a class 60 measurement.
 *
 * @param[in] data  Data
 * @return Value as float
 */
vscp.measurement.decodeClass60Number = function( data ) {
    var rval        = 0;
    var sign        = 0;
    var exp         = 0;
    var mantissa    = 0;
    
    if ( 8 === data.length ) {

        sign = data[0] & 0x80;  // Negative if != 0
        exp = (data[0] & 0x7f) << 4 + (data[1] & 0xf0)>>4;
        mantissa = (data[1] & 0x0f) << 48 +
                    data[2] << 40 +
                    data[3] << 32 +
                    data[4] << 24 +
                    data[5] << 16 +
                    data[6] << 8 +
                    data[7];
                    
        // sign * 2^exponent * mantissa
        rval = Math.pow( 2, exp ) * mantissa;
        
        if (sign) {
            rval = -1 * rval;
        }
    }

    return rval;
};

/**
 * Decode a class 65 measurement.
 *
 * @param[in] data  Data
 * @return Value as float
 */
vscp.measurement.decodeClass65Number = function( data ) {
    var rval    = 0;
    var exp     = data[ 3 ];
    var i       = 0;

    for (i = 4; i < data.length; i++) {
        rval = rval << 8;
        rval += data[i];
    }

    // Handle exponent
    if (exp & 128) {
        exp &= 0x7f;
        rval = rval * Math.pow(10, (-1 * exp));
    }
    else {
        rval = rval * Math.pow(10, exp);
    }

    return rval;
};

/**
 * Convert from unit fahrenheit to unit kelvin.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertFahrenheitToKelvin = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    var cTempVal = ( fTempVal - 32 ) * ( 5 / 9 ) + 273.15;
    return cTempVal;
};

/**
 * Convert from unit fahrenheit to unit celsius.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertFahrenheitToCelsius = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    var cTempVal = ( fTempVal - 32 ) * ( 5 / 9 );
    return cTempVal;
};

/**
 * Convert from unit celsius to unit fahrenheit.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertCelsiusToFahrenheit = function( value ) {
    var cTempVal = "string" == typeof value ? parseFloat(value) : value;
    var fTempVal = ( cTempVal * ( 9 / 5 ) ) + 32;
    return fTempVal;
};

/**
 * Convert from unit kelvin to unit celsius.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertKelvinToCelsius = function( value ) {
    var kTempVal = "string" == typeof value ? parseFloat(value) : value;
    var cTempVal = kTempVal - 273.15;
    return cTempVal;
};

/**
 * Convert from unit celsius to unit kelvin.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertCelsiusToKelvin = function( value ) {
    var kTempVal = "string" == typeof value ? parseFloat(value) : value;
    var cTempVal = kTempVal + 273.15;
    return cTempVal;
};

/**
 * Convert from unit kelvin to unit fahrenheit.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertKelvinToFahrenheit = function( value ) {
    var kTempVal = "string" == typeof value ? parseFloat(value) : value;
    var cTempVal = kTempVal + 273.15;
    return vscp.measurement.convertCelsiusToFahrenheit( cTempVal );
};

/**
 * Convert from unit meter to unit feet.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertMeterToFeet = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    return fTempVal * 3.2808399;
};

/**
 * Convert from unit feet to unit meter.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertFeetToMeter = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    return fTempVal * 0.3048;
};

/**
 * Convert from unit meter to unit inch.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertMeterToInch = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    return fTempVal * 3.2808399 * 12;
};

/**
 * Convert from unit inch to unit meter.
 *
 * @param[in] value Value
 * @return Converted value
 */
vscp.measurement.convertInchToMeter = function( value ) {
    var fTempVal = "string" == typeof value ? parseFloat(value) : value;
    return fTempVal * 0.3048 / 12;
};
