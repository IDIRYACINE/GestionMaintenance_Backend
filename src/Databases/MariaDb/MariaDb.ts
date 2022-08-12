/// <reference path="../../../types/Database.ts" />

import { ActiveSessionRecordsTable } from "../Common/ActiveSessionRecordsTable";
import { SessionWorkersTable } from "../Common/SessionWorkersTable";
import mariaDatabase from "mariadb";
import { SessionTable } from "Databases/Common/SessionsTable";

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
        });

        createTablesIfNotExists();
    },

    disconnect: async function (): Promise<void> {
        db.destroy();
    },

    openSession: async function (session): Promise<void> {
        db.execute(SessionTable.openSessionQuery,[
            session.sessionId,
            session.active,
            session.startDate,
            session.endDate
        ]);
    },
    closeSession: async function (session): Promise<void> {
        db.execute(SessionTable.closeSessionQuery,[
            session.active,
            session.sessionId
        ]);
    
        const batchedQuery = `${SessionWorkersTable.clearAllQuery};
            ${ActiveSessionRecordsTable.clearAllQuery}`;
        db.execute(batchedQuery)
    },

    fetchActiveSession: async function (): Promise<Session> {

        return db.query(SessionTable.selectActiveSessionQuery).then(rows => {
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        })
    },

    fetchActiveSessionRecords: async function (): Promise<SessionRecord[]> {
        return db.execute(ActiveSessionRecordsTable.selectAllQuery)
    },

    registerSessionWorker: async function (worker): Promise<void> {
        db.execute(SessionWorkersTable.registerWorkerQuery, [
            worker.id,
            worker.groupId,
            worker.phone,
            worker.password,
            worker.username,
        ]);
    },
    unregisterSessionWorker: async function (worker): Promise<void> {
        db.execute(SessionWorkersTable.unregisterWorkerQuery, [worker.id]);
    },
    updateSessionWorker: async function (worker): Promise<void> {
        db.execute(SessionWorkersTable.updateWorkerQuery, [
            worker.password,
            worker.username,
            worker.phone,
            worker.groupId,
            worker.id,
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

    fetchSessionWorker: async function (phone, password): Promise<SessionWorker> {
        return db.query(SessionWorkersTable.selectQuery, [phone, password]).then(rows => {
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