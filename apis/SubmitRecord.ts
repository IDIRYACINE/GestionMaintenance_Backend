/// <reference path="../types/ApiInterface.ts" />

import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { OperationStatus, socketEvents } from "../configs/SpecialEnums";
import { websocketManager } from "../src/WebSocketManager/WebSocketManager";
import moment from "moment";


const name = ApisEnum.submitRecord;
const version = 0;
const description = "submit scanned record and get it's details";


let requestMap = {}

const submitRecord = (req: Request, res: Response) : void => {

    const rawTimestamp = Date.now()
    const timestamp = moment(rawTimestamp).format("YYYY-MM-DD HH:mm:ss.SSSSSSSSS")

    const data : ProductDetaillsRequest = {
        barcode: req.body.barcode,
        workerId: req.body.workerId,
        workerName: req.body.workerName,
        scannedDate: timestamp,
        requestTimestamp: timestamp,
        groupId: req.body.groupId,
        departmentId: req.body.departementId
    }
    
    const message : Message = {
        type : socketEvents.sessionRecord,
        data : data
    }

    requestMap[rawTimestamp] = res


    websocketManager.broadcastMessage(socketEvents.sessionRecord,message)
    

}

const onProductDetaillsCallback = (resId : string , data : any) => {

    const json : ProductDetaillsResponse = {
        operationResult: OperationStatus.success,
        barcode :  parseInt(data.barcode),
        itemName: data.itemName,
        locationName: data.locationName,
        locationId: data.locationId
    }

    const key = Date.parse(resId)
    const res : Response = requestMap[key]

    res.json(json)

    delete requestMap[key]

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

export {onProductDetaillsCallback};