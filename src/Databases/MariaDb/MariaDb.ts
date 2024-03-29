/// <reference path="../../../types/Database.d.ts" />
/// <reference path="../../../types/ApiRequestModels.d.ts" />

import { ActiveSessionRecordsTable } from "../Common/ActiveSessionRecordsTable";
import { SessionWorkersTable } from "../Common/SessionWorkersTable";
import mariaDatabase from "mariadb";
import { SessionTable } from "../Common/SessionsTable";
import moment from "moment";
import { OperationStatus } from "../../../configs/SpecialEnums";
import { InventoryProductRow, InventoryTable } from "../Common/InventoryTable";
import { GroupsPermissionsTable } from "../Common/GroupPermissionsTable";
import { ScannedArticlesTable } from "../Common/ScannedArticlesTable";
import { ActiveSession } from '../../State/ActiveSession';

let db: mariaDatabase.Connection;

export const MariaDb: Database = {
    connect: async function (parameters): Promise<void> {

        if (db !== undefined) {
            return;
        }

        db = await mariaDatabase.createConnection({
            host: parameters.host,
            user: parameters.user,
            password: parameters.password,
            database: parameters.database,
            connectTimeout: parameters.connectTimeout
        });

        createTablesIfNotExists();

    },

    disconnect: async function (): Promise<void> {
        db.destroy();
    },

    openSession: async function (session): Promise<void> {
        db.execute(SessionTable.openSessionQuery, [
            session.sessionId,
            session.isActive,
            session.sessionStartDate
        ]);
    },
    closeSession: async function (sessionId): Promise<void> {



        db.execute(ScannedArticlesTable.clearAllQuery);
        db.execute(SessionTable.closeSessionQuery, [false, sessionId]);


    },

    fetchActiveSession: async function (): Promise<Session> {
        return db.query(SessionTable.selectActiveSessionQuery).then(rows => {
            if (rows.length === 0) {
                return null;
            }
            const session = rows[0];
            const id = moment(session.SessionId).format("YYYY-MM-DD HH:mm:ss.SSSSSSSSS");
            return {
                sessionId: id,
                sessionStartDate: session.StartDate,
                sessionEndDate: session.EndDate,
                isActive: session.Active
            };
        });
    },

    fetchActiveSessionRecords: async function (permissions: number[]): Promise<SessionRecord[]> {
        let pPermission = "";
        permissions.forEach((permission, index) => {
            pPermission += permission;
            if (index < permissions.length - 1) {
                pPermission += permission + ",";
            }
        });

        return db.execute(ActiveSessionRecordsTable.selectByPermissionQuery, [pPermission, ActiveSession.getSessionId()]);
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
            record.articleId,
            record.recordDate,
            record.stockQuantity,
            record.recordQuantity,
            record.stockPrice,
            record.quantityShift,
            record.priceShift,
            record.workerName,
            record.articleName
        ]);
    },

    fetchSessionWorker: async function (username, password): Promise<SessionWorker> {
        return db.query(SessionWorkersTable.selectQuery, [username, password]).then(async (rows) => {


            if (rows.length === 0) {
                return null;
            }

            const worker: SessionWorker = rows[0];

            return db.query(GroupsPermissionsTable.selectGroupPermissions, [worker.groupId]).then(rows => {
                const permissions = rows.map((row: { PermissionId: any; }) => row.PermissionId);

                worker.departementId = permissions;

                return worker;
            });

        });
    },
    submitScannedProduct: async function (barcode: number, workerPermissions: number[]): Promise<ProductDetaillsResponse> {
        const workerPermissionsString = workerPermissions.join(",");

        return db.query(InventoryTable.selectInventoryProduct, [barcode, workerPermissionsString]).then(rows => {

            if (rows.length === 0) {
                return {
                    operationResult: OperationStatus.fail,
                };
            }

            const data: InventoryProductRow = rows[0];

            return {
                operationResult: OperationStatus.success,
                barcode: data.ArticleCode,
                itemName: data.ArticleName,
                locationName: data.AffectationName,
                locationId: data.AffectationId
            };
        }
        );

    },
    fetchProduct: async function (productQuery: ProductFetchQuery): Promise<ProductDetaillsResponse> {
        const workerPermissionsString = productQuery.permissions.join(",");

        return db.query(InventoryTable.selectInventoryProduct, [productQuery.productCodebar, workerPermissionsString]).then(rows => {
            if (rows.length === 0) {
                return {
                    operationResult: OperationStatus.fail,
                };
            }

            const data: InventoryProductRow = rows[0];

            return {
                operationResult: OperationStatus.success,
                barcode: data.ArticleCode,
                itemName: data.ArticleName,
                locationName: data.AffectationName,
                locationId: data.AffectationId,
                price: data.ArticlePrice,
            };
        }
        );
    },
    fetchScannedBarocde: async function (barcode: number): Promise<Boolean> {

        return db.query(ScannedArticlesTable.selectScannedQuery, [barcode]).then(rows => {
            if (rows.length === 0) {
                return false;
            }
            return true;
        });

    },
    insertScannedBarcode: function (barcode: number, affectationId: number): Promise<void> {
        return db.execute(ScannedArticlesTable.insertScannedQuery, [barcode, affectationId]);
    },
    registerInventoryProduct: function (product: InventoryProduct): Promise<void> {
        return db.execute(InventoryTable.registerInventoryProduct, [
            product.articleId,
            product.articleName,
            product.articleCode,
            product.affectationId,
            product.familyCode
        ]);
    },
    unregisterInventoryProduct: function (productId: number): Promise<void> {
        return db.execute(InventoryTable.unregisterInventoryProduct, [productId]);
    },
    updateInventoryProduct: function (productId: number, attributes: AttributesWrapper[]): Promise<void> {
        const query = InventoryTable.generateUpdateQuery(attributes);
        return db.execute(query, [productId, ...attributes.map((attribute) => attribute.value)]);
    },
    searchInventoryProduct: function (attributes: AttributesWrapper[],permissions:number[],isAdmin:boolean): Promise<void> {
        const hasPermissions = permissions.length > 0;

        const query = InventoryTable.generateSearchQuery(attributes,hasPermissions,isAdmin);

        const attributesList = attributes.map((attribute) => attribute.value);
        const permissionsList = [];

        if (hasPermissions && !isAdmin) {
            permissions.every((permission, index) => {
            permissionsList.push(permission)})
        }

        return db.execute(query, [...attributesList, ...permissionsList]);
    }
}


async function createTablesIfNotExists(): Promise<void> {
    const tablesQueryRows = await db.query(`Select * from information_schema.Tables where table_Name='${ScannedArticlesTable.tableName}'`);
    if (tablesQueryRows.length === 0) {
        db.execute(ScannedArticlesTable.createTableQuery);
    }
}
