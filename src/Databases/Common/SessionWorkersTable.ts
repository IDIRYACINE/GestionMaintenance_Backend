
const sessionWorkerTable = 'SessionWorkers';
const workersTable = 'Workers';


enum WAttributes{
    WorkerId = 'WorkerId',
    WorkerName = 'WorkerName',
}

enum SWAttributes{
    WorkerId = 'WorkerId',
    GroupId = 'GroupId',
    Password = 'Password',
    Username = 'Username',
    SupervisorId = 'SupervisorId'
}

enum SWAttributesTypes{
    WorkerId = 'INTEGER PRIMARY KEY',
    GroupId = 'INTEGER',
    Password = 'TEXT',
    Username = 'TEXT',
    SupervisorId = 'INTEGER'
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${sessionWorkerTable} (
    ${SWAttributes.WorkerId} ${SWAttributesTypes.WorkerId} ,
    ${SWAttributes.GroupId}  ${SWAttributesTypes.GroupId},
    ${SWAttributes.Password} ${SWAttributesTypes.Password},
    ${SWAttributes.SupervisorId} ${SWAttributesTypes.SupervisorId},
    ${SWAttributes.Username} ${SWAttributesTypes.Username})`;

const selectWorkerQuery = `SELECT ${sessionWorkerTable}.${SWAttributes.GroupId} AS groupId,
    ${workersTable}.${WAttributes.WorkerName} AS workerName,
    ${sessionWorkerTable}.${SWAttributes.WorkerId} AS workerId,
    ${sessionWorkerTable}.${SWAttributes.Username} AS username 
    FROM ${sessionWorkerTable},${workersTable} 
    WHERE ${SWAttributes.Username} = ? AND ${SWAttributes.Password} = ?`;


const registerWorkerQuery = `INSERT INTO ${sessionWorkerTable} (
    ${SWAttributes.WorkerId} , ${SWAttributes.GroupId},
    ${SWAttributes.Password}, ${SWAttributes.Username})
    VALUES (?, ?, ?, ?)`;

const upadteWorkerQuery = `UPDATE ${sessionWorkerTable} SET ${SWAttributes.Password} = ? ,
    ${SWAttributes.Username} = ?, ${SWAttributes.GroupId} = ?,
    WHERE ${SWAttributes.WorkerId} = ?`;

const unregisterWorkerQuery = `DELETE FROM ${sessionWorkerTable} WHERE ${SWAttributes.WorkerId} = ?`;

const selectAllQuery = `SELECT * FROM ${sessionWorkerTable} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${sessionWorkerTable}`;

export const SessionWorkersTable = {

    createTableQuery: createTableQuery,
    /**
     * select worker where phone and password match
     * otherwise return null
     * attributes order: phone, password
     */
    selectQuery: selectWorkerQuery,
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

    clearAllQuery : clearAllQuery,
    tableName : sessionWorkerTable,

}