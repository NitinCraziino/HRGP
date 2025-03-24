import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { jwtService } from "../services";
import { UnauthorizedError } from "../types/CustomError";

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            throw new UnauthorizedError();
        }

        const token = Array.isArray(authHeader) ? authHeader[0].split("Bearer ")[1] : authHeader.split("Bearer ")[1];
        if (!token) {
            throw new UnauthorizedError();
        }

        const decoded = jwtService.verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        throw new UnauthorizedError(error instanceof Error ? error.message : "Unauthorized");
    }
};


export default authMiddleware;