
const affectationTableName = 'Affectations';
const permissionsTableName = 'AffectationsPermissions';

enum AffectationAttributes {
    AffectationId = "AffectationId",
    AffectationName = "AffectationName",
}

enum AffectationAttributesTypes {
    AffectationId = "INTEGER PRIMARY KEY",
    AffectationName = "TEXT",
}

enum PermissionsAttributes {
    UserId = "UserId",
    AffectationId = "AffectationId",
}

enum PermissionsAttributesTypes {
    UserId = "INTEGER",
    AffectationId = "INTEGER",
}



const createAffectationTableQuery = `CREATE TABLE IF NOT EXISTS ${affectationTableName} (
    ${AffectationAttributes.AffectationId} ${AffectationAttributesTypes.AffectationId} ,
    ${AffectationAttributes.AffectationName}  ${AffectationAttributesTypes.AffectationName})`;

const createPermissionsTableQuery = `CREATE TABLE IF NOT EXISTS ${permissionsTableName} (
    ${PermissionsAttributes.UserId} ${PermissionsAttributesTypes.UserId} ,
    ${PermissionsAttributes.AffectationId}  ${PermissionsAttributesTypes.AffectationId}),
    PRIMARY KEY (${PermissionsAttributes.UserId}, ${PermissionsAttributes.AffectationId})`;

const loadAffectationQuery = `SELECT * FROM ${affectationTableName} `;

const deleteAffectationQuery = `DELETE FROM ${affectationTableName} WHERE ${AffectationAttributes.AffectationId} = ?`;

const registerAffectationQuery = `INSERT INTO ${affectationTableName} (${AffectationAttributes.AffectationName}) VALUES (?)`;

const updateAffectationQuery = `UPDATE ${affectationTableName} SET ${AffectationAttributes.AffectationName} = ? WHERE ${AffectationAttributes.AffectationId} = ?`;

const searchAffectationQuery = `SELECT * FROM ${affectationTableName} WHERE ${AffectationAttributes.AffectationId} = ?`;

const loadUserAffectationPermissions = `SELECT ${AffectationAttributes.AffectationId} FROM ${permissionsTableName} WHERE
    ${PermissionsAttributes.UserId} = ?`;

const loadUserUngrantedAffectationPermissions = `SELECT ${AffectationAttributes.AffectationId} FROM ${permissionsTableName} 
    WHERE ${AffectationAttributes.AffectationId} NOT IN (${loadUserAffectationPermissions})`;    

export const AffectationTable = {

    createAffectationTableQuery: createAffectationTableQuery,

    affectationAttributes : AffectationAttributes,

    affectationTableName: affectationTableName,

    affectationPermissionsTableName: permissionsTableName,

    affectationPermissionsAttributes : PermissionsAttributes,

    registerAffectationQuery: registerAffectationQuery,

    updateAffectationQuery: updateAffectationQuery,

    deleteAffectationQuery: deleteAffectationQuery,

    loadUserAffectationPermissions : loadUserAffectationPermissions,

    loadUserUngrantedAffectationPermissions : loadUserUngrantedAffectationPermissions,

    loadAffectationQuery: loadAffectationQuery,

    searchAffectationQuery: searchAffectationQuery,

    createPermissionsTableQuery: createPermissionsTableQuery,
}