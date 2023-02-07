import { AffectationTable } from "./AffectationsTable";

const tableName = 'GroupsPermissions';

enum Attributes {
    GroupId = 'GroupId',
    PermissionId = 'PermissionId',
}

enum AttributesTypes {
    PermissionId = 'INTEGER ',
    GroupId = 'INTEGER',

}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.GroupId} ${AttributesTypes.GroupId} ,
    ${Attributes.PermissionId}  ${AttributesTypes.PermissionId},
    PRIMARY KEY (${Attributes.GroupId}  , ${Attributes.PermissionId} )
    )`;


const selectGroupPermissions = `SELECT ${Attributes.PermissionId} FROM ${tableName} WHERE 
    ${Attributes.GroupId} =  ?`;


const loadGroupPermissions = `SELECT * FROM  ${AffectationTable.affectationTableName}  WHERE 
    ${AffectationTable.affectationAttributes.AffectationId}  IN ( SELECT  ${Attributes.PermissionId} 
    FROM  ${tableName} WHERE  ${Attributes.GroupId} = ? ) `;

const loadGroupUngrantedPermissions = `SELECT * FROM  ${AffectationTable.affectationTableName}  WHERE  
        ${AffectationTable.affectationAttributes.AffectationId}  NOT IN ( ${loadGroupPermissions} ) `;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

const grantPermissionQuery = `INSERT INTO ${tableName} (${Attributes.GroupId} , ${Attributes.PermissionId}) VALUES ?`;

const revokePermissionHelper = `(${Attributes.GroupId} = ? AND ${Attributes.PermissionId} = ?)`;
const revokePermissionQuery = `DELETE FROM ${tableName} WHERE `;

function revokePermissionQueryGenerator(permissionsCount : number) : string{
    let query = revokePermissionQuery;
    for (let i = 0; i < permissionsCount; i++) {
        if (i > 0) {
            query += ' OR ';
        }
        query += revokePermissionHelper;
    }
    return query;
}

function grantPermissionsQueryGenerator(permissionsCount : number) : string{
    let query = grantPermissionQuery;
    for (let i = 0; i < permissionsCount; i++) {
        if (i > 0) {
            query += ',';
        }
        query += '(?,?);';
    }
    return query;
}

export const GroupsPermissionsTable = {

    createTableQuery: createTableQuery,

    loadGroupPermissionsQuery: loadGroupPermissions,

    selectGroupPermissions: selectGroupPermissions,

    clearAllQuery: clearAllQuery,

    loadGroupUngrantedPermissions: loadGroupUngrantedPermissions,

    grantPermissionQueryGenerator: grantPermissionsQueryGenerator,

    revokePermissionQueryGenerator: revokePermissionQueryGenerator,

    tableName: tableName,

    attributes: Attributes,

}