import { sign, TokenExpiredError, verify } from "jsonwebtoken";
import { NODE_ENV, TOKEN_SECRET } from "../config";
import { StatusCode, TokenPayload } from "../types";
import { CustomError, UnauthorizedError } from "../types/CustomError";

export default class JwtService {
  createToken(payload: TokenPayload): string {
    const exp = NODE_ENV === "production" ? "7h" : "10d";
    return sign(payload, TOKEN_SECRET, { expiresIn: exp });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return verify(token, TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError("Token expired", StatusCode.TOKEN_EXPIRED, "JwtService");
      }
      throw new UnauthorizedError("Invalid token", "JwtService");
    }
  }
}

export const jwtService = new JwtService();
