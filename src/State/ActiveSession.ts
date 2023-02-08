/// <reference path= "../../types/SessionState.d.ts" />

import { MariaDb } from "../Databases/MariaDb/MariaDb" ;


let sessionId : any 


function fetchNewSessionId() : void {
    MariaDb.fetchActiveSession().then(session => {
        if(session != null) {
            sessionId = session.sessionId
        }
    })
}

function getSessionId() : any {
    console.log(sessionId)
    return sessionId
}

export const ActiveSession : SessionState = {
    getSessionId: getSessionId,
    notifySessionIdChange: fetchNewSessionId
}