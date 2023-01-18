
const tableName = 'Affectations';

enum Attributes {
    AffectationId = "AffectationId",
    AffectationName = "AffectationName",
}

enum AttributesTypes {
    AffectationId = "INTEGER PRIMARY KEY",
    AffectationName = "TEXT",
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.AffectationId} ${AttributesTypes.AffectationId} ,
    ${Attributes.AffectationName}  ${AttributesTypes.AffectationName})`;


const selectAllQuery = `SELECT * FROM ${tableName} `;


export const AffectationTable = {
    createTableQuery: createTableQuery,
    attributes : Attributes,
    tableName: tableName,
}