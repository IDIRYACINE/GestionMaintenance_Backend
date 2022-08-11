

const tableName = 'session_workers';

enum Attributes{
    WorkerId = 'WorkerId',
    GroupId = 'GroupId',
    Password = 'Password',
    Username = 'Username',
}

enum AttributesTypes{
    WorkerId = 'INTEGER PRIMARY KEY',
    GroupId = 'INTEGER',
    Password = 'TEXT',
    Username = 'TEXT',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.WorkerId} ${AttributesTypes.WorkerId} ,
    ${Attributes.GroupId}  ${AttributesTypes.GroupId},
    ${Attributes.Password} ${AttributesTypes.Password},
    ${Attributes.Username} ${AttributesTypes.Username})`;


export const SessionWorkersTable = {
    createTableQuery: createTableQuery
}