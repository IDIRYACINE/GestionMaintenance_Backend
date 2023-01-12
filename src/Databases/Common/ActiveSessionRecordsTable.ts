
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
}

enum AttributesTypes{
    RecordId = 'INTEGER PRIMARY KEY',
    SessionId = 'INTEGER',
    WorkerId = 'INTEGER',
    GroupId = 'INTEGER',
    InventoryId = 'INTEGER',
    RecordDate = 'DATE',
    StockQuantity = 'INTEGER',
    RecordQuantity = 'INTEGER',
    StockPrice = 'REAL',
    QuantityShift = 'INTEGER',
    PriceShift = 'REAL',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.WorkerId} ${AttributesTypes.WorkerId} ,
    ${Attributes.GroupId} ${AttributesTypes.GroupId},
    ${Attributes.InventoryId} ${AttributesTypes.InventoryId},
    ${Attributes.RecordDate} ${AttributesTypes.RecordDate},
    ${Attributes.StockQuantity} ${AttributesTypes.StockQuantity},
    ${Attributes.RecordQuantity} ${AttributesTypes.RecordQuantity},
    ${Attributes.StockPrice} ${AttributesTypes.StockPrice},
    ${Attributes.QuantityShift} ${AttributesTypes.QuantityShift},
    ${Attributes.PriceShift} ${AttributesTypes.PriceShift})`;

const selectAllQuery = `SELECT * FROM ${tableName}`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;


const registerRecordQuery = `INSERT INTO ${tableName} (
    ${Attributes.SessionId},
    ${Attributes.WorkerId} , ${Attributes.GroupId},${Attributes.InventoryId},
    ${Attributes.RecordDate}, ${Attributes.StockQuantity}, ${Attributes.RecordQuantity},
    ${Attributes.StockPrice}, ${Attributes.QuantityShift}, ${Attributes.PriceShift})
    VALUES (?,?, ?, ?,?, ?, ?, ?, ?, ?)`;
    
export const ActiveSessionRecordsTable = {
    createTableQuery: createTableQuery,
    selectAllQuery: selectAllQuery,
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