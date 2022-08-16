/// <reference path="../types/ApiInterface.ts" />

import { database } from "Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath, QueriesEnum } from "../configs/Configs";
import { OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.closeSession;
const version = 0;
const description = "close session";

const closeSession = (req: Request, res: Response) : void =>{
    const sessionId = req.query[QueriesEnum.sessionId] as string

    database.closeSession(sessionId).then(_ => {

        const json : CloseSessionResponse = {
            operationResult: OperationStatus.success,
            sessionId: sessionId
        }

        res.json(json)
    })

}

const CloseSession : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: closeSession
}

export default CloseSession;