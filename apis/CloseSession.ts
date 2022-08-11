/// <reference path="../types/ApiInterface.ts" />
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";

const name = ApisEnum.closeSession;
const version = 0;
const description = "close session";


const CloseSession : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: function (req: Request, res: Response): void {
        throw new Error("Function not implemented.");
    }
}

export default CloseSession;