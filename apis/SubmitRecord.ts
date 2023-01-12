/// <reference path="../types/ApiInterface.ts" />

import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus, socketEvents } from "../configs/SpecialEnums";
import { websocketManager } from "../src/WebSocketManager/WebSocketManager";
import moment from "moment";
import { database } from "Databases/Database";


const name = ApisEnum.submitRecord;
const version = 0;
const description = "submit scanned record and get it's details";


let requestMap = {}

const submitRecord = (req: Request, res: Response) : void => {
    const data : ProductFetchQuery = {
        productCodebar: req.body.barcode,
        workerId: req.body.workerId,
        permissions: req.body.departementId
    }

    database.fetchProduct(data).then(product => {
        if(product.operationResult === OperationStatus.success) {
            const rawTimestamp = Date.now()
            const timestamp = moment(rawTimestamp).format("YYYY-MM-DD HH:mm:ss.SSSSSSSSS")
            
            const record : SessionRecord = {
                recordId: rawTimestamp,
                sessionId: 0,
                workerId: data.workerId,
                groupId: req.body.groupId,
                inventoryId: product.inventoryId,
                recordDate: timestamp,
                stockQuantity: 1,
                recordQuantity: 1,
                stockPrice: product.price,
                quantityShift: 0,
                priceShift: 0
            }

            database.registerSessionRecord(record).then(_ => {
                res.status(HttpStatus.success)
        
                const json : RegisterSessionWorkerResponse = {
                    operationResult: OperationStatus.success
                }
                res.json(json)
            })

        }
    })


    //websocketManager.broadcastMessage(socketEvents.sessionRecord,message)
    

}


const SubmitSessionRecord : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Post,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: submitRecord
}

export default SubmitSessionRecord;

