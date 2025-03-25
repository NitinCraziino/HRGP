import connectDb from "./connect";
import { InternalServerError } from "../../types/CustomError";
export async function query<T>(sql: string, params?: any[]): Promise<T> {
    const connection = await connectDb();

    try {
        const [results] = await connection.execute(sql, params);
        return results as T;
    } catch (error) {
        console.error('Query execution failed:', error);
        throw new InternalServerError("Database query failed");
    } finally {
        await connection.end();
    }
}

export default query;
