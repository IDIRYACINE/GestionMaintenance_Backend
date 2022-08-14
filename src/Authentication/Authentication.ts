/// <reference path="../../types/Authentication.ts" />

import { MariaDb } from "../Databases/MariaDb/MariaDb";
import { autherisedAdminToken, autherisedWorkerToken } from "../../configs/Configs";

export const Authentication : Authentication = {
    authenticateAdmin: async function (adminToken): Promise<boolean> {
        return adminToken === autherisedAdminToken;
    },
    authenticateUser: async function (phone, password): Promise<AutherisedLoginResponse> {
        return MariaDb.fetchSessionWorker(phone, password).then(sessionWorker => {
            if(sessionWorker === null){
                return {
                    isAutherised: false
                }
            }
            return {
                isAutherised: true,
                workerId: sessionWorker.id,
                accessToken: autherisedWorkerToken
            }
        })
    },
    authenticateAccessToken: async function (accessToken): Promise<boolean>{
        return accessToken === autherisedWorkerToken;
    }
}