/// <reference path="../../types/WebSocketManager.ts" />

import { Authentication } from "Authentication/Authentication"
import {Server} from "socket.io"
import {Handshake } from 'socket.io/dist/socket'
import { AllowedHeaders, AllowedOrigins } from '../../configs/Configs'

let io : Server

const validatekHandshake = async (handshake : Handshake) : Promise<boolean> =>  {
    return await Authentication.authenticateAccessToken(handshake.query.accessToken as string)
}

const registerSocketEvents = () =>{
    io.on(socketEvents.onConnection , (socket : any) => {
       console.log("New connection")
    })
}

export const websocketManager : WebsocketManager = {

    broadcastMessage: function (type, message): void {

        if(io.engine.clientsCount > 0){
            io.emit(type,message)
        }
    },

    connectToSocket: function (connRequest): void {
        throw new Error("Function not implemented.");
    },

    createSocket: function (server): void {

        if (io !== undefined) {
            return;
        }

        io = new Server(server , {
            cors : {
                origin :AllowedOrigins,
                allowedHeaders: AllowedHeaders,
            }
        })

        io.use((socket,next) => {
            if(validatekHandshake(socket.handshake)){
                next()
            }
            else{
                next(new Error('invalid-acess-token'))
            }
        })

        registerSocketEvents()

    }
}