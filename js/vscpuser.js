// VSCP javascript websocket library
//
// Copyright (C) 2012-2018 Ake Hedman, Grodans Paradis AB
// <akhe@grodansparadis.com>
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

/** Namespace for all functionality of the VSCP provided libraries.
 * @namespace vscp
 */
var vscp = vscp || {};

/* ---------------------------------------------------------------------- */

/** VSCP user functionality
 * @namespace vscp.user
 */
vscp._createNS("vscp.user");

vscp.user.userinfo = []; // User array

/** VSCP user record ordinals
 *       "userid;name;password;fullname;filter;mask;rights;remotes;events;note"
 * @enum {number}
 * @const
 */
vscp.user.records = {
    ID: 0,
    NAME: 1,
    PASSWORD: 2,
    FULLNAME: 3,
    FILTER: 4,
    MASK: 5,
    RIGHTS: 6,
    REMOTES: 7,
    EVENTS: 8,
    NOTE: 9
};

///////////////////////////////////////////////////////////////////////////////////////////
// fetchUsers
//

vscp.user.fetchUsers = function(onSuccessEx, onErrorEx) {

    var _onSuccess = null;
    var _onError = null;

    if ("function" === typeof onSuccessEx) {
        _onSuccess = onSuccessEx;
    }

    if ("function" !== typeof onErrorEx) {
        _onError = null;
    } else {
        _onError = onErrorEx;
    }

    // Clear user info array
    vscp.user.userinfo = [];

    vscpConn.readVar({

        name: "vscp.user.count",

        onSuccess: function(conn, options) {

            var count = options.value;
            for (i = 0; i < count; i++) {

                vscpConn.readVar({

                    name: "vscp.user." + i.toString(),

                    onSuccess: function(conn, options) {

                        // Add to array
                        var items = options.value.split(";");
                        vscp.user.userinfo.push(items);

                        var dd = options.name.split(".");

                        // Signal success when last user is read
                        if ((count - 1) == dd[2]) {
                            _onSuccess && _onSuccess();
                        }

                    },

                    onError: function(conn) {
                        _onError && _onError();
                    }
                });

            }; // for  



        },

        onError: function(conn) {
            _onError && _onError();
        }

    });

    /**
     * Signal success of the current asynchronous operation.
     */
    this.signalSuccessEx = function(onSuccess) {

        if (("function" === typeof onSuccess) && (null !== onSuccess)) {
            onSuccess(this);
        }
    };

    /**
     * Signal error of the current asynchronous operation.
     */
    this.signalErrorEx = function(onError) {

        if (("function" === typeof onError) && (null !== onError)) {
            onError(this);
        }
    };

};

///////////////////////////////////////////////////////////////////////////////////////////
// getUserFromId
//

vscp.user.getUserFromId = function(id) {
    for (i = 0; i < vscp.user.userinfo.length; i++) {
        console.log(parseInt(vscp.user.userinfo[i][0]), id);
        if (id == parseInt(vscp.user.userinfo[i][0])) {
            return vscp.user.userinfo[i][1];
        }
    }

    return "Unknown";
};

///////////////////////////////////////////////////////////////////////////////////////////
// getIdFromUser
//

vscp.user.getIdFromUser = function(user) {
    for (i = 0; i < vscp.user.userinfo.length; i++) {
        if (user == vscp.user.userinfo[i][1]) {
            return vscp.user.userinfo[i][0];
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////////////
// fillUserDropdown
//

vscp.user.fillUserDropdown = function(idDropdown, idText) {
    vscp.user.userinfo.forEach(function(u) {
        // Add to drop down
        $(idDropdown).append("<li><a href=\"javascript:$('" + idText + "').val('" + u[1] +
            "');\">" + u[1] + "</a></li>");
    });
};