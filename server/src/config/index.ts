import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const TOKEN_SECRET = process.env.JWT_SECRET || "secret";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:8000";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "your_database_name";
