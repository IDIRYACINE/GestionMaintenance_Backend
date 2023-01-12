
const tableName = 'Designations';

enum Attributes {
    DesignationId = "DesignationId",
    DesignationName = "DesignationName",
}

enum AttributesTypes {
    DesignationId = "INTEGER PRIMARY KEY",
    DesignationName = "TEXT",
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.DesignationId} ${AttributesTypes.DesignationId} ,
    ${Attributes.DesignationName}  ${AttributesTypes.DesignationName})`;


const selectAllQuery = `SELECT * FROM ${tableName} `;


export const DesignationsTable = {
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
}