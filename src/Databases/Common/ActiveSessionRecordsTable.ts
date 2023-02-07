import { ScannedArticlesTable } from './ScannedArticlesTable';

const tableName = 'SessionsRecords';

enum Attributes {
    RecordId = 'RecordId',
    SessionId = 'SessionId',
    WorkerId = 'WorkerId',
    GroupId = 'GroupId',
    InventoryId = 'InventoryId',
    RecordDate = 'RecordDate',
    StockQuantity = 'StockQuantity',
    RecordQuantity = 'RecordQuantity',
    StockPrice = 'StockPrice',
    QuantityShift = 'QuantityShift',
    PriceShift = 'PriceShift',
    WorkerName = 'WorkerName',
    ArticleName = 'ArticleName',
}

enum AttributesTypes{
    RecordId = 'INTEGER PRIMARY KEY',
    SessionId = 'TIMESTAMP',
    WorkerId = 'INTEGER',
    GroupId = 'INTEGER',
    InventoryId = 'INTEGER',
    RecordDate = 'DATE',
    StockQuantity = 'INTEGER',
    RecordQuantity = 'INTEGER',
    StockPrice = 'REAL',
    WorkerName = 'TEXT',
    ArticleName = 'TEXT',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.WorkerId} ${AttributesTypes.WorkerId} ,
    ${Attributes.GroupId} ${AttributesTypes.GroupId},
    ${Attributes.InventoryId} ${AttributesTypes.InventoryId},
    ${Attributes.RecordDate} ${AttributesTypes.RecordDate},
    ${Attributes.StockQuantity} ${AttributesTypes.StockQuantity},
    ${Attributes.RecordQuantity} ${AttributesTypes.RecordQuantity},
    ${Attributes.StockPrice} ${AttributesTypes.StockPrice},
    ${Attributes.WorkerName} ${AttributesTypes.WorkerName},
    ${Attributes.ArticleName} ${AttributesTypes.ArticleName},
    ${Attributes.SessionId} ${AttributesTypes.SessionId},
    )`;

const selectAllQuery = `SELECT * FROM ${tableName} WHERE ${Attributes.SessionId} = ?`;
const selectByPermissionQuery = `SELECT ${tableName}.* FROM ${ScannedArticlesTable.tableName},${tableName} WHERE 
    ${ScannedArticlesTable.tableName}.${ScannedArticlesTable.attributes.AffectationId} IN (?) AND 
    ${ScannedArticlesTable.attributes.ScannedCodebar} = ${Attributes.InventoryId}
    AND ${Attributes.SessionId} = ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;


const registerRecordQuery = `INSERT INTO ${tableName} (
    ${Attributes.SessionId},
    ${Attributes.WorkerId} , ${Attributes.GroupId},${Attributes.InventoryId},
    ${Attributes.RecordDate}, ${Attributes.StockQuantity}, ${Attributes.RecordQuantity},
    ${Attributes.StockPrice}, ${Attributes.QuantityShift}, ${Attributes.PriceShift},
    ${Attributes.WorkerName}, ${Attributes.ArticleName})
    VALUES (?,?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)`;

    
export const ActiveSessionRecordsTable = {
    createTableQuery: createTableQuery,
    selectAllQuery: selectAllQuery,
    selectByPermissionQuery: selectByPermissionQuery,

    clearAllQuery: clearAllQuery,
    /**
     * attributes order : recordId, workerId, groupId
     *  inventoryId, recordDate, stockQuantity,
     *  recordQuantity, stockPrice, quantityShift,
     *  priceShift
     */
    registerRecordQuery: registerRecordQuery,
    tableName: tableName,
}