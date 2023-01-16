const tableName = 'ScannedArticles';

enum Attributes {
    ScannedCodebar = "ScannedCodebar"}

enum AttributesTypes {
    ScannedCodebar = "INTEGER PRIMARY KEY"}


const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.ScannedCodebar} ${AttributesTypes.ScannedCodebar})`;


const selectScannedQuery = `SELECT * FROM ${tableName} WHERE ${Attributes.ScannedCodebar} = ?`; 

const insertScannedQuery = `INSERT INTO ${tableName} (${Attributes.ScannedCodebar}) VALUES (?)`;


export const ScannedArticlesTable = {
    selectScannedQuery: selectScannedQuery,
    insertScannedQuery: insertScannedQuery,
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
}