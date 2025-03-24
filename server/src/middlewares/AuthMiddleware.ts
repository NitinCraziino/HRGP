import { Response, NextFunction, Request } from "express";
import { jwtService } from "../services";
import { UnauthorizedError } from "../types/CustomError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const authHeader = req.headers.authoriation || req.headers.Authorization;
        if (!authHeader) {
            throw new UnauthorizedError();
        }

        const token = Array.isArray(authHeader) ? authHeader[0].split("Bearer ")[1] : authHeader.split("Bearer ")[1];
        if (!token) {
            throw new UnauthorizedError();
        }

        const decoded = jwtService.verifyToken(token);

        // @ts-ignore
        req.user = decoded;

        next();

    } catch (error) {
        throw new UnauthorizedError(error instanceof Error ? error.message : "Unauthorized");
    }
};


export default authMiddleware;