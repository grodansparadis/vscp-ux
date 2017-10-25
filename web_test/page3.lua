-- This test checks if a query string has been given.
-- It sends the file identified by the query string.
-- Do not use it in a real server in this way!

if not vscp.request_info.query_string then
    vscp.write("HTTP/1.0 200 OK\r\n")
    vscp.write("Connection: close\r\n")
    vscp.write("Content-Type: text/html; charset=utf-8\r\n")
    vscp.write("\r\n")
    vscp.write("<html><head><title>Civetweb Lua script test page 3</title></head>\r\n")
    vscp.write("<body>No query string!</body></html>\r\n")
elseif vscp.request_info.query_string:match("/") or vscp.request_info.query_string:match("\\") then
    vscp.write("HTTP/1.0 403 Forbidden\r\n")
    vscp.write("Connection: close\r\n")
    vscp.write("Content-Type: text/html; charset=utf-8\r\n")
    vscp.write("\r\n")
    vscp.write("<html><head><title>Civetweb Lua script test page 3</title></head>\r\n")
    vscp.write("<body>No access!</body></html>\r\n")
else
    file = vscp.get_var(vscp.request_info.query_string, "file");
    if not file then
        vscp.write("HTTP/1.0 400 Bad Request\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html>\r\n<head><title>Civetweb Lua script test page 3</title></head>\r\n")
        vscp.write("<body>\r\nQuery string does not contain a 'file' variable.<br>\r\n")
        vscp.write("Try <a href=\"?file=page3.lua&somevar=something\">?file=page3.lua&somevar=something</a>\r\n")
        vscp.write("</body>\r\n</html>\r\n")
    else
        filename = vscp.document_root .. "/" .. file
        vscp.send_file(filename)
    end
end
