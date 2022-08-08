import { WebsocketManager } from "../../types/WebsocketManager";


export const websocketManager : WebsocketManager.WebsocketManager = {
    broadcastMessage: function (type: String, message: WebsocketManager.Message): void {
        throw new Error("Function not implemented.");
    },
}