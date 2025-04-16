import { InternalServerError } from "../types/CustomError";

/**
 * Wraps database queries in a try-catch block with standardized error handling
 * @template T - The expected return type of the database query
 * @param {() => Promise<T>} queryFn - The async database query function to execute
 * @param {string} serviceName - The name of the service making the query (for error tracking)
 * @param {boolean} isSP - Whether the query is a stored procedure
 * @returns {Promise<T>} - The result of the database query
 * @throws {InternalServerError} - If the database query fails
 */

export const executeDbQuery = async <T>(
  queryFn: () => Promise<T>,
  serviceName: string,
  isSP: boolean = true,
): Promise<T> => {
  try {
    let result = await queryFn();
    // @ts-ignore
    result = isSP ? result[1][0] : result && result.length > 0 ? result[0] : null;
    console.log(serviceName, "result", result);
    return result;
  } catch (error) {
    console.log(error);
    throw new InternalServerError(
      error instanceof Error ? error.message : "Database Query Failed",
      serviceName,
    );
  }
};

export const executeDbQuerySP = async <T>(
  queryFn: () => Promise<T>,
  serviceName: string,
): Promise<T> => {
  return executeDbQuery(queryFn, serviceName, true);
};

export const executeDbQueryDirect = async <T>(
  queryFn: () => Promise<T>,
  serviceName: string,
): Promise<T> => {
  return executeDbQuery(queryFn, serviceName, false);
};
