

export const Authentication : Authentication = {
    authenticateAdmin: async function (username: string, password: string): Promise<boolean> {
        return true;
    },
    authenticateUser: async function (username: string, password: string): Promise<boolean> {
        return true;
    },
    authenticateAccessToken: async function (accessToken: string): Promise<boolean>{
        return true;
    }
}