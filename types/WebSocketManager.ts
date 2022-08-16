
    type Server = import('http').Server
    type SocketEvents = import('../configs/SpecialEnums').socketEvents

    type broadcastMessage = (type:SocketEvents , jsonMessage : Message) => void

    type connectToSocket = (connRequest: ConnectionRequest) => void

    type createSocket = (server : Server) => void

    interface Message {
        type : SocketEvents
        data : any
    }

    interface ConnectionRequest{
        authToken : string
    }

    interface WebsocketManager {
        broadcastMessage : broadcastMessage,
        connectToSocket : connectToSocket,
        createSocket : createSocket
    }

