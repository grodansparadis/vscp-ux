/*
  Author = Dinesh Guleria
  VSCP Developer
  Date : 27-3-2014
*/


/* Packet format for each device socket */
var Multi_Floor_Device_Array = [
  /* Ground floor devices */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Bedroom_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 1,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 1,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 1,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 1
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Floor_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 2,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 2,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 2,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 2
  },

/*  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Temperature', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 3,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 3,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 3,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 3
  },*/

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Front_Door', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 4,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 4,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 4,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 4
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 5,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 5,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 5,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 5
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 6,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 6,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 6,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 6
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_Image_Television', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 7,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 7,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 7,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 7
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Drawing_Room_Top_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 8,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 8,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 8,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 8
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Drawing_Room_Fan_1', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 9,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 9,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 9,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 9
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Drawing_Room_Heater', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 10,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 10,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 10,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 10
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Kitchen_Gas', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 11,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 11,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 11,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 11
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Kitchen_Refrigrator', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 12,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 12,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 12,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 12
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Kitchen_Oven', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 13,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 13,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 13,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 13
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Lobby_Shandelier', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 14,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 14,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 14,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 14
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Lobby_Tube_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 15,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 15,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 15,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 15
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_1_Shandelier', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 16,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 16,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 16,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 16
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_1_Tube_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 17,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 17,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 17,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 17
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_1_Fan_2', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 18,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 18,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 18,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 18
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_1_Heater_Blower', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 19,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 19,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 19,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 19
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_3_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 20,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 20,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 20,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 20
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_3_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 21,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 21,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 21,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 21
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Bedroom_3_Door_Lock', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 22,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 22,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 22,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 22
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Couridoor_Fan_3', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 23,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 23,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 23,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 23
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Ground_Floor_Area_Couridoor_Top_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 24,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 24,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 24,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 24
  },

  /* First Floor Devices */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_1_Area_Bedroom_1_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 25,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 25,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 25,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 25
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_1_Area_Bedroom_1_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 26,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 26,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 26,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 26
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_1_Area_Bedroom_1_Television', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 27,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 27,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 27,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 27
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_1_Area_Couridoor_Fan_4', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 28,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 28,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 28,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 28
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_1_Area_Couridoor_Top_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 29,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 29,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 29,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 29
  },
  /* Second floor devices */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Kitchen_Gas', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 30,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 30,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 30,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 30
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Kitchen_Refrigrator', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 31,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 31,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 31,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 31
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Kitchen_Oven', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 32,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 32,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 32,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 32
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Bedroom_1_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 33,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 33,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 33,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 33
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Bedroom_1_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 34,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 34,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 34,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 34
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Bedroom_1_Television', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 35,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 35,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 35,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 35
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Bedroom_2_Study_Lamp', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 36,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 36,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 36,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 36
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_2_Area_Bedroom_2_Tap', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 37,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 37,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 37,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 37
  },
  /* Third floor devices */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Bedroom_1_Refrigrator', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 38,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 38,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 38,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 38
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Bedroom_1_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 39,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 39,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 39,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 39
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Bedroom_1_Radio', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 40,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 40,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 40,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 40
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Couridoor_Air_Cooling', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 41,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 41,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 41,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 41
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Couridoor_Almira_Lock', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 42,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 42,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 42,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 42
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Balcony_Fan_5', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 43,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 43,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 43,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 43
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Floor_3_Area_Balcony_Flood_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 44,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 44,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 44,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 44
  }
];
