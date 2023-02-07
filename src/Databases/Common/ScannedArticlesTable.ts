import { InventoryTable } from "./InventoryTable";

const tableName = 'ScannedArticles';

enum Attributes {
    ScannedCodebar = "ScannedCodebar",
    AffectationId = "AffectationId"
}

enum AttributesTypes {
    ScannedCodebar = "INTEGER PRIMARY KEY",
    AffectationId = "INTEGER"}


const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.ScannedCodebar} ${AttributesTypes.ScannedCodebar},
    ${Attributes.AffectationId} ${AttributesTypes.AffectationId}
    )`;


const selectScannedQuery = `SELECT * FROM ${tableName} `; 

const insertScannedQuery = `INSERT IGNORE INTO ${tableName} (${Attributes.ScannedCodebar},${Attributes.AffectationId}) VALUES (?,?)`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const selectUnScannedQuery = `SELECT * FROM ${InventoryTable.tableName} WHERE 
    ${InventoryTable.attributes.ArticleId} NOT IN (${selectScannedQuery})`;

export const ScannedArticlesTable = {
    selectScannedQuery: selectScannedQuery,
    selectUnScannedQuery : selectUnScannedQuery,
    insertScannedQuery: insertScannedQuery,
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
    clearAllQuery : clearAllQuery,
}