vscp.write("HTTP/1.0 200 OK\r\n")
vscp.write("Content-Type: text/html\r\n")
vscp.write("\r\n")
vscp.write([[<html><body>
  <p>Lua error handler:</p>
  <p>Status code: ]])

vscp.write(tostring(vscp.request_info.status))

vscp.write([[</p>
</body></html>
]])
