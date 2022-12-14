/// <reference path="../types/ApiInterface.ts" />
import { database } from "../src/Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus, OperationStatus } from "../configs/SpecialEnums";

const name = ApisEnum.openSession;
const version = 0;
const description = "open session";

const openSession = (req: Request, res: Response): void => {
    const session = req.body
    console.log(session)

    database.openSession(session).then(_ => {
        res.status(HttpStatus.success)

        const json : OpenSessionResponse  = {
            operationResult: OperationStatus.success
        }

        res.json(json)
    })
}

const OpenSession : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Post,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: openSession
}

export default OpenSession;