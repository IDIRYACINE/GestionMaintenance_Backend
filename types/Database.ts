

interface ProductFetchQuery{
    productCodebar : number
}

interface SessionWorker{
    id : number,
    phone? : string,
    password? : string,
    groupId? : number,
    username? : string,
}

interface SessionRecord{
    recordId : number,
    sessionId : number,
    workerId : number,
    groupId : number,
    inventoryId : number,
    recordDate : Date,
    stockQuantity : number,
    recordQuantity : number,
    stockPrice : number,
    quantityShift : number,
    priceShift : number,
}

interface Session{
    sessionId : number,
    startDate : Date,
    endDate : Date,
    active : boolean,
}

interface ConnectionParameters{
    host: string,
    user: string,
    password: string,
    database: string,
}

interface Database {
    connect(parameters : ConnectionParameters): Promise<void>,
    disconnect(): Promise<void>,
    openSession(session:Session) : Promise<void>,
    closeSession(session:Session) : Promise<void>,
    fetchActiveSession() : Promise<Session>,
    fetchActiveSessionRecords() : Promise<Array<SessionRecord>>,
    registerSessionWorker(worker : SessionWorker) : Promise<void>,
    unregisterSessionWorker(worker : SessionWorker) : Promise<void>,
    updateSessionWorker(worker : SessionWorker) : Promise<void>,
    registerSessionRecord(record : SessionRecord) : Promise<void>,
    fetchSessionWorker(phone : string, password : string) : Promise<SessionWorker>
}