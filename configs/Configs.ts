/// <reference path="../types/Database.d.ts" />

export const apisRootPath = "/api/v";

export enum ApiMethods {
    Get,
    Post
}
































export enum ApisEnum {
    loginAdmin = "loginAdmin",
    fetchActiveSession = "fetchActiveSession",
    fetchActiveSessionRecords = "fetchActiveSessionRecords",
    openSession = "openSession",
    closeSession = "closeSession",
    registerSessionWorker = "registerSessionWorker",
    unregisterSessionWorker = "unregisterSessionWorker",
    updateSessionWorker = "updateSessionWorker",
    loginWorker = "loginWorker",
    fetchSessionRecords = "fetchSessionRecords",
    postSessionRecords = "postSessionRecords",
    fetchProduct = "fetchProduct",
    submitRecord = "submitRecord",
    registerSessionRecord = "registerSessionRecord",
    registerInventoryProduct = "registerInventoryProduct",
    unregisterInventoryProduct = "unregisterInventoryProduct",
    updateInventoryProduct = "updateInventoryProduct",
    searchInventoryProduct = "searchInventoryProduct",
    submitRecordBatch = "submitRecordBatch"
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



const duckdns_token = "aaf989ca-a203-49ee-8349-08df10174ee2"
const duckdns_domain = "embag"

export const dns_update_api = `https://duckdns.org/update/${duckdns_domain}}/${duckdns_token}`;
export const domain_name = "embag.duckdns.org"