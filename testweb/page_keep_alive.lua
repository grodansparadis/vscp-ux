-- Set keep_alive. The return value specifies if this is possible at all.
canKeepAlive = vscp.keep_alive(true)

if canKeepAlive then
    -- Create the entire response in a string variable first. Content-Length will be set to the length of this string.
    reply = [[
        <html><body>
        <p>This is a Lua script supporting html keep-alive with the
        <a href="https://github.com/civetweb/civetweb/">CivetWeb web server</a>.
        </p>
        <p>It works by setting the Content-Length header field properly.
        </body></html>
    ]]
else
    reply = "<html><body>Keep alive not possible!</body></html>"
end

-- First send the http headers
vscp.write("HTTP/1.1 200 OK\r\n")
vscp.write("Content-Type: text/html\r\n")
vscp.write("Date: " .. os.date("!%a, %d %b %Y %H:%M:%S") .. " GMT\r\n")
vscp.write("Cache-Control: no-cache\r\n")

if canKeepAlive then
    vscp.write("Content-Length: " .. tostring(string.len(reply)) .. "\r\n")
    vscp.write("Connection: keep-alive\r\n")
else
    vscp.write("Connection: close\r\n")
end
vscp.write("\r\n")

-- Finally send the content
vscp.write(reply)
