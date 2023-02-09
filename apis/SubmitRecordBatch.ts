/// <reference path="../types/ApiInterface.d.ts" />

import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus, socketEvents } from "../configs/SpecialEnums";
import { websocketManager } from "../src/WebSocketManager/WebSocketManager";
import moment from "moment";
import { database } from "../src/Databases/Database";
import { ActiveSession } from "../src/State/ActiveSession";


const name = ApisEnum.submitRecordBatch;
const version = 0;
const description = "submit scanned record list and get it's details";

const submitRecord = (req: Request, res: Response): void => {

    let barcodesList : number[] =  JSON.parse(req.body.barcodes);
   
    let jsonResponse : ProductDetaillsResponse[] = [];

    barcodesList.forEach(barcode => {
        
    const data: ProductFetchQuery = {
        productCodebar: barcode,
        workerId: req.body.workerId,
        permissions: req.body.permissions,
        workerName: req.body.workerName
    }


    database.fetchScannedBarocde(data.productCodebar).then(barcodeExists => {


        database.fetchProduct(data).then(product => {

            if(!barcodeExists)
                database.insertScannedBarcode(data.productCodebar,product.locationId)

            if (product.operationResult === OperationStatus.success) {
                const rawTimestamp = Date.now()
                const timestamp = moment(rawTimestamp).format("YYYY-MM-DD HH:mm:ss.SSSSSSSSS")

                const record: SessionRecord = {
                    recordId: rawTimestamp,
                    sessionId: ActiveSession.getSessionId(),
                    workerId: data.workerId,
                    groupId: req.body.groupId,
                    articleId: product.barcode,
                    recordDate: timestamp,
                    stockQuantity: 1,
                    recordQuantity: 1,
                    stockPrice: product.price,
                    quantityShift: 0,
                    priceShift: 0,
                    productDesignation: product.locationId,
                    workerName: data.workerName,
                    articleName: product.itemName,
                }

                if (!barcodeExists) {
                    database.registerSessionRecord(record).then(_ => {
                        res.status(HttpStatus.success)

                        websocketManager.broadcastMessage(socketEvents.sessionRecord, {
                            type: socketEvents.sessionRecord,
                            data: record
                        })
                    })

                }

                const json: ProductDetaillsResponse = {
                    operationResult: OperationStatus.success,
                    barcode: data.productCodebar,
                    itemName: product.itemName,
                    locationName: product.locationName,
                    locationId: product.locationId
                }

                jsonResponse.push(json)

            }
        })
    })
    });

    res.json(jsonResponse)
}




const SubmitSessionRecordBatch: ApiInterface = {
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

export default SubmitSessionRecordBatch;

