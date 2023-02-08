/// <reference path="../types/ApiInterface.d.ts" />
import { database } from "../src/Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath, QueriesEnum } from "../configs/Configs";
import { HttpStatus, OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.unregisterSessionWorker;
const version = 0;
const description = "unregister session worker";

const unregisterWorker = (req: Request, res: Response): void => {
    const workerId = req.query[QueriesEnum.workerId] as string

    database.unregisterSessionWorker(workerId).then(_ => {
        res.status(HttpStatus.success)

        const json : UnregisterSessionWorkerResponse = {
            operationResult: OperationStatus.success
        }
        res.json(json)
    })
}

const UnregisterSessionWorker : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute:unregisterWorker
}

export default UnregisterSessionWorker;