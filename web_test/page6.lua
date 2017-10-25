vscp.write("HTTP/1.0 200 OK\r\n")
vscp.write("Content-Type: text/plain\r\n")
vscp.write("\r\n")
vscp.write(vscp.request_info.request_method .. " " .. vscp.request_info.request_uri .. "  HTTP/" .. vscp.request_info.http_version .. "\r\n")
for k,v in pairs(vscp.request_info.http_headers) do
  vscp.write(k .. ": " .. v .. "\r\n")
end
vscp.write("\r\n")

repeat
  local r = vscp.read()
  if (r) then
    vscp.write(r)
  end
until not r
