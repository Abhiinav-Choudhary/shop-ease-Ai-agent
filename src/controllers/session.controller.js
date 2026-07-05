import {
    createSession,
    getSession,
} from "../storage/sessionStore.js";

export const createSessionController = (req, res) => {
    const sessionId = createSession();

    res.status(201).json({
        success: true,
        sessionId,
    });
};

export const getHistoryController = (req, res) => {
    const { id } = req.params;

    const history = getSession(id);

    if (!history) {
        return res.status(404).json({
            success: false,
            message: "Session not found",
        });
    }

    res.json({
        success: true,
        history,
    });
};