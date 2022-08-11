/// <reference path="../types/ApiInterface.ts" />
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";

const name = ApisEnum.registerSessionWorker;
const version = 0;
const description = "register session worker";


const RegisterSessionWorker : ApiInterface = {
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

export default RegisterSessionWorker;