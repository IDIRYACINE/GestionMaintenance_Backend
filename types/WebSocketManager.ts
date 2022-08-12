
    // import http from 'http'

    type Server = import('http').Server

    enum socketEvents {
        onConnection = "connection",
    }
    
    type broadcastMessage = (type:string , jsonMessage : Message) => void

    type connectToSocket = (connRequest: ConnectionRequest) => void

    type createSocket = (server : Server) => void

    interface Message {
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

