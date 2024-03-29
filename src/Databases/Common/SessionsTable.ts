const tableName = 'Sessions';

enum Attributes{
    SessionId = 'SessionId',
    Active = 'Active',
    StartDate = 'StartDate',
    EndDate = 'EndDate',
}

enum AttributesTypes{
    SessionId = 'TIMESTAMP PRIMARY KEY',
    Active = 'BOOLEAN',
    StartDate = 'DATE',
    EndDate = 'DATE',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.SessionId} ${AttributesTypes.SessionId} ,
    ${Attributes.Active}  ${AttributesTypes.Active},
    ${Attributes.StartDate} ${AttributesTypes.StartDate},
    ${Attributes.EndDate} ${AttributesTypes.EndDate})`;

const selectActiveSession = ` Select ${Attributes.Active},${Attributes.StartDate} ,
    ${Attributes.EndDate} , ${Attributes.SessionId}
    from ${tableName} 
    where ${Attributes.Active} = true  
    group by ${Attributes.SessionId} 
    having ${Attributes.SessionId} = max(${Attributes.SessionId});`;

const openSessionQuery = `INSERT INTO ${tableName} (
    ${Attributes.SessionId}, ${Attributes.Active}, ${Attributes.StartDate})
    VALUES (?, ?, ?)`;

const closeSession = `UPDATE ${tableName} SET ${Attributes.Active} = ? 
    WHERE ${Attributes.SessionId} = ?`;

const selectAllQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;

const clearAllQuery = `TRUNCATE TABLE ${tableName}`;

export const SessionTable = {

    createTableQuery: createTableQuery,
    /**
     * return active session or null
     */
    selectActiveSessionQuery: selectActiveSession,
    /**
     * attributes order : limit , offset
     */
    selectAllQuery: selectAllQuery,
    /**
     * insert session into table
     * attributes order: sessionId, active, startDate, endDate
     */
    openSessionQuery : openSessionQuery,

    /**
     * attributes order : active, sessionId
     */
    closeSessionQuery : closeSession,

    clearAllQuery : clearAllQuery,
    tableName : tableName,
}