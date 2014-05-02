/*
  Author = Dinesh Guleria
  VSCP Developer
  Date : 27-3-2014
*/


/* Packet format for each device socket */
var Single_Floor_Device_Array = [
  /* Area Bedroom */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Bedroom_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 1,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 1,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 1,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 1
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Floor_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 2,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 2,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 2,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 2
  },

/*  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Temperature', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 3,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 3,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 3,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 3
  },*/

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Front_Door', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 4,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 4,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 4,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 4
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 5,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 5,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 5,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 5
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 6,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 6,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 6,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 6
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_Television', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 7,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 7,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 7,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 7
  },
  /* Area Kitchen */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Kitchen_Gas', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 8,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 8,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 8,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 8
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Kitchen_Refrigrator', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 9,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 9,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 9,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 9
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Kitchen_Oven', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 10,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 10,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 10,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 10
  },
  /* Area Drawing Room */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Drawing_Room_Top_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 11,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 11,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 11,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 11
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Drawing_Room_Fan_1', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 12,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 12,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 12,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 12
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Drawing_Room_Heater', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 13,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 13,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 13,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 13
  },
  /* Area Lobby */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Lobby_Shandelier', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 14,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 14,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 14,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 14
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Lobby_Tube_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 15,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 15,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 15,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 15
  },
  /* Area Bedroom 1 */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_1_Shandelier', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 16,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 16,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 16,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 16
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_1_Tube_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 17,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 17,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 17,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 17
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_1_Fan_2', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 18,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 18,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 18,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 18
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_1_Heater_Blower', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 19,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 19,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 19,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 19
  },
  /* Area Bedroom 2 */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_2_Air_Conditioner', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 20,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 20,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 20,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 20
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_2_Music_Player', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 21,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 21,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 21,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 21
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Bedroom_2_Door_Lock', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 22,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 22,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 22,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 22
  },
  /* Area Couridoor */
  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Couridoor_Fan_3', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 23,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 23,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 23,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 23
  },

  { url: 'ws://192.168.65.146:7681', canvasName: 'Area_Couridoor_Top_Light', bLocal: 'false' , btnType: 94 , bNoState: 'true',
    onTxEventvscpclass: 30, onTxEventvscptype: 5, onTxEventdata: undefined, onTxEventguid: undefined,   onTxEventindex: 0, onTxEventzone: 0,  onTxEventsubzone: 24,
    offTxEventvscpclass: 30, offTxEventvscptype: 6, offTxEventdata: undefined, offTxEventguid: undefined,   offTxEventindex: 0, offTxEventzone: 0,  offTxEventsubzone: 24,
    onRxEventvscpclass: 20, onRxEventvscptype: 3, onRxEventdata: undefined, onRxEventguid: undefined,   onRxEventindex: 0, onRxEventzone: 0,  onRxEventsubzone: 24,
    offRxEventvscpclass: 20, offRxEventvscptype: 4, offRxEventdata: undefined, offRxEventguid: undefined,   offRxEventindex: 0, offRxEventzone: 0,  offRxEventsubzone: 24
  }
];
