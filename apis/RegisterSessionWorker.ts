/// <reference path="../types/ApiInterface.ts" />
import { database } from "../src/Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.registerSessionWorker;
const version = 0;
const description = "register session worker";

const registerWorker = (req: Request, res: Response): void => {
    const worker = req.body
    
    database.registerSessionWorker(worker).then(_ => {
        res.status(HttpStatus.success)

        const json : RegisterSessionWorkerResponse = {
            operationResult: OperationStatus.success
        }
        res.json(json)
    })
}

const RegisterSessionWorker : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Post,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: registerWorker
}

export default RegisterSessionWorker;