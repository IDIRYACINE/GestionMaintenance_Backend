
export const apisRootPath = "/v/";

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
    connectUser = "loginUser",
    fetchSessionRecords = "fetchSessionRecords",
    postSessionRecords = "postSessionRecords",
    fetchProduct = "fetchProduct",
}

enum Headers {
    ContentType = "Content-Type",
    AccessToken = "Access-Token"
}

enum Methods {
    Get = "GET",
    Post = "POST",
}

export const AllowedHeaders = [Headers.ContentType, Headers.AccessToken];
export const AllowedMethods = [Methods.Get, Methods.Post];

