/// <reference path= "../../types/SessionState.ts" />

import { MariaDb } from "../Databases/MariaDb/MariaDb" ;


let sessionId : any 


function fetchNewSessionId() : void {
    MariaDb.fetchActiveSession().then(session => {
        if(session != null) {
            sessionId = session.sessionId
        }
    })
}



export const ActiveSession : SessionState = {
    getSessionId: () => sessionId,
    notifySessionIdChange: fetchNewSessionId
}