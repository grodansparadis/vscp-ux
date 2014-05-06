This is the working frame for the tool UI magition for Multi floor House project 
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
   multiFloorsSocketCfg.js  --> /lib/
   multiFloorCfg.js         --> /lib/
   multiFloorScript.js      --> /lib/
   multiFloorStyle.css      --> /css/
   multi_floor.html         --> /testws/


How to add a floor to UI
========================

1> You will have to put an <div> for your floor inside the following div <div id="images" class="scrollable">.
2> You can copy an already existing <div> modify it & paste it in the <div id="images" class="scrollable">.
3> Add ID of your div to following file multiFloorCfg.js :-
   # In array div_class_scrollable_Image[] --> add the ID of your floor image
   # In array div_class_scrollable_Hr[] --> add the ID of your floor HR line
4. try to keep the index of both the ID same in both the array.



How to Remove a floor from UI
=============================

Reverese the steps perfromed above.



How to add rooms to a floor
===========================
1> See some already existing example & try to adapt as per that.
2> Add the rooms to the following div <div id="Menu" class="scrollableMenu">.
3> Keep the class name same for all the rooms in same floor.
4> Add ID of your div to following file multiFloorCfg.js :-
   # In array floor_area_id[] --> add the ID of your room class (which is common for all the rooms in same floor)
   # In array floor_area_id[] --> add the ID of your room class
   # Add seprate Image & text array for your floor rooms --> example div_class_Floor_3_Area_Images & div_class_Floor_3_Area_Txt
5> Also modify the onclick() function of each room taking into refrence the existing examples.



How to Remove rooms from a floor
===========================

Reverese the steps perfromed above.



How to add device to the room
===========================
1> You can copy an already existing <div> for device & modify it & paste it in the <div id="center" class="scrollableCenter">.
2> Keep the same class name for all the devices in same room.
3> Add ID of your room devices class to following file multiFloorCfg.js :-
   # In array central_area_widgets_id[] --> add the ID of your room devices class


How to Remove device from a room
===========================

Reverese the steps perfromed above.


How to create websocket connection for your every I/O digital device in your UI
===============================================================================

1> Add websocket configuration of your device to following file multiFloorsSocketCfg.js :-
   # In the following array Multi_Floor_Device_Array[] --> add an entry of your device.
2> compy already existing device entry & modify it.
   # change the IP address of websocket.
   # change the ID of your image.
   # change the Tx/Rx events for ON/OFF.


How to create websocket connection for your every Measurement device in your UI
===============================================================================

1> Add websocket configuration of your Measurement device to following file multiFloorsSocketCfg.js :-
   # In the following array Multi_Floor_Temperature_Device_Array[] --> add an entry of your device.
2> compy already existing device entry & modify it.
   # change the IP address of websocket.
   # change the ID of your image.
   # change the class, type, sensor index, decimals.


NOTE :--
# vscpwslib_mod.js file is same for single & multifloor house UI.


Enjoy ... !!!
