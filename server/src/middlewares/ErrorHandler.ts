import { Response, NextFunction, Request } from "express";
import { StatusCode } from "../types";
import { CustomError } from "../types/CustomError";
import logger from "../utils/logger";
import { ZodError } from "zod";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    if (err instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.errors.map((error) => error.message).join(", ") });
        return;
    }

    logger.error(err);
    res.status(statusCode).json({ message });
};