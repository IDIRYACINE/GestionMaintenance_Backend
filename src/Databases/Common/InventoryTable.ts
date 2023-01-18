import { AffectationTable } from './AffectationsTable';

const tableName = 'Inventory';

enum Attributes {
    ArticleId = "ArticleId",
    ArticleCode = "ArticleCode",
    StockId = "StockId",
    ArticleName = "ArticleName",
    AffectationId = "AffectationId",
    FamilyCode = "FamilyCode",
}


enum AttributesTypes {
    ArticleId = "INTEGER PRIMARY KEY",
    ArticleName = "TEXT",
    ArticleCode = " INTEGER",
    AffectationId = " INTEGER",
    FamilyCode = " INTEGER"

}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.ArticleId} ${AttributesTypes.ArticleId} ,
    ${Attributes.ArticleName}  ${AttributesTypes.ArticleName},
    ${Attributes.ArticleCode} ${AttributesTypes.ArticleCode},
    ${Attributes.AffectationId} ${AttributesTypes.AffectationId},
    ${Attributes.FamilyCode} ${AttributesTypes.FamilyCode})`;



const selectInventoryProduct = `SELECT ${tableName}.* , ${AffectationTable.tableName}.${AffectationTable.attributes.AffectationName}
    FROM ${tableName} 
    INNER JOIN ${AffectationTable.tableName} ON ${AffectationTable.tableName}.${AffectationTable.attributes.AffectationId}
     = ${tableName}.${Attributes.AffectationId}
    WHERE ${Attributes.ArticleCode} =  ? AND ${tableName}.${Attributes.AffectationId} IN (?)`

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
    AffectationId: number;
    AffectationName: string;
    FamilyCode: number;
    ArticlePrice: number;
}

export { InventoryTable, InventoryProductRow}