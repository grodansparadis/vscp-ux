// Navigation bar helper functions used for a single source bootstrap menu.
//
// Copyright (c) 2015-2020 Andreas Merkle
// <vscp@blue-andi.de>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2020 Grodans Paradis AB (Paradise of the Frog)
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

/** Create the root namespace and making sure we're not overwriting it
 * @namespace navBarMenu
 */
var navBarMenu = navBarMenu || {};

/* ---------------------------------------------------------------------- */

/**
 * Show a menu in bootstrap style.
 *
 * @param {string} id HTML tag id
 * @param {object} menu  Menu structure
 * @param {string} basePath Base path
 */
navBarMenu.show = function( id, menu, basePath ) {

    var index       = 0;
    var navigation  = "";
    
    navigation = '<ul class="nav navbar-nav">';
    
    for(index = 0; index < menu.length; ++index ) {
    
        if ( "undefined" !== typeof menu[ index ].dropDown ) {
            navigation += navBarMenu._dropDown( menu[ index ], basePath );
        }
        else {
            navigation += '<li><a href="';

            if ( ( "#" !== menu[ index ].url ) &&
                 ( false === menu[ index ].url.startsWith("javascript:") ) ) {
                navigation += basePath;
            }

            navigation += menu[ index ].url + '">' + menu[ index ].title + '</a></li>';
        }
    }
    
    $( "#" + id ).html( navigation );

};

/**
 * Create a drop-down menu and return it.
 * @private
 *
 * @param {object} menu  Menu structure
 * @param {string} basePath Base path
 *
 * @return {string} HTML drop-down menu part
 */
navBarMenu._dropDown = function( menu, basePath ) {
    
    var index       = 0;
    var navigation  = "";
    
    navigation += '<li class="dropdown">';
    navigation += '<a class="dropdown-toggle" data-toggle="dropdown" href="';
    if ( ( "#" !== menu.url ) &&
         ( false === menu.url.startsWith("javascript:") ) ) {
        navigation += basePath;
    }
    navigation += menu.url + '">' + menu.title + '';
    navigation += '<span class="caret"></span></a>';
    navigation += '<ul class="dropdown-menu">';
                        
    for(index = 0; index < menu.dropDown.length; ++index ) {
    
        if ( "undefined" !== typeof menu.dropDown[ index ].dropDown ) {
            navigation += navBarMenu._dropDown( menu.dropDown[ index ] );
        }
        else {
            navigation += '<li><a href="';
            
            if ( ( "#" !== menu.dropDown[ index ].url ) &&
                 ( false === menu.dropDown[ index ].url.startsWith("javascript:") ) ) {
                navigation += basePath;
            }

            navigation += menu.dropDown[ index ].url + '">' + menu.dropDown[ index ].title + '</a></li>';
        }
    }
    
    navigation += '</ul>';
    navigation += '</li>';
    
    return navigation;
};
