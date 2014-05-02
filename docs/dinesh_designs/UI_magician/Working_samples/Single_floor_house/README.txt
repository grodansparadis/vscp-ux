This is the working frame for the tool UI magition for Single floor House project 
a user interface for VSCP & Friends.
====================================================================
Copyright C 2013-2014 Dinesh Guleria, Vscp developer


Images need 
===========

1> Do git pull, i have already added the images needed by this UI
/lib/widgets/lightbulb/glossy-light-bulb.jpg
/lib/widgets/lightbulb/light-bulb-icon.jpg
/lib/widgets/thermometer/temprature_indicator.png
/lib/widgets/room/room_unselected.png
/lib/widgets/info/info.jpg
/lib/widgets/room/room_selected.jpg

2> Copy following files to respective folder :
   singleFloorsSocketCfg.js  --> /lib/
   singleFloorCfg.js         --> /lib/
   singleFloorScript.js      --> /lib/
   singleFloorStyle.css      --> /css/
   single_floor.html         --> /testws/

How to add a Room to UI
========================

1> You will have to put an <div> for your room inside the following div <div id="images" class="scrollable">.
2> You can copy an already existing <div> modify it & paste it in the <div id="images" class="scrollable">.
3> Add ID of your div to following file singleFloorCfg.js :-
   # In array div_class_scrollable_Image[] --> add the ID of your floor image
   # In array div_class_scrollable_Hr[] --> add the ID of your floor HR line
4. try to keep the index of both the ID same in both the array.



How to Remove rooms from a floor
=============================

Reverese the steps perfromed above.



How to add device to the room
===========================
1> You can copy an already existing <div> for device & modify it & paste it in the <div id="center" class="scrollableCenter">.
2> Keep the same class name for all the devices in same room.
3> Add ID of your room devices class to following file singleFloorCfg.js :-
   # In array central_area_widgets_id[] --> add the ID of your room devices class


How to Remove device from a room
===========================

Reverese the steps perfromed above.




How to create websocket connection for your every I/O digital device in your UI
===============================================================================

1> Add websocket configuration of your device to following file singleFloorsSocketCfg.js :-
   # In the following array Single_Floor_Device_Array[] --> add an entry of your device.
2> compy already existing device entry & modify it.
   # change the IP address of websocket.
   # change the ID of your image.
   # change the Tx/Rx events for ON/OFF.


NOTE :--
# vscpwslib_mod.js file is same for single & multifloor house UI.

Enjoy ... !!!