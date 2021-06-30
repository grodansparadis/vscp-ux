# VSCP & Friends - HTML5 UX demos

<img src="https://vscp.org/images/logo.png" width="200px" alt="VSCP logo">

This is the VSCP HTML5 user interface component framework which 
can be used to create nice and responsible user interfaces experiences.

The provided demo's are based on websocket and REST interface to the VSCP server.
The interfaces itself are described in the VSCP daemon documentation:
* [REST](https://docs.vscp.org/vscpd/latest/#/rest_protocol)
* [Websocket](https://docs.vscp.org/vscpd/latest/#/websocket_interface)

If you want to know more about the [VSCP project](https://www.vscp.org) visit the VSCP web site.

Everything is released under the [MIT License](https://opensource.org/licenses/MIT).

## Getting started

On a standard system install this full source tree at /var/lib/vscp/web/html (programdata/vscp/web/html on windows) 
or other folder set in <b>&lt;document_root&gt;...&lt;/document_root&gt;</b> directive under the 
<b>&lt;websrver&gt;</b> tag in the /etc/vscp/vscpd.conf file of the VSCP daemon.

If you just want the VSCP websocket or REST javascript code you find it in the 'js/vscp-js' folder.
Or get them from its repository: https://github.com/grodansparadis/vscp-js/

You should probably compress this javascript file for a production system. There are plenty of them around [this](https://javascriptcompressor.com) is one of them.

### Testing

You can use the **do_web_download** script to download this code to your local setup. Go to the folder where you want to set up the demo pages. If you are testing the [vsclp2drv-websrv](https://github.com/grodansparadis/vscpl2drv-websrv) this is typically the _/var/lib/vscp/web/html/_ folder.  In this folder issue

```
curl https://raw.githubusercontent.com/grodansparadis/vscp-ux/master/do_web_download | bash
```

This will download the latest pages.

Now restart you should be able to test the web server, websockets and the rest interface.

## Demos

You will find the demo code in the <b>demos</b> subfolder. The *index.html* file in it will take you to it and give some further instructions.

The folder contains a few demos on how to use VSCP widgets and demonstrates the VSCP daemon websocket and REST interface.

To test that everything is working enter

http://localhost:8884/demos/authentication/authentication.html

or

https://localhost:8843/demos/authentication/authentication.html

for a TLS/SSL setup.

and you should get the start page which takes you thru the rest of the demo..

### Useful test commands

Some useful commands for the vanilla test window

### 5 Turn ON  Zone=1, Subzone=35
<b>send 0,30,5,0,0,-,0,1,35</b>

### 6 Turn Off
<b>send 0,30,6,0,0,-,0,1,35</b>

### 7 Start
</b>send 0,30,7,0,0,-,0,1,35</b>

### 8 stop
</b>send 0,30,8,0,0,-,0,1,35</b>

send head,class,type,obid,time-stamp,GUID,data1,data2,data3....


---
Copyright &copy; 2015-2021 Andreas Merkle (vscp@blue-andi.de)<br />
Copyright &copy; 2012-2021 <a href="https://www.vscp.org">Ake Hedman, the VSCP Project</a>
