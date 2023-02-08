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



const selectInventoryProduct = `SELECT ${tableName}.* , ${AffectationTable.affectationTableName}.${AffectationTable.affectationAttributes.AffectationName}
    FROM ${tableName} 
    INNER JOIN ${AffectationTable.affectationTableName} ON ${AffectationTable.affectationTableName}.${AffectationTable.affectationAttributes.AffectationId}
     = ${tableName}.${Attributes.AffectationId}
    WHERE ${Attributes.ArticleCode} =  ? AND ${tableName}.${Attributes.AffectationId} IN (?)`

const selectAllQuery = `SELECT * FROM ${tableName} `;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const registerInventoryProduct = `INSERT INTO ${tableName} (  ${Attributes.ArticleId}  ,
    ${Attributes.ArticleName} , ${Attributes.ArticleCode} ,${Attributes.AffectationId} ,${Attributes.FamilyCode})
    VALUES (?,?,?,?,?,?)`;

const registerInventoryProductBatch = `INSERT INTO ${tableName} (  ${Attributes.ArticleId} ,
        ${Attributes.ArticleName} , ${Attributes.ArticleCode} ,${Attributes.AffectationId} ,${Attributes.FamilyCode})
        VALUES ?`;

const unregisterInventoryProduct = `DELETE FROM ${tableName} WHERE ${Attributes.ArticleId} = ? `;

function generateUpdateQuery(attributes: AttributesWrapper[]): string {
    let query = `UPDATE ${tableName} `;
    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `${attributes[i].name} = ?,`;
        }
        query += `${attributes[i].name} = ? `;
        query += `WHERE ${Attributes.ArticleId} = ?`
    }
    return query;

}

function generateSearchQuery(attributes:AttributesWrapper[],hasPermissions:boolean,isAdmin:boolean):string{
    let query = `SELECT * FROM ${tableName} `;

    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `(${attributes[i].name} = ?) AND `;
        }

        query += `(${attributes[i].name} = ? )`;

        if(isAdmin)
            return query;

        if(hasPermissions )
            query += ` AND ${AffectationTable.affectationPermissionsAttributes.AffectationId} 
            NOT IN (?)`;
        
        return query;    
    }


    return query;
}

const InventoryTable = {

    createTableQuery: createTableQuery,

    generateSearchQuery : generateSearchQuery,

    generateUpdateQuery: generateUpdateQuery,

    selectAllQuery: selectAllQuery,

    selectInventoryProduct: selectInventoryProduct,

    clearAllQuery: clearAllQuery,

    registerInventoryProduct: registerInventoryProduct,

    unregisterInventoryProduct: unregisterInventoryProduct,

    registerInventoryProductBatch : registerInventoryProductBatch,

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

export { InventoryTable, InventoryProductRow }