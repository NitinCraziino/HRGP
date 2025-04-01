import { InternalServerError } from "../types/CustomError";

/**
 * Wraps database queries in a try-catch block with standardized error handling
 * @template T - The expected return type of the database query
 * @param {() => Promise<T>} queryFn - The async database query function to execute
 * @param {string} serviceName - The name of the service making the query (for error tracking)
 * @returns {Promise<T>} - The result of the database query
 * @throws {InternalServerError} - If the database query fails
 */

export const executeDbQuery = async <T>(queryFn: () => Promise<T>, serviceName: string): Promise<T> => {
    try {
        const result = await queryFn();
        console.log(serviceName, "result", result);
        // @ts-ignore
        return result[1][0] as T;
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error instanceof Error ? error.message : "Database Query Failed", serviceName);
    }
};