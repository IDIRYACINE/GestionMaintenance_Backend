
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
