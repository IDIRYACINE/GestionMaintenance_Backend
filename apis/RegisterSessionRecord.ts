/// <reference path="../types/ApiInterface.ts" />
import { database } from "Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.registerSessionWorker;
const version = 0;
const description = "register session worker";

const registerRecord = (req: Request, res: Response): void => {
    const record = req.body
    
    database.registerSessionRecord(record).then(_ => {
        res.status(HttpStatus.success)

        const json : RegisterSessionWorkerResponse = {
            operationResult: OperationStatus.success
        }
        res.json(json)
    })
}

const RegisterSessionRecord : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Post,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: registerRecord
}

export default RegisterSessionRecord;