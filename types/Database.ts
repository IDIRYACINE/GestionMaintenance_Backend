

interface ProductFetchQuery{
    productCodebar : number
}

interface SessionWorker{

}

interface SessionRecord{

}

interface Session{

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
    openSession() : Promise<boolean>,
    closeSession() : Promise<boolean>,
    fetchActiveSession() : Promise<Session>,
    fetchActiveSessionRecords() : Promise<Array<SessionRecord>>,
    registerSessionWorker(worker : SessionWorker) : Promise<boolean>,
    unregisterSessionWorker(worker : SessionWorker) : Promise<boolean>,
    updateSessionWorker(worker : SessionWorker) : Promise<boolean>,
    postSessionRecord(record : SessionRecord) : Promise<boolean>,
}