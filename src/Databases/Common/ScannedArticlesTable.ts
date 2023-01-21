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


const selectScannedQuery = `SELECT * FROM ${tableName} WHERE ${Attributes.ScannedCodebar} = ?`; 

const insertScannedQuery = `INSERT IGNORE INTO ${tableName} (${Attributes.ScannedCodebar},${Attributes.AffectationId}) VALUES (?,?)`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

export const ScannedArticlesTable = {
    selectScannedQuery: selectScannedQuery,
    insertScannedQuery: insertScannedQuery,
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
    clearAllQuery : clearAllQuery,
}