-- This is a Lua script that handles sub-resources, e.g. resource_script_demo.lua/path/file.ext

scriptUri = "resource_script_demo.lua"
envVar = "resource_script_demo_storage"

resourcedir = os.getenv(envVar) or "R:\\RESOURCEDIR"
method = vscp.request_info.request_method:upper()

if resourcedir then
  attr = lfs.attributes(resourcedir)
end

if (not vscp.request_info.uri:find(scriptUri)) or (not resourcedir) or (not attr) or (attr.mode~="directory") then
    vscp.write("HTTP/1.0 500 OK\r\n")
    vscp.write("Connection: close\r\n")
    vscp.write("Content-Type: text/html; charset=utf-8\r\n")
    vscp.write("\r\n")
    vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
    vscp.write("<body>\r\nServer error.<br>\r\n")
    vscp.write("The server admin must make sure this script is available as URI " .. scriptUri .. "<br>\r\n")
    vscp.write("The server admin must set the environment variable " .. envVar .. " to a directory.<br>\r\n")
    vscp.write("</body>\r\n</html>\r\n")
    return
end
subresource = vscp.request_info.uri:match(scriptUri .. "/(.*)")

if not subresource then
    if method=="GET" then
        vscp.write("HTTP/1.0 200 OK\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>No resource specified.<br>resourcedir is " .. resourcedir .. "</body></html>\r\n")
    else
        vscp.write("HTTP/1.0 405 Method Not Allowed\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Method not allowed.</body></html>\r\n")
    end
    return
end


if method=="GET" then
    file = resourcedir .. "/" .. subresource
    if lfs.attributes(file) then
        vscp.send_file(file)
    else
        mime = vscp.get_mime_type(file)
        vscp.write("HTTP/1.0 404 Not Found\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Resource of type \"" .. mime .. "\" not found.</body></html>\r\n")
    end
    return
end

if method=="PUT" then
    file = resourcedir .. "/" .. subresource
    mime = vscp.get_mime_type(file)
    if lfs.attributes(file) then
        vscp.write("HTTP/1.0 405 Method Not Allowed\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Resource of type \"" .. mime .. "\" already exists.</body></html>\r\n")
    else
        local f = io.open(file, "w")

        local data = {}
        repeat
            local l = vscp.read();
            data[#data+1] = l;
        until ((l == "") or (l == nil));

        f:write(table.concat(data, ""))
        f:close()
        vscp.write("HTTP/1.0 200 OK\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Resource of type \"" .. mime .. "\" created.</body></html>\r\n")
    end
    return
end

if method=="DELETE" then
    file = resourcedir .. "/" .. subresource
    mime = vscp.get_mime_type(file)
    if lfs.attributes(file) then
        os.remove(file)
        vscp.write("HTTP/1.0 200 OK\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Resource of type \"" .. mime .. "\" deleted.</body></html>\r\n")
    else
        mime = vscp.get_mime_type(file)
        vscp.write("HTTP/1.0 404 Not Found\r\n")
        vscp.write("Connection: close\r\n")
        vscp.write("Content-Type: text/html; charset=utf-8\r\n")
        vscp.write("\r\n")
        vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
        vscp.write("<body>Resource of type \"" .. mime .. "\" not found.</body></html>\r\n")
    end
    return
end

-- Any other method
vscp.write("HTTP/1.0 405 Method Not Allowed\r\n")
vscp.write("Connection: close\r\n")
vscp.write("Content-Type: text/html; charset=utf-8\r\n")
vscp.write("\r\n")
vscp.write("<html><head><title>Civetweb Lua script resource handling test</title></head>\r\n")
vscp.write("<body>Method not allowed.</body></html>\r\n")
