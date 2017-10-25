-- http://www.html5rocks.com/static/images/cors_server_flowchart.png

if not vscp.request_info.http_headers.Origin and not vscp.request_info.http_headers.origin then

  vscp.write("HTTP/1.0 200 OK\r\n")
  vscp.write("Connection: close\r\n")
  vscp.write("Content-Type: text/html; charset=utf-8\r\n")
  vscp.write("\r\n")
  vscp.write("This test page should not be used directly. Open cors.html instead.")
  return
end

if vscp.request_info.request_method == "OPTIONS" then

  -- Note: This is a test example showing how a script could handle
  -- a preflight request directly. However, now the server is able
  -- to handle preflight requests, so scripts do no longer need to
  -- do this - except it has been disabled in the server by setting
  -- the access_control_allow_methods configuration parameter to
  -- an empty string.

  local acrm = vscp.request_info.http_headers['Access-Control-Request-Method'];
  if (acrm) then
    local acrh = nil -- vscp.request_info.http_headers['Access-Control-Request-Header'];
    if (acrm~='PUT') then
      -- invalid request
      vscp.write("HTTP/1.0 403 Forbidden\r\n")
      vscp.write("Connection: close\r\n")
      vscp.write("\r\n")
      return
    else
      -- preflight request
      vscp.write("HTTP/1.0 200 OK\r\n")
      vscp.write("Access-Control-Allow-Methods: PUT\r\n")
      if (acrh) then
        vscp.write("Access-Control-Allow-Headers: " .. acrh .. "\r\n")
      end
      vscp.write("Access-Control-Allow-Origin: *\r\n")
      vscp.write("Connection: close\r\n")
      vscp.write("Content-Type: text/html; charset=utf-8\r\n")
      vscp.write("\r\n")
      return
    end
  end
end


-- actual request
if vscp.request_info.request_method == "GET" then

  vscp.write("HTTP/1.0 200 OK\r\n")
  vscp.write("Access-Control-Allow-Origin: *\r\n")
  vscp.write("Connection: close\r\n")
  vscp.write("Content-Type: text/html; charset=utf-8\r\n")
  vscp.write("\r\n")
  vscp.write([[<!DOCTYPE html>
  <html>
  <head><title>CORS dynamic GET test reply - test OK</title></head>
  <body>This should never be shown</body>
  </html>
  ]])
  return
end


if vscp.request_info.request_method == "PUT" then

  vscp.write("HTTP/1.0 200 OK\r\n")
  vscp.write("Access-Control-Allow-Origin: *\r\n")
  vscp.write("Connection: close\r\n")
  vscp.write("Content-Type: text/html; charset=utf-8\r\n")
  vscp.write("\r\n")
  vscp.write([[<!DOCTYPE html>
  <html>
  <head><title>CORS dynamic PUT test reply - test OK</title></head>
  <body>This should never be shown</body>
  </html>
  ]])
  return
end

-- other HTTP method
vscp.write("HTTP/1.0 403 Forbidden\r\n")
vscp.write("Connection: close\r\n")
vscp.write("\r\n")
