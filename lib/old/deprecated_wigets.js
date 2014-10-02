

//*****************************************************************************
//                                 vscpws_leddigits
//*****************************************************************************





/////////////////////////////////////////////////////////////////////////////
// vscpws_leddigits
//
// username 	- name to login with to the VSCP server
// passwordhash - Hash for login to VSCP server
// ndigits		- Number of digits
// x            - x-position for leftmost digit
// y            - y-position for leftmost digit.
// ctrlname     - name for control

function vscpws_leddigits( username, password, ndigits, x, y, ctrlname ) {

        this.count = ndigits;
        var maxvalue = Math.pow(10, count) - 1;
        this.maxvalue = maxvalue;
        this.x = x;
        this.y = y;
        this.name = ctrlname;
        // Preload redled0 image
        image_redled0 = new Image();
        image_redled0.src = "../lib/widgets/digit/redled0.png";
        // Preload redled1 image
        image_redled1 = new Image();
        image_redled1.src = "../lib/widgets/digit/redled1.png";
        // Preload redled2 image
        image_redled2 = new Image();
        image_redled2.src = "../lib/widgets/digit/redled2.png";
        // Preload redled3 image
        image_redled3 = new Image();
        image_redled3.src = "../lib/widgets/digit/redled3.png";
        // Preload redled4 image
        image_redled4 = new Image();
        image_redled4.src = "../lib/widgets/digit/redled4.png";
        // Preload redled5 image
        image_redled5 = new Image();
        image_redled5.src = "../lib/widgets/digit/redled5.png";
        // Preload redled6 image
        image_redled6 = new Image();
        image_redled6.src = "../lib/widgets/digit/redled6.png";
        // Preload redled7 image
        image_redled7 = new Image();
        image_redled7.src = "../lib/widgets/digit/redled7.png";
        // Preload redled8 image
        image_redled8 = new Image();
        image_redled8.src = "../lib/widgets/digit/redled8.png";
        // Preload redled9 image
        image_redled9 = new Image();
        image_redled9.src = "../lib/widgets/digit/redled9.png";
        // Preload redledE image
        image_redledE = new Image();
        image_redledE.src = "../lib/widgets/digit/redledE.png";
        // Preload redledall image
        image_redledall = new Image();
        image_redledall.src = "../lib/widgets/digit/redled8source.png";
        // Preload redledoff image
        image_redledoff = new Image();
        image_redledoff.src = "../lib/widgets/digit/redledoff.png";
}

///////////////////////////////////////////////////////////////////////////////
// init
//

vscpws_leddigits.prototype.init = function() {
    this.jg = new jsGraphics(this.name);
    this.jg.setPrintable(true);
    
    // All led's off
    for (i = 0; i < this.count; i++) {
        this.jg.drawImage(image_redledoff.src, this.x + 40 * i, this.y);
    }
    
    this.jg.paint();
}

///////////////////////////////////////////////////////////////////////////////
// setDigit
//

vscpws_leddigits.prototype.setDigit = function(digit, pos) {

    switch (digit) {

        case '0':
            this.jg.drawImage(image_redled0.src, this.x + 40 * pos, this.y);
            break;
            
        case '1':
            this.jg.drawImage(image_redled1.src, this.x + 40 * pos, this.y);
            break;
            
        case '2':
            this.jg.drawImage(image_redled2.src, this.x + 40 * pos, this.y);
            break;
            
        case '3':
            this.jg.drawImage(image_redled3.src, this.x + 40 * pos, this.y);
            break;
            
        case '4':
            this.jg.drawImage(image_redled4.src, this.x + 40 * pos, this.y);
            break;
            
        case '5':
            this.jg.drawImage(image_redled5.src, this.x + 40 * pos, this.y);
            break;
            
        case '6':
            this.jg.drawImage(image_redled6.src, this.x + 40 * pos, this.y);
            break;
            
        case '7':
            this.jg.drawImage(image_redled7.src, this.x + 40 * pos, this.y);
            break;
            
        case '8':
            this.jg.drawImage(image_redled8.src, this.x + 40 * pos, this.y);
            break;
            
        case '9':
            this.jg.drawImage(image_redled9.src, this.x + 40 * pos, this.y);
            break;
            
        case 'E':
            this.jg.drawImage(image_redledE.src, this.x + 40 * pos, this.y);
            break;
            
        case 'A':
            this.jg.drawImage(image_redledall.src, this.x + 40 * pos, this.y);
            break;
           
        case ' ':        
        default:
            this.jg.drawImage(image_redledoff.src, this.x + 40 * pos, this.y);
            break;
    }
    
    // Draw it
    this.jg.paint();
}

///////////////////////////////////////////////////////////////////////////////
// setValue
//

vscpws_leddigits.prototype.setValue = function(value) {

    if (value <= this.maxvalue) {
        value = value.toFixed();
        var str = value.toString(10);
        var pos = str.length - 1; // Start at end

        for (i = this.count; i > 0; i--) {
            if (pos >= 0) {
                //alert(str[pos]);
                this.setDigit( str[pos], i - 1);
            }
            else {
                this.setDigit(' ', i - 1);
            }
            pos--;
        }
    }   
    else {
        for (i = 0; i < this.count; i++) {
            this.setDigit('E', i);
        }
    }
}





//*****************************************************************************
//                                 vscpws_buttondigits
//*****************************************************************************





/////////////////////////////////////////////////////////////////////////////
// vscpws_buttondigits
//
// username 	- name to login with to the VSCP server
// passwordhash - Hash for login to VSCP server
// ndigits		- Number of digits
// x            - x-position for leftmost digit
// y            - y-position for leftmost digit.
// ctrlname     - name for control

function vscpws_buttondigits( username, passwordhash, x, y, ndigits, name) {
    
    this.ndigits = ndigits;
    var maxvalue = Math.pow(10, ndigits) - 1;
    this.maxvalue = maxvalue;
    this.x = x;
    this.y = y;
    this.name = name;
    
    // Preload digit0 image
    image_digit0 = new Image();
    image_digit0.src = "../lib/widgets/digit/0.png";
    // Preload digit1 image
    image_digit1 = new Image();
    image_digit1.src = "../lib/widgets/digit/1.png";
    // Preload digit2 image
    image_digit2 = new Image();
    image_digit2.src = "../lib/widgets/digit/2.png";
    // Preload digit3 image
    image_digit3 = new Image();
    image_digit3.src = "../lib/widgets/digit/3.png";
    // Preload digit4 image
    image_digit4 = new Image();
    image_digit4.src = "../lib/widgets/digit/4.png";
    // Preload digit5 image
    image_digit5 = new Image();
    image_digit5.src = "../lib/widgets/digit/5.png";
    // Preload digit6 image
    image_digit6 = new Image();
    image_digit6.src = "../lib/widgets/digit/6.png";
    // Preload digit7 image
    image_digit7 = new Image();
    image_digit7.src = "../lib/widgets/digit/7.png";
    // Preload digit8 image
    image_digit8 = new Image();
    image_digit8.src = "../lib/widgets/digit/8.png";
    // Preload digit9 image
    image_digit9 = new Image();
    image_digit9.src = "../lib/widgets/digit/9.png";
    // Preload numeral image
    image_numeral = new Image();
    image_numeral.src = "../lib/widgets/digit/numeral.png";
    // Preload up image
    image_up = new Image();
    image_up.src = "../lib/widgets/digit/up.png";
    // Preload down image
    image_down = new Image();
    image_down.src = "../lib/widgets/digit/down.png";
}

vscpws_buttondigits.prototype.init = function() {
    this.jg = new jsGraphics(this.name);
    this.jg.setPrintable(true);
    for (i = 0; i < this.ndigits; i++) {
        this.jg.drawImage(image_numeral, this.x + 32 * i, this.y);
    }
    this.jg.paint();
}

vscpws_buttondigits.prototype.setDigit = function(digit, pos) {

    switch (digit) {

        case '0':
            this.jg.drawImage(image_digit0.src, this.x + 32 * pos, this.y);
            break;
        
        case '1':
            this.jg.drawImage(image_digit1.src, this.x + 32 * pos, this.y);
            break;
        
        case '2':
            this.jg.drawImage(image_digit2.src, this.x + 32 * pos, this.y);
            break;
        
        case '3':
            this.jg.drawImage(image_digit3.src, this.x + 32 * pos, this.y);
            break;
        
        case '4':
            this.jg.drawImage(image_digit4.src, this.x + 32 * pos, this.y);
            break;
        
        case '5':
            this.jg.drawImage(image_digit5.src, this.x + 32 * pos, this.y);
            break;
        
        case '6':
            this.jg.drawImage(image_digit6.src, this.x + 32 * pos, this.y);
            break;
        
        case '7':
            this.jg.drawImage(image_digit7.src, this.x + 32 * pos, this.y);
            break;
        
        case '8':
            this.jg.drawImage(image_digit8.src, this.x + 32 * pos, this.y);
            break;
        
        case '9':
            this.jg.drawImage(image_digit9.src, this.x + 32 * pos, this.y);
            break;
        
        case 'E':
            this.jg.drawImage(image_up.src, this.x + 32 * pos, this.y);
            break;
        
        case 'A':
            this.jg.drawImage(image_down.src, this.x + 32 * pos, this.y);
            break;
        
        case ' ':
        default:            
            this.jg.drawImage(image_numeral.src, this.x + 32 * pos, this.y);
            break;
    }
    
    // Draw it
    this.jg.paint();
}

vscpws_buttondigits.prototype.setValue = function(value) {
  
    if (value <= this.maxvalue) {
        
        value = value.toFixed();
        var str = value.toString(10);
        var pos = str.length - 1; // Start at end
    
        for (i = this.ndigits; i > 0; i--) {
            if (pos >= 0) {
                //alert(str[i-1]);
                this.setDigit(str[pos], i - 1);
            }
            else {
                this.setDigit(' ', i - 1);
            }
            pos--;
        }
    }
    else {
        for (i = 0; i < this.ndigits; i++) {
            this.setDigit('E', i);
        }
    }
}







//*****************************************************************************
//                                 vscpws_buttondigits
//*****************************************************************************





/////////////////////////////////////////////////////////////////////////////
// buttonblack
//

function vscpws_buttonblack(username, passwordhash, x, y, handler, name) {

   this.x = x;
        this.y = y;
        this.name = name;
        this.handler = handler;
        // Preload up image
        image_up = new Image();
        image_up.src = "../lib/widgets/button/pressoff.png";
        // Preload down image
        image_down = new Image();
        image_down.src = "../lib/widgets/button/presson.png";
        this.jg = new jsGraphics(this.name);
        this.jg.setPrintable(true);
        this.jg.drawImage(image_up.src, this.x, this.y, 48, 64, this.handler);
        this.jg.paint();
        obj = getObjectClass(this);
        alert(getVarName(tre));
}

/* Returns the class name of the argument or undefined if
 it's not a valid JavaScript object.
 */
function vscpws_getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
    var arr = obj.constructor.toString().match(
        /function\s*(\w+)/);
        if (arr && arr.length == 2) {
            return arr[1];
        }
    }
    
    return undefined;
}

vscpws_buttonblack.prototype.onMouseOver = function() {
//alert("onOver");
this.jg.clear();
        this.jg.drawImage(image_down.src, this.x, this.y, 48, 64, this.handler);
        this.jg.paint();
}

vscpws_buttonblack.prototype.onMouseOut = function() {
//alert("onOver");
this.jg.clear();
        this.jg.drawImage(image_up.src, this.x, this.y, 48, 64, this.handler);
        this.jg.paint();
}

vscpws_buttonblack.prototype.onMouseDown = function() {
//alert("onMouseDown");
}

vscpws_buttonblack.prototype.onMouseUp = function() {
//alert("onMouseUp");
}
