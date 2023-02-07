const tableName = "Workers";

enum Attributes{
    WorkerId = 'WorkerId',
    WorkerName = 'WorkerName',
    WorkerEmail = 'WorkerEmail',
    WorkerPhone = 'WorkerPhone',
}

enum AttributesTypes{
    WorkerId = 'INTEGER PRIMARY KEY AUTO_INCREMEANT',
    WorkerName = 'TEXT ',
    WorkerEmail = 'TEXT ',
    WorkerPhone = 'TEXT',
}

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${Attributes.WorkerId} ${AttributesTypes.WorkerId},
    ${Attributes.WorkerName} ${AttributesTypes.WorkerName}
    ${Attributes.WorkerPhone} ${AttributesTypes.WorkerPhone}
    ${Attributes.WorkerEmail} ${AttributesTypes.WorkerEmail}
)`;

const registerWorker = `INSERT INTO ${tableName} (${Attributes.WorkerId},${Attributes.WorkerName},
    ${Attributes.WorkerEmail},${Attributes.WorkerPhone}
)`;

const unregisterWorker = `DELETE FROM ${tableName} WHERE ${Attributes.WorkerId} = ?`;

const updateWorker = `UPDATE ${tableName} `;

function updateQueryGenerator(attributes : AttributesWrapper[]) : string{
    let query = updateWorker;
    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `${attributes[i].name} = ?,`;
        }
        query += `${attributes[i].name} = ? `;
        query += `WHERE ${Attributes.WorkerId} = ?`
    }
    return query;
}

function searchQueryGenerator(attributes:AttributesWrapper[]) :string{
    let query = `Select * FROM ${tableName} WHERE`

    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            query += `(${attributes[i].name} = ? ) AND`;
        }
        query += `(${attributes[i].name} = ? )`;
    }


    return query;
}

const loadAllWorkers = `SELECT * FROM ${tableName}`


export const WorkersTable = {
    loadAllWorkers:loadAllWorkers,
    createTableQuery:createTableQuery,
    searchQueryGenerator:searchQueryGenerator,
    updateQueryGenerator:updateQueryGenerator,
    registerWorker:registerWorker,
    unregisterWorker:unregisterWorker,

}