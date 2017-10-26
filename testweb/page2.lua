vscp.write("HTTP/1.0 200 OK\r\n")
vscp.write("Content-Type: text/html\r\n")
vscp.write("\r\n")
vscp.write([[<html><body>

<p>This is another example of a Lua server page, served by
<a href="https://github.com/civetweb/civetweb">CivetWeb web server</a>.
</p><p>
The following features are available:
<ul>
]])

function print_if_available(tab, name)
  if tab then
    vscp.write("<li>" .. name .. "</li>\n")
  end
end

function recurse(tab, excl)
  excl = excl or {}
  vscp.write("<ul>\n")
  for k,v in pairs(tab) do
    if type(v) == "table" then
      vscp.write("<li>" .. tostring(k) .. ":</li>\n")
      if excl[v] then
        -- cyclic
      else
        excl[v] = true
        recurse(v, excl)
        excl[v] = false
      end
    else
      vscp.write("<li>" .. tostring(k) .. " = " .. tostring(v) .. "</li>\n")
    end
  end
  vscp.write("</ul>\n")
end

-- Print Lua version and available libraries
vscp.write("<li>" .. _VERSION .. " with the following standard libraries</li>\n")
vscp.write("<ul>\n")
libs = {"string", "math", "table", "io", "os", "bit32", "utf8", "package", "coroutine", "debug"};
for _,n in ipairs(libs) do
  print_if_available(_G[n], n);
end
vscp.write("</ul>\n")
print_if_available(sqlite3, "sqlite3 binding")
print_if_available(lfs, "lua file system")

--recurse(_G)

-- Print mg library
libname = "mg"
print_if_available(_G[libname], libname .. " library")
recurse(_G[libname])

-- Print connect function
print_if_available(connect, "connect function")

-- Get all server options
vscp.write("<li>server options</li>\n")
recurse(vscp.get_option())

vscp.write("</ul></p>\n");
vscp.write("<p> Today is " .. os.date("%A") .. "</p>\n");

l = vscp.request_info.content_length
if l then
  vscp.write("<p>Content-Length = "..l..":<br>\n<pre>\n")
  vscp.write(vscp.read())
  vscp.write("\n</pre>\n</p>\n")
end

vscp.write("<p>\n");

 if lfs then
  vscp.write("Files in " .. lfs.currentdir())
  vscp.write("\n<ul>\n")
  for f in lfs.dir(".") do
    local mime = vscp.get_mime_type(f)
    vscp.write("<li>" .. f .. " (" .. mime .. ")</li>\n")
    local at = lfs.attributes(f);
    recurse(at)
  end
  vscp.write("</ul>\n")
end

vscp.write([[
</p>
</body></html>
]])
