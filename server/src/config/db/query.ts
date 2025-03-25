import { InternalServerError } from "../../types/CustomError";
import { pool } from "./connect";

export async function query<T>(sql: string, params?: any[]): Promise<T> {
    try {
        const [results] = await pool.execute(sql, params);
        return results as T;
    } catch (error) {
        console.error('❌ Query failed:', error);
        throw new InternalServerError("Database query failed");
    }
}

export default query;
