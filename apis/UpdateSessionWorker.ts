/// <reference path="../types/ApiInterface.d.ts" />

import { database } from "../src/Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.updateSessionWorker;
const version = 0;
const description = "update session worker";

const updateSession = (req: Request, res: Response): void => {
    const worker = req.body
    
    database.updateSessionWorker(worker).then(_ => {
        res.status(HttpStatus.success)

        const json : UpdateSessionWorkerResponse = {
            operationResult: OperationStatus.success
        }
        res.json(json)
    })
}

const UpdateSessionWorker : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Post,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: updateSession
}

export default UpdateSessionWorker;