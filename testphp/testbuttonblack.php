<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
<title>Temperature widget 1</title>
<style type="text/css">
body {
  background-image: url("../images/Karnvillan_plan1_800.jpg" );
  background-repeat: no-repeat;
}
</style>
<!--
<link rel="stylesheet" type="text/css" href="../css/example.css" />
-->

<script type="text/javascript" src="../lib/wz_jsgraphics.js"></script>
<script type="text/javascript" src="../lib/vscpwslib.js"></script>

</head>

<body>

<h1>VSCP HTML5 websocket widget buttonblack</h1>

<div id="d1" style="position:relative;height:0px;width:64px;"></div>
<div id="d2" style="position:relative;height:0px;width:64px;"></div>
<div id="d3" style="position:relative;height:0px;width:64px;"></div>
<div id="d4" style="position:relative;height:0px;width:64px;"></div>
<div id="d5" style="position:relative;height:0px;width:64px;"></div>
<div id="d6" style="position:relative;height:0px;width:64px;"></div>

<div id="d10" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d11" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d12" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d13" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d14" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d15" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d16" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d17" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d18" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d19" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d20" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d21" style="position:absolute;top:150px;left:64px;width:200px;"></div>
<div id="d22" style="position:absolute;top:150px;left:64px;width:200px;"></div>

<div id="returnlink" style="position:relative;left:64px;top:550px;width:200px;">
<a href="index.html">Go back to main page</a>
</div>

<script type="text/javascript" >
	//var btn = new vscpws_buttonblack(<?php echo $_GET["x"]; ?>,<?php echo $_GET["y"]; ?>,
	//'onMouseOver="return btn.onMouseOver()" onMouseOut="return btn.onMouseOut()" onMouseDown="return btn.onMouseDown()" onMouseUp="return btn.onMouseUp()"');
	//btn.init();
	//btn.setvalue(<?php echo $_GET["value"]; ?>);
	new vscpws_bbb( "kitchen", 90,   140, "d10", 22, 30 );  	// Kitchen
	new vscpws_bbb( "stydy", 139,  350, "d11", 22, 30 );  		// Study
	new vscpws_bbb( "hal", 300,  350, "d12", 22, 30 );			// Hal
	new vscpws_bbb( "outside1", 110,  30,  "d13", 22, 30 );	// Ouside lamp 1
	new vscpws_bbb( "living1", 240,  210, "d14", 22, 30 );		// Livingroom 1
	new vscpws_bbb( "living2", 340,  70,  "d15", 22, 30 );		// Livingroom 2
	new vscpws_bbb( "toilet", 380,  350, "d16", 22, 30 );		// Toilet
	new vscpws_bbb( "wash", 480,  350, "d17", 22, 30 );		// Washingroom
	new vscpws_bbb( "dining", 480,  210, "d18", 22, 30 );		// Dining room
	new vscpws_bbb( "entrance", 290,  410, "d19", 22, 30 );	// Entrance
	new vscpws_bbb( "outside2", 470,  30,  "d20", 22, 30 );	// Ouside lamp 2
	new vscpws_bbb( "outside3", 290,  0,  "d21", 22, 30 );		// Ouside lamp 3
	new vscpws_bbb( "outside4", 560,  290,  "d22", 22, 30 );		// Ouside lamp 4
</script>

</body>
</html>
