-- This test checks the Lua functions:
-- get_var, get_cookie, md5, url_encode

now = os.time()
cookie_name = "civetweb-test-page4"

if vscp.request_info.http_headers.Cookie then
   cookie_value = tonumber(vscp.get_cookie(vscp.request_info.http_headers.Cookie, cookie_name))
end

vscp.write("HTTP/1.0 200 OK\r\n")
vscp.write("Connection: close\r\n")
vscp.write("Content-Type: text/html; charset=utf-8\r\n")
vscp.write("Cache-Control: max-age=0, must-revalidate\r\n")
if not cookie_value then
    vscp.write("Set-Cookie: " .. cookie_name .. "=" .. tostring(now) .. "\r\n")
end
vscp.write("\r\n")

vscp.write("<html>\r\n<head><title>Civetweb Lua script test page 4</title></head>\r\n<body>\r\n")
vscp.write("<p>Test of Civetweb Lua Functions:</p>\r\n");
vscp.write("<pre>\r\n");

-- get_var of query_string
vscp.write("get_var test (check query string):\r\n")
if not vscp.request_info.query_string then
    vscp.write("  No query string. You may try <a href='?a=a1&amp;junk&amp;b=b2&amp;cc=cNotSet&amp;d=a, b and d should be set&amp;z=z'>this example</a>.\r\n")
else
    for _,var in ipairs({'a','b','c','d'}) do
       value = vscp.get_var(vscp.request_info.query_string, var);
       if value then
         vscp.write("  Variable " .. var .. ": value " .. value .. "\r\n");
       else
         vscp.write("  Variable " .. var .. " not set\r\n");
       end
    end
end
vscp.write("\r\n")

-- md5
vscp.write("MD5 test:\r\n")
test_string = "abcd\0efgh"
vscp.write("  String with embedded 0, length " .. string.len(test_string))
test_md5 = vscp.md5(test_string)
vscp.write(", MD5 " .. test_md5 .. "\r\n")
if vscp.md5("") == "d41d8cd98f00b204e9800998ecf8427e" then
    vscp.write("  MD5 of empty string OK\r\n")
else
    vscp.write("  Error: MD5 of empty string NOT OK\r\n")
end
if vscp.md5("The quick brown fox jumps over the lazy dog.") == "e4d909c290d0fb1ca068ffaddf22cbd0" then
    vscp.write("  MD5 of test string OK\r\n")
else
    vscp.write("  Error: MD5 of test string NOT OK\r\n")
end
vscp.write("\r\n")

-- get_cookie
vscp.write("Cookie test:\r\n")
if not cookie_value then
    vscp.write("  Cookie not set yet. Please reload the page.\r\n")
else
    vscp.write("  Cookie set to " .. cookie_value .. "\r\n")
    vscp.write("  You visited this page " .. os.difftime(now, cookie_value) .. " seconds before.\r\n")
end
vscp.write("\r\n")

-- test 'require' of other Lua scripts
vscp.write("require test\r\n")
script_path = vscp.script_name:match("(.*)page%d*.lua")
if type(script_path)=='string' then
    package.path = script_path .. "?.lua;" .. package.path
    vscp.write("  Lua search path: " .. package.path .. "\r\n")
    require "html_esc"
    require "require_test"
    if htmlEscape then
      for i=0,15 do
        vscp.write("  ")
        for j=0,15 do
            vscp.write(tostring(htmlEscape[16*i+j]))
        end
        vscp.write("\r\n")
      end
    else
      vscp.write("  'require' test failed (htmlEscape)\r\n")
    end
    if HugeText then
      vscp.write("\r\n")
      local ht = HugeText(os.date("%a %b. %d"))
      for i=1,#ht do
        vscp.write("  " .. ht[i] .. "\r\n")
      end
    else
      vscp.write("  'require' test failed (HugeText)\r\n")
    end
else
    vscp.write("  name match failed\r\n")
end
vscp.write("\r\n")

-- test get_response_code_text
vscp.write("HTTP helper methods test:\r\n")
if (htmlEscape("<a b & c d>") == "&lt;a b &amp; c d&gt;") then
    vscp.write("  htmlEscape test OK\r\n")
else
    vscp.write("  Error: htmlEscape test NOT OK\r\n")
end
if (vscp.get_response_code_text(200) == "OK") then
    vscp.write("  get_response_code_text test OK\r\n")
else
    vscp.write("  Error: get_response_code_text test NOT OK\r\n")
end
vscp.write("\r\n")

-- url_encode
vscp.write("URL encode/decode test:\r\n")
if vscp.url_encode("") == "" then
    vscp.write("  url_encode of empty string OK\r\n")
else
    vscp.write("  Error: url_encode of empty string NOT OK\r\n")
end
raw_string = [[ !"#$%&'()*+,-./0123456789:;<=>?@]]
vscp.write("  original string: " .. htmlEscape(raw_string) .. "\r\n")
mg_string = vscp.url_encode(raw_string):upper()
ref_string = "%20!%22%23%24%25%26'()*%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40" -- from http://www.w3schools.com/tags/ref_urlencode.asp
vscp.write("  mg-url:        " .. htmlEscape(mg_string) .. "\r\n")
vscp.write("  reference url: " .. htmlEscape(ref_string) .. "\r\n")
dec_mg_string = vscp.url_decode(mg_string)
dec_ref_string = vscp.url_decode(ref_string)
vscp.write("  decoded mg-url:        " .. htmlEscape(dec_mg_string) .. "\r\n")
vscp.write("  decoded reference url: " .. htmlEscape(dec_ref_string) .. "\r\n")
dec_mg_string = vscp.url_decode(mg_string, false)
dec_ref_string = vscp.url_decode(ref_string, false)
vscp.write("  decoded mg-url:        " .. htmlEscape(dec_mg_string) .. "\r\n")
vscp.write("  decoded reference url: " .. htmlEscape(dec_ref_string) .. "\r\n")
dec_mg_string = vscp.url_decode(mg_string, true)
dec_ref_string = vscp.url_decode(ref_string, true)
vscp.write("  decoded mg-url:        " .. htmlEscape(dec_mg_string) .. "\r\n")
vscp.write("  decoded reference url: " .. htmlEscape(dec_ref_string) .. "\r\n")
vscp.write("\r\n")

-- base64_encode
vscp.write("BASE64 encode/decode test:\r\n")
raw_string = [[ !"#$%&'()*+,-./0123456789:;<=>?@]]
vscp.write("  original string:  " .. htmlEscape(raw_string) .. "\r\n")
mg_string = vscp.base64_encode(raw_string)
ref_string = "ICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9A" -- from http://www.base64encode.org/
vscp.write("  mg-base64:        " .. htmlEscape(mg_string) .. "\r\n")
vscp.write("  reference base64: " .. htmlEscape(ref_string) .. "\r\n")
dec_mg_string = vscp.base64_decode(mg_string)
dec_ref_string = vscp.base64_decode(ref_string)
vscp.write("  decoded mg-base64:        " .. htmlEscape(dec_mg_string) .. "\r\n")
vscp.write("  decoded reference base64: " .. htmlEscape(dec_ref_string) .. "\r\n")
vscp.write("\r\n")
raw_string = [[<?> -?-]]
vscp.write("  original string:  " .. htmlEscape(raw_string) .. "\r\n")
mg_string = vscp.base64_encode(raw_string)
ref_string = "PD8+IC0/LQ==" -- from http://www.base64encode.org/
vscp.write("  mg-base64:        " .. htmlEscape(mg_string) .. "\r\n")
vscp.write("  reference base64: " .. htmlEscape(ref_string) .. "\r\n")
dec_mg_string = vscp.base64_decode(mg_string)
dec_ref_string = vscp.base64_decode(ref_string)
vscp.write("  decoded mg-base64:        " .. htmlEscape(dec_mg_string) .. "\r\n")
vscp.write("  decoded reference base64: " .. htmlEscape(dec_ref_string) .. "\r\n")
vscp.write("\r\n")

-- random
vscp.write("Random numbers:\r\n")
for i=1,10 do vscp.write(string.format("%18u\r\n", vscp.random())) end
vscp.write("\r\n")

-- uuid
if vscp.uuid then
vscp.write("UUIDs:\r\n")
for i=1,10 do vscp.write(string.format("%40s\r\n", vscp.uuid())) end
vscp.write("\r\n")
end

-- end of page
vscp.write("</pre>\r\n</body>\r\n</html>\r\n")
