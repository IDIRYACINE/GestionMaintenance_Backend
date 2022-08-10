import { Request, Response } from "express";

export enum ApiTypes {
    Get,
    Post
}

export enum ApisEnum{
    loginAdmin = "loginAdmin",
    fetchActiveSession = "fetchActiveSession",
    fetchActiveSessionRecords = "fetchActiveSessionRecords",
    openSession = "openSession",
    closeSession = "closeSession",
    registerSessionWorker = "registerSessionWorker",
    unregisterSessionWorker = "unregisterSessionWorker",
    updateSessionWorker = "updateSessionWorker",
    connectUser = "loginUser",
    fetchSessionRecords = "fetchSessionRecords",
    postSessionRecords = "postSessionRecords",
    fetchProduct = "fetchProduct",
}

export interface ApiInterface{
    name : ApisEnum,
    version : number,
    description :  string,
    type : ApiTypes,
    url :  string,
    execute : (req:Request,res:Response) => void,
    onError : (error:any) => void,
}