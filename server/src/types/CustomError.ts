import { StatusCode } from ".";

export class CustomError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public location: string = 'Unknown',
        public data?: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.location = location;
        this.data = data;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = "Bad Request", location: string = 'Unknown') {
        super(message, StatusCode.BAD_REQUEST, location);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = "Unauthorized", location: string = 'Unknown') {
        super(message, StatusCode.UNAUTHORIZED, location);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = "Forbidden", location: string = 'Unknown') {
        super(message, StatusCode.FORBIDDEN, location);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = "Not Found", location: string = 'Unknown') {
        super(message, StatusCode.NOT_FOUND, location);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string = "Internal Server Error", location: string = 'Unknown') {
        super(message, StatusCode.INTERNAL_SERVER_ERROR, location);
    }
}

export class ValidationError extends CustomError {
    constructor(message: string = "Validation Error", location: string = 'Unknown') {
        super(message, StatusCode.BAD_REQUEST, location);
    }
}


export class ConflictError extends CustomError {
    constructor(message: string = "Conflict", location: string = 'Unknown') {
        super(message, StatusCode.CONFLICT, location);
    }
}