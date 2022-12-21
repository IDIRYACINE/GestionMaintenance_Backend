

type OperationStatus = import("../configs/SpecialEnums").OperationStatus

type ExpressResponse = import ("express").Response;

type ExpressRequest = import ("express").Request;

type Apis = import ("../configs/Configs").ApisEnum;
type ApisMethods = import ("../configs/Configs").ApiMethods;

interface ApiInterface{
    name : Apis,
    version : number,
    description :  string,
    type : ApisMethods,
    url :  string,
    execute : (req:ExpressRequest,res:ExpressResponse) => void,
    onError : (error:any) => void,
}

type RegisterApiCallback = (event:ApiInterface) => void

interface CloseSessionResponse {
    operationResult : OperationStatus,
    sessionId : string,
}

interface ActiveSessionRecordsRespone{
    records : Array<SessionRecord>
}

interface OpenSessionResponse{
    operationResult : OperationStatus,
}

interface RegisterSessionWorkerResponse{
    operationResult : OperationStatus,
}

interface UnregisterSessionWorkerResponse{
    operationResult : OperationStatus,
}

interface UpdateSessionWorkerResponse{
    operationResult : OperationStatus,
}

interface RegisterSessionRecord{
    operationResult : OperationStatus,
}

interface ActiveSessionResponse{
    operationResult : OperationStatus,
    sessionId : string,
    sessionStartDate : Date,
    sessionEndDate : Date,
    sessionActive : boolean,
}