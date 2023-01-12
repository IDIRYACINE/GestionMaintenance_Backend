

const tableName = 'Inventory';

enum Attributes {
    ArticleId,
    ArticleCode,
    StockId,
    ArticleName,
    DesignationId,
    FamilyCode,
}


enum AttributesTypes {
    ArticleId = "INTEGER PRIMARY KEY",
    ArticleName = "TEXT",
    ArticleCode = " INTEGER",
    DesignationId = " INTEGER",
    FamilyCode = " INTEGER"

}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.ArticleId} ${AttributesTypes.ArticleId} ,
    ${Attributes.ArticleName}  ${AttributesTypes.ArticleName},
    ${Attributes.ArticleCode} ${AttributesTypes.ArticleCode},
    ${Attributes.DesignationId} ${AttributesTypes.DesignationId},
    ${Attributes.FamilyCode} ${AttributesTypes.FamilyCode})`;



const selectInventoryProduct = `SELECT * FROM ${tableName} WHERE 
    ${Attributes.ArticleCode} =  ? AND ${Attributes.DesignationId} IN (?)
    INNER JOIN Designations ON Designations.DesignationId = Inventory.DesignationId
    `

const selectAllQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const InventoryTable = {

    createTableQuery: createTableQuery,

    selectAllQuery: selectAllQuery,

    selectInventoryProduct: selectInventoryProduct,

    clearAllQuery: clearAllQuery,

    tableName: tableName,

}  

interface InventoryProductRow {
    ArticleId: number;
    ArticleCode: number;
    StockId: number;
    ArticleName: string;
    DesignationId: number;
    DesignationName: string;
    FamilyCode: number;
}

export { InventoryTable, InventoryProductRow}