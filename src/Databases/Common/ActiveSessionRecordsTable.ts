
const tableName = 'session_records';

enum Attributes{
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
    RecordId = 'INTEGER PRIMARY KEY AUTOINCREMENT',
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

export const ActiveSessionRecordsTable = {
    createTableQuery: createTableQuery
}