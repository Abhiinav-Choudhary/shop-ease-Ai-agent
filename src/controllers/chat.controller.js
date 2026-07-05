import { sessionExists } from "../storage/sessionStore.js";
import { chatWithAgent } from "../services/agent.services.js";
import { chatSchema } from "../utils/validators.js";

export async function chatController(req, res) {

    try {

        const { id } = req.params;

        const { message } = req.body;

        const parsed = chatSchema.safeParse(req.body);

     if (!parsed.success) {

    return res.status(400).json({

        message: parsed.error.issues[0].message

    });

    }

        if (!sessionExists(id)) {
            return res.status(404).json({
                message: "Session not found",
            });
        }

        const reply = await chatWithAgent(id, message);

        res.json({
            reply,
        });

    } catch (err) {

    console.error(err);

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });

    }

}