import { Authentication } from "../Authentication/Authentication";
import { Request, Response } from "express";
import {  Headers } from "../../configs/Configs";


function AuthWrapperAction(req :Request, res:Response, action : (req:Request, res:Response) => void) {
    const accessToken = req.headers[Headers.AccessToken] as string
    Authentication.authenticateAdmin(accessToken).then(validToken => {
        if(validToken){
            action(req, res);
            return;
        }
        unautherisedResponse(res);
    })
}


const unautherisedResponse = (res: Response): void => {
    res.status(401)

    const json : AutheriseAdminLoginResponse = {
        isAutherised: false
    }

    res.json(json)
}

export {AuthWrapperAction};