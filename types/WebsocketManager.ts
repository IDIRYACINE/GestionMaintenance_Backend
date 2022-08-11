
    
    enum socketEvents {
        onConnection = "connection",
    }
    
    type createSocket = () => void 

    type broadcastMessage = (type:String , message : Message) => void

    type connectToSocket = (data:ConnectionRequest) => void

    interface Message {
        data : any
    }

    interface ConnectionRequest{
        authToken : string
    }

    interface WebsocketManager {
        broadcastMessage : broadcastMessage,
    }

