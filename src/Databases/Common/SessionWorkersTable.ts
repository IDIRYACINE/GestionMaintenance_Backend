const tableName = 'session_workers';

enum Attributes{
    WorkerId = 'WorkerId',
    GroupId = 'GroupId',
    Password = 'Password',
    Username = 'Username',
    Phone = 'Phone',
}

enum AttributesTypes{
    WorkerId = 'INTEGER PRIMARY KEY',
    GroupId = 'INTEGER',
    Phone = 'INTEGER',
    Password = 'TEXT',
    Username = 'TEXT',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.WorkerId} ${AttributesTypes.WorkerId} ,
    ${Attributes.GroupId}  ${AttributesTypes.GroupId},
    ${Attributes.Password} ${AttributesTypes.Password},
    ${Attributes.Phone} ${AttributesTypes.Phone},
    ${Attributes.Username} ${AttributesTypes.Username})`;

const selecteWorkerQuery = `SELECT * FROM ${tableName} WHERE 
    ${Attributes.Phone} = ? AND ${Attributes.Password} = ?`;

const registerWorkerQuery = `INSERT INTO ${tableName} (
    ${Attributes.WorkerId} , ${Attributes.GroupId},
    ${Attributes.Password}, ${Attributes.Username})
    VALUES (?, ?, ?, ?)`;

const upadteWorkerQuery = `UPDATE ${tableName} SET ${Attributes.Password} = ? ,
    ${Attributes.Username} = ?, ${Attributes.GroupId} = ?,
    WHERE ${Attributes.WorkerId} = ?`;

const unregisterWorkerQuery = `DELETE FROM ${tableName} WHERE ${Attributes.WorkerId} = ?`;

const selectAllQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

export const SessionWorkersTable = {

    createTableQuery: createTableQuery,
    /**
     * select worker where phone and password match
     * otherwise return null
     * attributes order: phone, password
     */
    selectQuery: selecteWorkerQuery,
    /**
     * attributes order : limit , offset
     */
    selectAllQuery: selectAllQuery,
    /**
     * insert worker into table
     * attributes order: workerId, groupId, phone, password, username
     */
    registerWorkerQuery : registerWorkerQuery,
    /**
     * update worker password
     * attributes order: password,username,phone,groupId,workerId
     */
    updateWorkerQuery : upadteWorkerQuery,

    /**
     * unregister worker from table
     * attributes order: workerId
     */
    unregisterWorkerQuery : unregisterWorkerQuery,

    clearAllQuery : clearAllQuery
}