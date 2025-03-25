import { Response, NextFunction, Request } from "express";
import { StatusCode } from "../types";
import { CustomError } from "../types/CustomError";
import logger from "../utils/logger";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    logger.error({
        message,
        statusCode,
        location: err.location,
        data: err.data,
        stack: err.stack,
    });

    res.status(statusCode).json({ message });
};