<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
<title>Temperature widget 1</title>

<link rel="stylesheet" type="text/css" href="../css/example.css" />

<script type="text/javascript" src="../lib/wz_jsgraphics.js"></script>
<script type="text/javascript" src="../lib/vscpwslib.js"></script>

</head>

<body>

<h1>Test button digit</h1>
<br/><br/><br/><br/>
<a href="index.html">Go back to main page</a>

<script type="text/javascript" >
	var buttondigits = new vscpws_buttondigits( <?php echo $_GET["count"]; ?>, <?php echo $_GET["x"]; ?>,<?php echo $_GET["y"]; ?>);
	buttondigits.init();
	buttondigits.setvalue(<?php echo $_GET["value"]; ?>);
</script>
</div>
</body>
</html>
