

export enum OperationStatus {
    success,
    fail,
}

export enum HttpStatus {
    success = 200,
    serverError = 400,

}


export enum socketEvents {
    onConnection = "connection",
    connected = "connected",
    activeSessionRecords = "onActiveSessionRecords",
    sessionRecord = "onSessionRecord",
    productDetaills = "onProductDetails",
    requestProductDetaills = "requestProductDetails",
    message = "message",
}
