const escalations = [];

export const addEscalation = (ticket) => {
    escalations.push(ticket);
};

export const getEscalations = () => escalations;