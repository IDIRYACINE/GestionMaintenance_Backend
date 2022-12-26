/// <reference path="../types/ApiInterface.ts" />
/// <reference path="../types/Authentication.ts" />

import { Authentication } from "../src/Authentication/Authentication";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath, Headers } from "../configs/Configs";

const name = ApisEnum.loginAdmin;
const version = 0;
const description = "login admin";

const unautherisedResponse = (res: Response): void => {
    res.status(401)

    const json : AutheriseAdminLoginResponse = {
        isAutherised: false
    }

    res.json(json)
}

const autherisedResponse = (res: Response): void => {
    res.status(200)

    const json : AutheriseAdminLoginResponse = {
        isAutherised: true
    }

    res.json(json)
}

const authenticateAdmin = (req: Request, res: Response): void =>{
    const accessToken = req.headers[Headers.AccessToken] as string
    Authentication.authenticateAdmin(accessToken).then(validToken => {
        if(validToken){
            autherisedResponse(res);
            return;
        }
        unautherisedResponse(res);
    })
}

const LoginAdmin : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath+version+"/"+name,
    execute: authenticateAdmin,
    onError: function (error: any): void {
        console.log(error);
    }
}

export default LoginAdmin;