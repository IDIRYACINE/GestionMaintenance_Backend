const tableName = 'GroupsPermissions';

enum Attributes{
    GroupId = 'GroupId',
    PermissionId = 'PermissionId',
}

enum AttributesTypes{
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


const selectAllQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

export const GroupsPermissionsTable = {

    createTableQuery: createTableQuery,
 
    selectAllQuery: selectAllQuery,

    selectGroupPermissions : selectGroupPermissions,
 
    clearAllQuery : clearAllQuery,
    tableName : tableName,

}