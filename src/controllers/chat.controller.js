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

        console.log(err);

        res.status(500).json({
            message: err.message,
        });

    }

}