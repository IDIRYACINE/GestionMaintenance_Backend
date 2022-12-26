/// <reference path="../../../types/Database.ts" />

import { ActiveSessionRecordsTable } from "../Common/ActiveSessionRecordsTable";
import { SessionWorkersTable } from "../Common/SessionWorkersTable";
import mariaDatabase from "mariadb";
import { SessionTable } from "../Common/SessionsTable";
import moment from "moment";

let db : mariaDatabase.Connection; 

export const MariaDb : Database = {

    connect: async function (parameters): Promise<void> {

        if(db !== undefined){
            return;
        }

        db = await mariaDatabase.createConnection({
            host: parameters.host,
            user: parameters.user,
            password: parameters.password,
            database: parameters.database,
            connectTimeout : parameters.connectTimeout
        });

        createTablesIfNotExists();
       
    },

    disconnect: async function (): Promise<void> {
        db.destroy();
    },

    openSession: async function (session): Promise<void> {
        db.execute(SessionTable.openSessionQuery,[
            session.sessionId,
            session.isActive,
            session.sessionStartDate
        ]);
    },
    closeSession: async function (sessionId): Promise<void> {
    
       
        db.execute(SessionWorkersTable.clearAllQuery)
        db.execute(ActiveSessionRecordsTable.clearAllQuery)
        db.execute(SessionTable.clearAllQuery)


    },

    fetchActiveSession: async function (): Promise<Session> {

        return db.query(SessionTable.selectActiveSessionQuery).then(rows => {
            if (rows.length === 0) {
                return null;
            }
            const session = rows[0]
            const id = moment(session.SessionId).format("YYYY-MM-DD HH:mm:ss.SSSSSSSSS")
            return {
                sessionId: id,
                sessionStartDate: session.StartDate,
                sessionEndDate: session.EndDate,
                isActive: session.Active
            };
        })
    },

    fetchActiveSessionRecords: async function (): Promise<SessionRecord[]> {
        return db.execute(ActiveSessionRecordsTable.selectAllQuery)
    },

    registerSessionWorker: async function (worker): Promise<void> {
        db.execute(SessionWorkersTable.registerWorkerQuery, [
            worker.workerId,
            worker.groupId,
            worker.password,
            worker.username,
        ]);
    },
    unregisterSessionWorker: async function (workerId): Promise<void> {
        db.execute(SessionWorkersTable.unregisterWorkerQuery, [workerId]);
    },
    updateSessionWorker: async function (worker): Promise<void> {
        db.execute(SessionWorkersTable.updateWorkerQuery, [
            worker.password,
            worker.username,
            worker.groupId,
            worker.workerId,
        ]);
    },
    registerSessionRecord: async function (record): Promise<void> {
        db.execute(ActiveSessionRecordsTable.registerRecordQuery, [
            record.sessionId,
            record.workerId,
            record.groupId,
            record.inventoryId,
            record.recordDate,
            record.stockQuantity,
            record.recordQuantity,
            record.stockPrice,
            record.quantityShift,
            record.priceShift,
        ]);
    },

    fetchSessionWorker: async function (username, password): Promise<SessionWorker> {
        return db.query(SessionWorkersTable.selectQuery, [username, password]).then(rows => {
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        });
    }
}


async function createTablesIfNotExists(): Promise<void> {
    const tablesQueryRows = await db.query("SHOW TABLES");
    if (tablesQueryRows.length === 0) {
        db.execute(ActiveSessionRecordsTable.createTableQuery);
        db.execute(SessionWorkersTable.createTableQuery);
        db.execute(SessionTable.createTableQuery);
    }
}
