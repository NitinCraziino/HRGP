import { sign, TokenExpiredError, verify } from "jsonwebtoken";
import { NODE_ENV, TOKEN_SECRET } from "../config";
import { TokenPayload } from "../types";
import { UnauthorizedError } from "../types/CustomError";

export default class JwtService {
    createToken(payload: TokenPayload): string {
        const exp = NODE_ENV === 'production' ? "7h" : "10d";
        return sign(payload, TOKEN_SECRET, { expiresIn: exp });
    }

    verifyToken(token: string): TokenPayload {
        try {
            return verify(token, TOKEN_SECRET) as TokenPayload;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedError("Token expired");
            }
            throw new UnauthorizedError("Invalid token");
        }
    }
}

export const jwtService = new JwtService();