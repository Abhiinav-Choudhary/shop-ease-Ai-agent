export class ServiceUnavailableError extends Error {
    constructor(message = "I'm having trouble right now. Please try again.") {
        super(message);
        this.name = "ServiceUnavailableError";
        this.statusCode = 503;
    }
}

export class RequestTimeoutError extends Error {
    constructor(message = "The request timed out.") {
        super(message);
        this.name = "RequestTimeoutError";
        this.statusCode = 504;
    }
}