import { addEscalation } from "../storage/escalationStore.js";

export default function escalateToHuman(summary, priority = "medium") {

    const ticket = {
        ticketId: `ESC-${Date.now()}`,
        priority,
        summary,
        createdAt: new Date().toISOString()
    };

    addEscalation(ticket);

   return {

    success:true,

    ticketId:ticket.ticketId,

    priority:ticket.priority,

    createdAt:ticket.createdAt,

    message:"Your issue has been successfully escalated."

};
}