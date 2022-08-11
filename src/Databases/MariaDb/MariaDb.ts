/// <reference path="../../../types/Database.ts" />

import { ActiveSessionRecordsTable } from "../Common/ActiveSessionRecordsTable";
import { SessionWorkersTable } from "../Common/SessionWorkersTable";
import mariaDatabase from "mariadb";

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

    openSession: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    closeSession: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    fetchActiveSession: function (): Promise<Session> {
        throw new Error("Function not implemented.");
    },
    fetchActiveSessionRecords: function (): Promise<SessionRecord[]> {
        throw new Error("Function not implemented.");
    },
    registerSessionWorker: function (worker: SessionWorker): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    unregisterSessionWorker: function (worker: SessionWorker): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    updateSessionWorker: function (worker: SessionWorker): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    postSessionRecord: function (record: SessionRecord): Promise<boolean> {
        throw new Error("Function not implemented.");
    }
}


async function createTablesIfNotExists(): Promise<void> {
    const tablesQueryRows = await db.query("SHOW TABLES");
    if (tablesQueryRows.length === 0) {
        db.execute(ActiveSessionRecordsTable.createTableQuery);
        db.execute(SessionWorkersTable.createTableQuery);
    }
}
