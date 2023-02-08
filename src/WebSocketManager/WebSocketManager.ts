///<reference path="../../types/WebSocketManager.d.ts" />

import { Authentication } from "../Authentication/Authentication"
import { WebSocketServer,WebSocket } from 'ws';

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
    const allowOrigin = isOriginAllowed(handshake.headers.host)
    if (!allowOrigin) {
        console.log("Origin not allowed")
        return false
    }
    const headerAuthToken = handshake.headers[Headers.AccessToken] as string
    return await Authentication.authenticateAdmin(headerAuthToken)
}

const registerSocketEvents = () => {
    wss.on(socketEvents.onConnection , (socket: any) => {
        const message = {
            data : "Autherised"
        }

        socket.on(socketEvents.message, (message : any) => {
            if(typeof(message) !== "string" || typeof(message) !== "object")
                message = JSON.parse(message.toString())
                
            
          });

        socket.emit(socketEvents.onConnection , message)
    })



}

const websocketManager : WebsocketManager = {
    connectToSocket: function (connRequest: ConnectionRequest): void {
        throw new Error("Method not implemented.");
    },

    createSocket: function (server: Server): void {
        if (wss !== undefined) {
            return;
        }

        wss = new WebSocketServer({ noServer: true });

        server.on('upgrade', async function upgrade(request, socket, head) {

            console.log("Upgrade request")
            const allowConnection = await validatekHandshake(request)

            if (!allowConnection) {
                console.log("Connection not allowed")
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

        jsonMessage.data = JSON.stringify(jsonMessage.data)

        const message = JSON.stringify(jsonMessage)

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}


export {websocketManager}