/// <reference path="../types/ApiInterface.ts" />

interface Authentication {
    authenticateAccessToken(accessToken: string): Promise<boolean>;
    authenticateAdmin(adminToken: string): Promise<boolean>;
    authenticateUser(username: string, password: string): Promise<AutherisedLoginResponse>;
}

interface AutherisedLoginResponse {
    authenticated: boolean,
    errorOccured?: boolean,
    workerId?: number,
    workerName?: string,
    departementId?: Array<number>,
}

interface AutheriseAdminLoginResponse {
    isAutherised: boolean
}