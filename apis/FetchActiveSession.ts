/// <reference path="../types/ApiInterface.d.ts" />
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { database } from "../src/Databases/Database";
import { OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.fetchActiveSession;
const version = 0;
const description = "fetches active session";


const fetchActiveSession = (req: Request, res: Response) : void => {

    database.fetchActiveSession().then( result => {
        
        if (result == undefined || result == null) {
            res.json({
                operationResult: OperationStatus.fail,
            })
            return 

        }

        const json : ActiveSessionResponse = {
            operationResult: OperationStatus.success,
            sessionId: result.sessionId.toString() ?? null,
            sessionStartDate: result.sessionStartDate ,
            sessionEndDate: result.sessionEndDate,
            sessionActive: true

        }

        res.json(json)
    })
}

const FetchAciveSession : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: fetchActiveSession
}

export default FetchAciveSession;