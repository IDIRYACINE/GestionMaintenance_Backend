/// <reference path="../../types/WebSocketManager.ts" />

import { Authentication } from "../Authentication/Authentication"
import { WebSocketServer } from 'ws';

import { AllowedOrigins, Headers } from '../../configs/Configs'
import { IncomingMessage, Server } from "http";
import { socketEvents } from "../../configs/SpecialEnums";

let wss : WebSocketServer

const isOriginAllowed = (origin: string) : boolean => {
    let allowed = false;

    AllowedOrigins.forEach(allowedOrigin => {
        if (allowedOrigin === origin) {
            allowed = true;
        }
    })

    return allowed
}

const validatekHandshake = async (handshake: IncomingMessage ) : Promise<boolean> =>  {
    const allowOrigin = isOriginAllowed(handshake.headers.origin)
    if (!allowOrigin) {
        return false
    }
    return await Authentication.authenticateAccessToken(handshake.headers[Headers.AccessToken] as string)
}

const registerSocketEvents = () =>{
    wss.on(socketEvents.onConnection , (socket: any) => {
        const message = {
            data : "Autherised"
        }
       wss.emit(socketEvents.onConnection , message)
    })

    wss.on(socketEvents.connected , (message: any) => {
        
    })

}

export const websocketManager : WebsocketManager = {
    connectToSocket: function (connRequest: ConnectionRequest): void {
        throw new Error("Method not implemented.");
    },

    createSocket: function (server: Server): void {
        if (wss !== undefined) {
            return;
        }

        wss = new WebSocketServer({ server });

        server.on('upgrade', async function upgrade(request, socket, head) {

            const allowConnection = await validatekHandshake(request)

            if (!allowConnection) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }
          
            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit(socketEvents.onConnection, ws, request, socket);
            });

        })
        
        registerSocketEvents();

    },
    broadcastMessage: function (type: socketEvents, jsonMessage: Message): void {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(jsonMessage);
            }
        });
    }
}
