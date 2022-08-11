

interface Authentication {
    authenticateAccessToken(accessToken: string): Promise<boolean>;
    authenticateAdmin(username: string, password: string): Promise<boolean>;
    authenticateUser(username: string, password: string): Promise<boolean>;
}

interface AutherisedLoginResponse {
    isAutherised: boolean;
}