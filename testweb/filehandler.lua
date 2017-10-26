function send_ok()
	vscp.write("HTTP/1.0 200 OK\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
end


function send_not_found()
	vscp.write("HTTP/1.0 404 Not Found\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
end


handler = "filehandler.lua"
sub_uri = vscp.request_info.uri:sub(#handler+2)
filename = "D:\\civetweb\\civetweb" .. sub_uri
attr = lfs.attributes(filename)

--[[
if not attr then
	send_not_found()
	vscp.write("\r\n")
	vscp.write("File " .. sub_uri .. " not available")
	return
end
]]

if vscp.request_info.request_method == "GET" then
	-- send_file will handle 404 internally
	vscp.send_file(filename)
	return

elseif vscp.request_info.request_method == "HEAD" then
	-- send_file can handle "GET" and "HEAD"
	vscp.send_file(filename)
	return

elseif vscp.request_info.request_method == "PUT" then
	local f = io.open(filename, "w")
	if (not f) then
		vscp.write("HTTP/1.0 500 Internal Server Error\r\n")
		vscp.write("Connection: close\r\n")
		vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
		vscp.write("\r\n")
		return
	end

	vscp.write("HTTP/1.0 201 Created\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
	vscp.write("\r\n")
	repeat
		local buf = vscp.read();
		if (buf) then
			f:write(buf)
		end
	until (not buf);
	f:close()

	vscp.write("HTTP/1.0 201 Created\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
	vscp.write("\r\n")
	return

elseif vscp.request_info.request_method == "DELETE" then
	if not attr then
		send_not_found()
		vscp.write("\r\n")
		vscp.write("File " .. sub_uri .. " not available")
		return
	end
	os.remove(filename)
	vscp.write("HTTP/1.0 204 No Content\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
	vscp.write("\r\n")
	return

elseif vscp.request_info.request_method == "OPTIONS" then
	send_ok()
	vscp.write("Allow: GET, HEAD, PUT, DELETE, OPTIONS\r\n")
	vscp.write("\r\n")
	return

else
	vscp.write("HTTP/1.0 405 Method Not Allowed\r\n")
	vscp.write("Connection: close\r\n")
	vscp.write("Date: " .. os.date("%a, %d %b %Y %H:%M:%S GMT") .. "\r\n")
	vscp.write("\r\n")
	return
end
