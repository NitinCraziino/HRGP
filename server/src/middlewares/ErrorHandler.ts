import { Response, NextFunction, Request } from "express";
import { StatusCode } from "../types";
import { CustomError } from "../types/CustomError";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({ message });
};