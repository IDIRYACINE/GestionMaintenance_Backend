/// <reference path="../types/Database.ts" />

export const apisRootPath = "/api/v";

export enum ApiMethods {
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
    loginUser = "loginUser",
    fetchSessionRecords = "fetchSessionRecords",
    postSessionRecords = "postSessionRecords",
    fetchProduct = "fetchProduct",
    submitRecord = "submitRecord",
    registerSessionRecord = "registerSessionRecord",
}

export enum QueriesEnum{
    sessionId = "sessionId",
    workerId = "workerId"
}

export enum Headers {
    ContentType = "content-type",
    AccessToken = "access-token"
}

enum Methods {
    Get = "GET",
    Post = "POST",
}

export const testDatabaseConnection : ConnectionParameters = {
    host: "localhost", 
    user: "idir", 
    password: "idir",
    database: "test",
    connectTimeout : 10000
}

export const autherisedWorkerToken = "embagvcdfgeauth203";
export const autherisedAdminToken = "embag343adminvcs";

export const AllowedHeaders = [Headers.ContentType, Headers.AccessToken];
export const AllowedMethods = [Methods.Get, Methods.Post];
export const AllowedOrigins = ["localhost:3050","http://localhost:3000"];
