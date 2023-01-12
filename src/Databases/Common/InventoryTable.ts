import { DesignationsTable } from './DesignationsTable';

const tableName = 'Inventory';

enum Attributes {
    ArticleId = "ArticleId",
    ArticleCode = "ArticleCode",
    StockId = "StockId",
    ArticleName = "ArticleName",
    DesignationId = "DesignationId",
    FamilyCode = "FamilyCode",
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



const selectInventoryProduct = `SELECT ${tableName}.* , ${DesignationsTable.tableName}.${DesignationsTable.attributes.DesignationName}
    FROM ${tableName} 
    INNER JOIN Designations ON Designations.DesignationId = Inventory.DesignationId
    WHERE ${Attributes.ArticleCode} =  ? AND ${tableName}.${Attributes.DesignationId} IN (?)`

const selectAllQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const InventoryTable = {

    createTableQuery: createTableQuery,

    selectAllQuery: selectAllQuery,

    selectInventoryProduct: selectInventoryProduct,

    clearAllQuery: clearAllQuery,

    tableName: tableName,

    attributes: Attributes
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