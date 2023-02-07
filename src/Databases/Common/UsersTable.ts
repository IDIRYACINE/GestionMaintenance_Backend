import { AffectationTable } from "./AffectationsTable";

const tableName = 'Users';

enum Attributes {
    UserId = "UserId",
    UserName = "UserName",
    Password = "Password",
    Admin = "Admin",
}

enum AttributesTypes {
    UserId = "INTEGER PRIMARY KEY AUTO_INCREMENT",
    UserName = "TEXT",
    Password = "TEXT",
    Admin = "BOOLEAN",
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.UserId} ${AttributesTypes.UserId} ,
    ${Attributes.UserName}  ${AttributesTypes.UserName},
    ${Attributes.Password}  ${AttributesTypes.Password},
    ${Attributes.Admin}  ${AttributesTypes.Admin}
    )`;

const registerUserQuery = `INSERT INTO ${tableName} (${Attributes.UserName} , ${Attributes.Password} , ${Attributes.Admin}) VALUES (?,?,?)`;

const updateUserQuery = `UPDATE ${tableName} SET ${Attributes.UserName} = ? , ${Attributes.Password} = ? , ${Attributes.Admin} = ? WHERE ${Attributes.UserId} = ?`;

const deleteUserQuery = `DELETE FROM ${tableName} WHERE ${Attributes.UserId} = ?`;

const clearUserPermissionsQuery = `DELETE FROM ${AffectationTable.affectationPermissionsTableName} 
    ${AffectationTable.affectationPermissionsAttributes.UserId} = ?`;

const grantAffectationSupervisorQuery = `INSERT INTO ${AffectationTable.affectationPermissionsTableName}
    (${AffectationTable.affectationPermissionsAttributes.UserId , AffectationTable.affectationPermissionsAttributes.AffectationId}) 
    VALUES `;

function grantAffectationSupervisorGenerator(permissionsCount:number) : string{
    let query = grantAffectationSupervisorQuery;
    for (let i = 0; i < permissionsCount; i++) {
        if (i > 0) {
            query += ',';
        }
        query += '(?,?) ;';
    }
    return query;
}    

const revokeHelper = `(${AffectationTable.affectationPermissionsAttributes.UserId} = ? AND 
${AffectationTable.affectationPermissionsAttributes.AffectationId} = ? )`;
const revokeAffectationSupervisionQuery = `DELTE FROM ${AffectationTable.affectationPermissionsTableName} `;

function revokeAffectationSupervisionGenerator(permissionsCount:number) : string {
    let query = revokeAffectationSupervisionQuery;
    for (let i = 0; i < permissionsCount; i++) {
        if (i > 0) {
            query += ' OR ';
        }
        query += revokeHelper;
    }
    return query;
}


const loginQuery = `SELECT * FROM ${tableName} WHERE 
    ${Attributes.UserName} = ? AND ${Attributes.Password} = ? `;

const selectAllUsersQuery = `SELECT * FROM ${tableName}`;    

const registerDefaultAdminUserQuery =`INSERT INTO ${tableName} (${Attributes.UserName} , ${Attributes.Password} , ${Attributes.Admin})
     VALUES (admin,admin,true)`;


export const UsersTable = {

    createTableQuery: createTableQuery,
    registerDefaultAdminUserQuery : registerDefaultAdminUserQuery,
    registerUserQuery : registerUserQuery,

    updateUserQuery : updateUserQuery,

    deleteUserQuery : deleteUserQuery,

    clearUserPermissionsQuery : clearUserPermissionsQuery,

    grantAffectationSupervisorGenerator : grantAffectationSupervisorGenerator,

    revokeAffectationSupervisionGenerator : revokeAffectationSupervisionGenerator,
    
    selectAllUsersQuery : selectAllUsersQuery,

    loginQuery : loginQuery,

    tableName: tableName,

    attributes: Attributes,

}