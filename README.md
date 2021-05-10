<h1>VSCP & Friends - HTML5 UX demos</h1>

<img src="http://vscp.org/images/logo.png" width="200px" alt="VSCP logo">

This is the VSCP HTML5 user interface component framework which 
can be used to create nice and responsible user interfaces experiences.

The provided demo's are based on websocket and REST interface to the VSCP server.
The interfaces itself are described in the VSCP daemon documentation:
* <a href="https://docs.vscp.org/vscpd/latest/#/rest_protocol">REST</a>
* <a href="https://docs.vscp.org/vscpd/latest/#/websocket_interface">Websocket</a>

If you want to know more about the <a href="http://www.vscp.org">VSCP project</a> visit the VSCP web site.

Everything is released under the <a href="http://opensource.org/licenses/MIT">MIT License</a>.

<h4>Getting started</h4>

On a standard system install this full source tree at /var/lib/vscp/web/html (programdata/vscp/web/html on windows) 
or other folder set in <b>&lt;document_root&gt;...&lt;/document_root&gt;</b> directive under the 
<b>&lt;websrver&gt;</b> tag in the /etc/vscp/vscpd.conf file of the VSCP daemon.

If you just want the VSCP websocket or REST javascript code you find it in the 'js/vscp-js' folder.
Or get them from its repository:<a href="https://github.com/grodansparadis/vscp-js/">https://github.com/grodansparadis/vscp-js/</a>
You should probably compress this javascript file for a production system. There are plenty of them around <a href="http://javascriptcompressor.com">this</a> is one of them.

<h4>Demos</h4>

You will find the demo code in the <b>demos</b> subfolder. The *index.html* file in it will take you to it and give some further instructions.

The folder contains a few demos on how to use VSCP widgets and demonstrates the VSCP daemon websocket and REST interface.

To test that everything is working enter

<b>http://localhost:8884/demos/authentication/authentication.html</b>

or

<b>https://localhost:8843/demos/authentication/authentication.html</b>

for SSL.

and you should get the start page which takes you thru the rest of the demo..

Some useful commands for the vanilla test window

<h5>5 Turn ON  Zone=1, Subzone=35</h5>
<b>send 0,30,5,0,0,-,0,1,35</b>

<h5>6 Turn Off</h5>
<b>send 0,30,6,0,0,-,0,1,35</b>

<h5>7 Start</h5>
</b>send 0,30,7,0,0,-,0,1,35</b>

<h5>8 stop</h5>
</b>send 0,30,8,0,0,-,0,1,35</b>

send head,class,type,obid,time-stamp,GUID,data1,data2,data3....

<br><br>
<hr>
Copyright &copy; 2015-2021 Andreas Merkle (vscp@blue-andi.de)<br />
Copyright &copy; 2012-2020 <a href="https://www.vscp.org">Ake Hedman, the VSCP Project</a>
