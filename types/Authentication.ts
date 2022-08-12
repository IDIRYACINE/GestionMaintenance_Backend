/// <reference path="../types/ApiInterface.ts" />

interface Authentication {
    authenticateAccessToken(accessToken: string): Promise<boolean>;
    authenticateAdmin(adminToken: string): Promise<boolean>;
    authenticateUser(phone: string, password: string): Promise<AutherisedLoginResponse>;
}

interface AutherisedLoginResponse {
    isAutherised: boolean,
    workerId? : number,
    accessToken?: string
}