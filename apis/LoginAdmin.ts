import { Request, Response } from "express";
import { apisRootPath } from "../configs/Configs";
import { ApiInterface, ApisEnum, ApiTypes } from "../types/ApiInterface";

const name = ApisEnum.loginAdmin;
const version = 0;
const description = "login admin";

const LoginAdmin : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiTypes.Get,
    url: apisRootPath+version+"/"+name,
    execute: function (req: Request, res: Response): void {
        console.log("Someone called")
        res.send('Hello World!');
    },
    onError: function (error: any): void {
        console.log(error);
    }
}

export default LoginAdmin;