
msg=[[<html><body>
<p>Exit CivetWeb</p>
</body></html>
]]

vscp.write("HTTP/1.0 200 OK\r\n")
vscp.write("Connection: close\r\n")
vscp.write("Content-Length: " .. #msg .. "\r\n")
vscp.write("Content-Type: text/html\r\n")
vscp.write("\r\n")
vscp.write(msg)

os.exit(0)
