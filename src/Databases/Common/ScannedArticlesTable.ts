const tableName = 'ScannedArticles';

enum Attributes {
    ScannedCodebar = "ScannedCodebar"}

enum AttributesTypes {
    ScannedCodebar = "INTEGER PRIMARY KEY"}


const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.ScannedCodebar} ${AttributesTypes.ScannedCodebar})`;


const selectScannedQuery = `SELECT * FROM ${tableName} WHERE ${Attributes.ScannedCodebar} = ?`; 

const insertScannedQuery = `INSERT IGNORE INTO ${tableName} (${Attributes.ScannedCodebar}) VALUES (?)`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

export const ScannedArticlesTable = {
    selectScannedQuery: selectScannedQuery,
    insertScannedQuery: insertScannedQuery,
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
    clearAllQuery : clearAllQuery,
}