import { v4 as uuid } from "uuid";

const sessions = new Map();

const MAX_HISTORY = 20;

export const createSession = () => {
    const sessionId = uuid();

    sessions.set(sessionId, []);

    return sessionId;
};

export const getSession = (sessionId) => {
    return sessions.get(sessionId);
};

export const sessionExists = (sessionId) => {
    return sessions.has(sessionId);
};

// Generic function to store any conversation entry
export const addConversationEntry = (sessionId, message) => {

    const history = sessions.get(sessionId);

    if (!history) return false;

    history.push(message);

    // Keep only the most recent messages
    if (history.length > MAX_HISTORY) {
        history.shift();
    }

    return true;
};

// Optional helper for normal text messages
export const addMessage = (sessionId, role, content) => {

    return addConversationEntry(sessionId, {
        role,
        content,
        timestamp: new Date().toISOString(),
    });

};

export const clearSession = (sessionId) => {
    sessions.delete(sessionId);
};

export const getAllSessions = () => sessions;