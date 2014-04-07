<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
<title>Temperature widget 1</title>

<script type="text/javascript" src="../lib/wz_jsgraphics.js"></script>
<script type="text/javascript" src="../lib/vscpwslib.js"></script>

</head>

<body>

<h1>Test Lightbulb widget 2</h1>
<br/><br/><br/><br/>
<a href="index.html">Go back to main page</a>

<script type="text/javascript" >
	var lightbulb2 = new vscpws_lightbulb2(<?php echo $_GET["x"]; ?>,<?php echo $_GET["y"]; ?>);
	lightbulb2.init();
	lightbulb2.setvalue(<?php echo $_GET["value"]; ?>);
</script>
</div>
</body>
</html>
