const tableName = "FamilyCode"

enum Attributes{
    FamilyCode = 'FamilyCode',
    FamilyName = 'FamilyName',
}

enum AttributesTypes {
    FamilyCode = 'INTEGER PRIMARY KEY',
    FamilyName = 'TEXT',
}



const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.FamilyCode} ${AttributesTypes.FamilyCode},
    ${Attributes.FamilyName}  ${AttributesTypes.FamilyName})`;



const selectAllQuery = `SELECT * FROM ${tableName}`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const registerProductFamily = `INSERT INTO ${tableName} ( 
    ${Attributes.FamilyCode} ,${Attributes.FamilyName} )
    VALUES (?,?)`;

const unregisterProductFamily = `DELETE FROM ${tableName} WHERE ${Attributes.FamilyCode} = ? `;

function generateUpdateQuery(attributes: AttributesWrapper[]): string {
    let query = `UPDATE ${tableName} `;
    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `${attributes[i].name} = ?,`;
        }
        query += `${attributes[i].name} = ? `;
        query += `WHERE ${Attributes.FamilyCode} = ?`
    }
    return query;

}

function generateSearchQuery(attributes:AttributesWrapper[]):string{
    let query = `SELECT * FROM ${tableName} `;

    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `(${attributes[i].name} = ?) AND `;
        }

        query += `(${attributes[i].name} = ? )`;

        
        return query;    
    }


    return query;
}

const InventoryTable = {

    createTableQuery: createTableQuery,

    generateSearchQuery : generateSearchQuery,

    generateUpdateQuery: generateUpdateQuery,

    selectAllQuery: selectAllQuery,

    clearAllQuery: clearAllQuery,

    registerProductFamily: registerProductFamily,

    unregisterProductFamily: unregisterProductFamily,

    tableName: tableName,

    attributes: Attributes
}