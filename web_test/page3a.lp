HTTP/1.0 200 OK
Content-Type: text/html

<html><body>


<p>This is a test page of vscp.include in a Lua server page, served by the
<a href="https://github.com/civetweb/civetweb/">CivetWeb web server</a>.
</p><p>
<?
  script = "test/page2.lp"
  vscp.write("Output of " .. script .. " (path type: \"abs\"):\n")
?>
</p><p>
<?
  vscp.include(script, "abs")
?>
</p>

</body></html>
