-- Set keep_alive. The return value specifies if this is possible at all.
canKeepAlive = vscp.keep_alive(true)
now = os.date("!%a, %d %b %Y %H:%M:%S")

-- First send the http headers
vscp.write("HTTP/1.1 200 OK\r\n")
vscp.write("Content-Type: text/html\r\n")
vscp.write("Date: " .. now .. " GMT\r\n")
vscp.write("Cache-Control: no-cache\r\n")
vscp.write("Last-Modified: " .. now .. " GMT\r\n")
if not canKeepAlive then
    vscp.write("Connection: close\r\n")
    vscp.write("\r\n")
    vscp.write("<html><body>Keep alive not possible!</body></html>")
    return
end
if vscp.request_info.http_version ~= "1.1" then
    -- wget will use HTTP/1.0 and Connection: keep-alive, so chunked transfer is not possible
    vscp.write("Connection: close\r\n")
    vscp.write("\r\n")
    vscp.write("<html><body>Chunked transfer is only possible for HTTP/1.1 requests!</body></html>")
    vscp.keep_alive(false)
    return
end

-- use chunked encoding (http://www.jmarshall.com/easy/http/#http1.1c2)
vscp.write("Cache-Control: max-age=0, must-revalidate\r\n")
--vscp.write("Cache-Control: no-cache\r\n")
--vscp.write("Cache-Control: no-store\r\n")
vscp.write("Connection: keep-alive\r\n")
vscp.write("Transfer-Encoding: chunked\r\n")
vscp.write("\r\n")

-- function to send a chunk
function send(str)
    local len = string.len(str)
    vscp.write(string.format("%x\r\n", len))
    vscp.write(str.."\r\n")
end

-- send the chunks
send("<html>")
send("<head><title>Civetweb Lua script chunked transfer test page</title></head>")
send("<body>\n")

fileCnt = 0
if lfs then
    send("Files in " .. lfs.currentdir())
    send('\n<table border="1">\n')
    send('<tr><th>name</th><th>type</th><th>size</th></tr>\n')
    for f in lfs.dir(".") do
        local at = lfs.attributes(f);
        if at then
          send('<tr><td>' .. f .. '</td><td>' .. at.mode .. '</td><td>' .. at.size .. '</td></tr>\n')
        end
        fileCnt = fileCnt + 1
    end
    send("</table>\n")
end

send(fileCnt .. " entries (" .. now .. " GMT)\n")
send("</body>")
send("</html>")

-- end
send("")
