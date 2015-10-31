// VSCP wizard javascript library
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

/* Create the root namespace and making sure we're not overwriting it */
var vscp = vscp || {};

/* ---------------------------------------------------------------------- */

/** VSCP wizard functionality based on a MDF
 * @namespace vscp.wizard
 */
vscp._createNS( "vscp.wizard" );

/**
 * A message box.
 * @class
 *
 * @param {object} options              - Options
 * @param {object} options.messageBox   - Messagebox as jquery xml object
 */
vscp.wizard.MessageBox = function( options ) {

    /**
     * Function input or output
     * @member {string}
     */
    this.func           = "input";
    /**
     * Head
     * @member {string}
     */
    this.head           = "";
    /**
     * Description
     * @member {string}
     */
    this.description    = "";
    /**
     * Variable type
     * @member {string}
     */
    this.variableType   = "";
    /**
     * Variable name
     * @member {string}
     */
    this.variableName   = "";
    /**
     * Variable value
     * @member {string}
     */
    this.variableValue  = "";

    if ( "undefined" !== typeof options ) {

        if ( "object" === typeof options.messageBox ) {

            this.parse( options.messageBox );
        }
    }
};

/**
 * Parse a messagebox object.
 *
 * @param {object} $messageBox - Messagebox as jquery xml object
 */
vscp.wizard.MessageBox.prototype.parse = function( $messageBox ) {

    if ( "undefined" === typeof $messageBox ) {
        return;
    }

    if ( "undefined" !== typeof $messageBox.children( "function" ) ) {
        this.func = $messageBox.children( "function" ).text();
    }
    
    if ( "undefined" !== typeof $messageBox.children( "head" ) ) {
        this.head = $messageBox.children( "head" ).text();
    }
    
    if ( "undefined" !== typeof $messageBox.children( "description" ) ) {
        this.description = $messageBox.children( "description" ).text();
    }
    
    if ( "undefined" !== typeof $messageBox.children( "variable" ) ) {
    
        if ( "undefined" !== typeof $messageBox.children( "variable" ).attr( "name" ) ) {
            this.variableName = $messageBox.children( "variable" ).attr( "name" );
        }
    
        if ( "undefined" !== typeof $messageBox.children( "variable" ).attr( "type" ) ) {
        
            this.variableType = $messageBox.children( "variable" ).attr( "type" );
        }
    }

};

/**
 * Bit in register access method.
 * @class
 *
 * @param {object} options          - Options
 * @param {object} options.bitInReg - Bit-in-register as jquery xml object
 */
vscp.wizard.BitInReg = function( options ) {

    /** Bit position
     * @member {number}
     */
    this.pos            = 0;
    /** Register page
     * @member {number}
     */
    this.page           = 0;
    /** Register offset
     * @member {number}
     */
    this.offset         = 0;
    /** Bit width
     * @member {number}
     */
    this.width          = 1;
    /** Value of bit width
     * @member {number}
     */
    this.value          = 0;
    /** Variable name
     * @member {string}
     */
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
 * @param {object} bitInReg - Bit-in-register as jquery xml object
 */
vscp.wizard.BitInReg.prototype.parse = function( $bitInReg ) {

    if ( "undefined" === typeof $bitInReg ) {
        return;
    }
    
    if ( "undefined" !== typeof $bitInReg.attr( "pos" ) ) {
        this.pos = parseInt( $bitInReg.attr( "pos" ) );
    }

    if ( "undefined" !== typeof $bitInReg.attr( "page" ) ) {
        this.page = parseInt( $bitInReg.attr( "page" ) );
    }
    
    if ( "undefined" !== typeof $bitInReg.attr( "offset" ) ) {
        this.offset = parseInt( $bitInReg.attr( "offset" ) );
    }
    
    if ( "undefined" !== typeof $bitInReg.attr( "width" ) ) {
        this.width = parseInt( $bitInReg.attr( "width" ) );
    }
    
    if ( "undefined" !== typeof $bitInReg.attr( "value" ) ) {

        // Does the value contains a variable?
        if ( "$" === $bitInReg.attr( "value" ).charAt( 0 ) ) {
            this.variableName = $bitInReg.attr( "value" ).substring( 1 );
        }
        // Does the value contains a boolean value?
        else if ( "false" === $bitInReg.attr( "value" ) ) {
            this.value = 0;
        }
        // Does the value contains a boolean value?
        else if ( "true" === $bitInReg.attr( "value" ) ) {
            this.value = 1;
        }
        // Value contains a number
        else {
            this.value = parseInt( $bitInReg.attr( "value" ) );
        }
    }

};

/**
 * Bit in abstraction access method.
 * @class
 *
 * @param {object} options                  - Options
 * @param {object} options.bitInAbstraction - Bit-in-abstraction as jquery xml object
 */
vscp.wizard.BitInAbstraction = function( options ) {

    /** Abstract value id
     * @member {string}
     */
    this.id             = "";
    /** Bit position
     * @member {number}
     */
    this.pos            = 0;
    /** Bit width
     * @member {number}
     */
    this.width          = 1;
    /** Value of bit width
     * @member {number}
     */
    this.value          = 0;
    /** Variable name
     * @member {string}
     */
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
 * @param {object} $bitInAbstraction - Bit-in-abstraction as jquery xml object
 */
vscp.wizard.BitInAbstraction.prototype.parse = function( $bitInAbstraction ) {

    if ( "undefined" === typeof $bitInAbstraction ) {
        return;
    }

    if ( "undefined" !== typeof $bitInAbstraction.attr( "id" ) ) {
        this.id = $bitInAbstraction.attr( "id" );
    }
    
    if ( "undefined" !== typeof $bitInAbstraction.attr( "pos" ) ) {
        this.pos = parseInt( $bitInAbstraction.attr( "pos" ) );
    }
    
    if ( "undefined" !== typeof $bitInAbstraction.attr( "width" ) ) {
        this.width = parseInt( $bitInAbstraction.attr( "width" ) );
    }
    
    if ( "undefined" !== typeof $bitInAbstraction.attr( "value" ) ) {

        // Does the value contains a variable?
        if ( "$" === $bitInAbstraction.attr( "value" ).charAt( 0 ) ) {
            this.variableName = $bitInAbstraction.attr( "value" ).substring( 1 );
        }
        // Does the value contains a boolean value?
        else if ( "false" === $bitInAbstraction.attr( "value" ) ) {
            this.value = 0;
        }
        // Does the value contains a boolean value?
        else if ( "true" === $bitInAbstraction.attr( "value" ) ) {
            this.value = 1;
        }
        // Value contains a number
        else {
            this.value = parseInt( $bitInAbstraction.attr( "value" ) );
        }
    }
    
};

/**
 * Register access method.
 * @class
 *
 * @param {object} options          - Options
 * @param {object} options.register - Register as jquery xml object
 */
vscp.wizard.Register = function( options ) {

    /** Register page
     * @member {number}
     */
    this.page           = 0;
    /** Register offset
     * @member {number}
     */
    this.offset         = 0;
    /** Register value
     * @member {number}
     */
    this.value          = 0;
    /** Variable name
     * @member {string}
     */
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
 * @param {object} $register - Register as jquery xml object
 */
vscp.wizard.Register.prototype.parse = function( $register ) {

    if ( "undefined" === typeof $register ) {
        return;
    }
    
    if ( "undefined" !== typeof $register.attr( "page" ) ) {
        this.page = parseInt( $register.attr( "page" ) );
    }
    
    if ( "undefined" !== typeof $register.attr( "offset" ) ) {
        this.offset = parseInt( $register.attr( "offset" ) );
    }
    
    if ( "undefined" !== typeof $register.attr( "value" ) ) {

        // Does the value contains a variable?
        if ( "$" === $register.attr( "value" ).charAt( 0 ) ) {
            this.variableName = $register.attr( "value" ).substring( 1 );
        }
        // Value contains a number
        else {
            this.value = parseInt( $register.attr( "value" ) );
        }
    }

};

/**
 * Abstraction access method.
 * @class
 *
 * @param {object} options              - Options
 * @param {object} options.abstraction  - Abstraction as jquery xml object
 */
vscp.wizard.Abstraction = function( options ) {

    /** Abstract value id
     * @member {string}
     */
    this.id             = "";
    /** Abstract value
     * @member {number}
     */
    this.value          = 0;
    /** Variable name
     * @member {number}
     */
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
 * @param {object} $abstraction Abstraction as jquery xml object
 */
vscp.wizard.Abstraction.prototype.parse = function( $abstraction ) {

    if ( "undefined" === typeof $abstraction ) {
        return;
    }
    
    if ( "undefined" !== typeof $abstraction.attr( "id" ) ) {
        this.id = $abstraction.attr( "id" );
    }
    
    if ( "undefined" !== typeof $abstraction.attr( "value" ) ) {

        // Does the value contains a variable?
        if ( "$" === $abstraction.attr( "value" ).charAt( 0 ) ) {
            this.variableName = $abstraction.attr( "value" ).substring( 1 );
        }
        // Value contains a number
        else {
            this.value = parseInt( $abstraction.attr( "value" ) );
        }
    }
    
};

/**
 * A recipe.
 * @class
 *
 * @param {object} options          - Options
 * @param {object} options.recipe   - Recipe as jquery xml object
 * @param {object} options.mdf      - MDF as jquery xml object
 */
vscp.wizard.Recipe = function( options ) {

    /** Recipe name
     * @member {string}
     */
    this.name               = "";
    /** Recipe description
     * @member {string}
     */
    this.description        = "";
    /** Bit access methods in registers
     * @member {[]}
     */
    this.bitInRegs          = [];
    /** Bit access methods in abstract value
     * @member {[]}
     */
    this.bitInAbstractions  = [];
    /** Register access methods
     * @member {[]}
     */
    this.registers          = [];
    /** Abstract access methods
     * @member {[]}
     */
    this.abstractions       = [];
    /** Messageboxes
     * @member {[]}
     */
    this.messageBoxes       = [];
    /** MDF
     * @member {[]}
     */
    this.mdf                = null;

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
 * @param {object} $recipe - Recipe as jquery xml object
 */
vscp.wizard.Recipe.prototype.parse = function( $recipe ) {

    var bitInRegs           = this.bitInRegs;
    var bitInReg            = null;
    var bitInAbstractions   = this.bitInAbstractions;
    var bitInAbstraction    = null;
    var registers           = this.registers;
    var register            = null;
    var abstractions        = this.abstractions;
    var abstraction         = null;
    var messageBoxes        = this.messageBoxes;
    var messageBox          = null;

    if ( "undefined" === typeof $recipe ) {
        return;
    }

    if ( "undefined" !== typeof $recipe.children( "name" ) ) {
        this.name = $recipe.children( "name" ).text();
    }
    
    if ( "undefined" !== typeof $recipe.children( "description" ) ) {
        this.description = $recipe.children( "description" ).text();
    }
    
    $recipe.children( "write-bit-in-reg" ).each( function() {
        
        bitInReg = new vscp.wizard.BitInReg({
            bitInReg: $( this )
        });

        bitInRegs.push( bitInReg );
        
    });

    $recipe.children( "write-bit-in-abstraction" ).each( function() {
        
        bitInAbstraction = new vscp.wizard.BitInAbstraction({
            bitInAbstraction: $( this )
        });

        bitInAbstractions.push( bitInAbstraction );
        
    });

    $recipe.children( "write-register" ).each( function() {
        
        register = new vscp.wizard.Register({
            register: $( this )
        });

        registers.push( register );
        
    });
    
    $recipe.children( "write-abstraction" ).each( function() {
        
        abstraction = new vscp.wizard.Abstraction({
            abstraction: $( this )
        });

        abstractions.push( abstraction );
        
    });

    $recipe.children( "messagebox" ).each( function() {
        
        messageBox = new vscp.wizard.MessageBox({
            messageBox: $( this )
        });

        messageBoxes.push( messageBox );
        
    });
    
};

/**
 * Write a recipe.
 *
 * @param {object] options                      - Options
 * @param {vscp.Connection} options.connection  - VSCP connection
 * @param {number] options.nodeId               - Node id
 */
vscp.wizard.Recipe.prototype.write = function( options ) {

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
 * @param {object] options      - Options
 * @param {object} options.mdf  - The mdf as jquery xml object
 *
 * @return {vscp.wizard.Recipe[]} Recipe array
 */
vscp.wizard.getRecipes = function( options ) {

    var recipes = [];
    var recipe  = null;

    if ( "object" !== typeof options.mdf ) {
        console.error( vscp.utility.getTime() + " MDF object is missing." );
        return recipes;
    }
    
    // Get all recipes
    options.mdf.find( "vscp > module > setup > recipe" ).each( function() {
        
        recipe = new vscp.wizard.Recipe({
            recipe: $( this ),
            mdf: options.mdf
        });
        
        recipes.push( recipe );

    });
    
    return recipes;
};

