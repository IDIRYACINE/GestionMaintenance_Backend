/// <reference path="../../types/Authentication.ts" />

import { MariaDb } from "../Databases/MariaDb/MariaDb";
import { autherisedAdminToken, autherisedWorkerToken } from "../../configs/Configs";

export const Authentication : Authentication = {
    authenticateAdmin: async function (adminToken): Promise<boolean> {
        return adminToken === autherisedAdminToken;
    },
    authenticateUser: async function (username, password): Promise<AutherisedLoginResponse> {
        return MariaDb.fetchSessionWorker(username, password).then(sessionWorker => {

            if(sessionWorker === null){
                return {
                    authenticated: false,
                    errorOccured: true,
                }
            }
            return {
                authenticated: true,
                workerId: sessionWorker.workerId, 
                departementId: sessionWorker.departementId,
                groupId : sessionWorker.groupId,
                workerName: sessionWorker.workerName,
                accessToken: autherisedWorkerToken
            }
        })
    },
    authenticateAccessToken: async function (accessToken): Promise<boolean>{
        console.log(accessToken)
        return accessToken === autherisedWorkerToken;
    }
}