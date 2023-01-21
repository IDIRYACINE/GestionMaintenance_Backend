

interface ProductFetchQuery{
    productCodebar : number,
    workerId : number,
    permissions : Array<number>,
    workerName : string,
}

interface SessionWorker{
    workerId : number,
    phone? : string,
    password? : string,
    groupId? : number,
    username? : string,
    departementId? : Array<number>,
    workerName? : string,
}

interface SessionRecord{
    recordId : number,
    sessionId : number,
    workerId : number,
    groupId : number,
    articleId : number,
    recordDate : string,
    stockQuantity : number,
    recordQuantity : number,
    stockPrice : number,
    quantityShift : number,
    priceShift : number,
    workerName : string,
    articleName : string,
    productDesignation : number
}

interface Session{
    sessionId : string,
    sessionStartDate : Date,
    sessionEndDate : Date,
    isActive : boolean,
}

interface ConnectionParameters{
    host: string,
    user: string,
    password: string,
    database: string,
    connectTimeout? : number,
}

interface Database {
    connect(parameters : ConnectionParameters): Promise<void>,
    disconnect(): Promise<void>,
    openSession(session:Session) : Promise<void>,
    closeSession(sessionId : string) : Promise<void>,
    fetchActiveSession() : Promise<Session>,
    fetchActiveSessionRecords(permissions:number[]) : Promise<Array<SessionRecord>>,
    registerSessionWorker(worker : SessionWorker) : Promise<void>,
    unregisterSessionWorker(workerId : string) : Promise<void>,
    updateSessionWorker(worker : SessionWorker) : Promise<void>,
    registerSessionRecord(record : SessionRecord) : Promise<void>,
    fetchSessionWorker(phone : string, password : string) : Promise<SessionWorker>,
    submitScannedProduct(barcode:number , workerPermissions : Array<number>) : Promise<ProductDetaillsResponse>,
    fetchProduct(productQuery : ProductFetchQuery) : Promise<ProductDetaillsResponse>,
    fetchScannedBarocde(barcode:number) : Promise<Boolean>,
    insertScannedBarcode(barcode:number,affectationId:number) : Promise<void>,
}