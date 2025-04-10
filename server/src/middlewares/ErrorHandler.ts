import { Response, NextFunction, Request } from "express";
import { StatusCode } from "../types";
import { CustomError } from "../types/CustomError";
import logger from "../utils/logger";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    if (err instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.errors.map((error) => error.message).join(", ") });
        return;
    }

    if (message === "Token expired") {
        console.log(message, statusCode);

        res.status(StatusCode.TOKEN_EXPIRED).json({ message: "Token expired" });
        return;
    }

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }


    logger.error(err);
    res.status(statusCode).json({ message });
};