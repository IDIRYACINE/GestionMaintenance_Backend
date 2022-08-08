
export {
    AdminApi,
    apiTypes,
    Api,
    UserApi
}

declare enum apiTypes {
    Get,
    Post
}

interface Api{
    name : () => string,
    version : () => string,
    description : () => string,
    type : () => apiTypes,
    url : () => string,
    execute : (args:any) => void,
    onError : (error:any) => void,
}

interface SelfRegisteringApi{
    registerApis : (expressApp : Express.Application) => void,

}

interface AdminApi extends SelfRegisteringApi{
    connectAdmin : Api,
    fetchActiveSession : Api,
    fetchActiveSessionRecords : Api,
    openSession : Api,
    closeSession : Api,
    registerSessionWorker : Api,
    unregisterSessionWorker : Api,
    updateSessionWorker : Api,
}

interface UserApi extends SelfRegisteringApi{
    connectUser : Api,
    fetchSessionRecords : Api,
    postSessionRecords : Api,
    fetchProduct : Api,
}