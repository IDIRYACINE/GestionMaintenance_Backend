/// <reference path="../types/ApiInterface.ts" />
import { Authentication } from "../src/Authentication/Authentication";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";

const name = ApisEnum.loginWorker;
const version = 0;
const description = "login user";

const loginWorker = async (req: Request, res: Response) => {
    const password  = req.query.password as string 
    const username = req.query.username as string

    Authentication.authenticateUser(username, password).then(credential => {
        if(credential.authenticated){
            autherisedResponse(res,credential);
            return;
        }
        unautherisedResponse(res);
    })
}

const autherisedResponse = (res: Response,credential:AutherisedLoginResponse): void => {
    res.status(200)
    res.json(credential)
}

const unautherisedResponse = (res: Response): void => {
    res.status(401)

    const json : AutherisedLoginResponse = {
        authenticated: false
    }

    res.json(json)
}

const LoginUser : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: loginWorker
}

export default LoginUser;