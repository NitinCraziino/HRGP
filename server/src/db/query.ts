import connectDb from "./connect";
import { InternalServerError } from "../types/CustomError";

const query = async <T>(sql: string, params?: any[]): Promise<T> => {
  const connection = await connectDb();

  try {
    const [results] = await connection.query(sql, params);
    return results as T;
  } catch (error) {
    console.error("Query execution failed:", error);
    throw new InternalServerError("Database query failed");
  } finally {
    await connection.end();
  }
};

export default query;
