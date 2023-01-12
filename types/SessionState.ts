

interface SessionState{
    getSessionId : () => number;
    notifySessionIdChange : () => void;
}