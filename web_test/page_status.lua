vscp.write("HTTP/1.0 200 OK\r\n")

-- MIME type: https://www.ietf.org/rfc/rfc4627.txt, chapter 6
vscp.write("Content-Type: application/json\r\n")

vscp.write("\r\n")

num_threads = vscp.get_option("num_threads")
num_threads = tonumber(num_threads)


function n(s)
  if ((type(s) == "string") and (#s > 0)) then
    return s
  else
    return "null"
  end
end


vscp.write("{\r\n\"system\" :\r\n")

vscp.write(n(vscp.get_info("system")))

vscp.write(",\r\n\"summary\" :\r\n")
vscp.write(n(vscp.get_info("context")))
vscp.write(",\r\n\"common\" :\r\n")
vscp.write(n(vscp.get_info("common")))
vscp.write(",\r\n\"connections\" :\r\n[\r\n")

  vscp.write(n(vscp.get_info("connection", 1)))

for i=2,num_threads do
  vscp.write(",\r\n")
  vscp.write(n(vscp.get_info("connection", i)))
end
vscp.write("]\r\n}\r\n")
