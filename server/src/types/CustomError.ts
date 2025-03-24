import { StatusCode } from ".";

export class CustomError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = "Bad Request") {
        super(message, StatusCode.BAD_REQUEST);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = "Unauthorized") {
        super(message, StatusCode.UNAUTHORIZED);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = "Forbidden") {
        super(message, StatusCode.FORBIDDEN);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = "Not Found") {
        super(message, StatusCode.NOT_FOUND);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string = "Internal Server Error") {
        super(message, StatusCode.INTERNAL_SERVER_ERROR);
    }
}

