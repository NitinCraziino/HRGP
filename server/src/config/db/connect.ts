import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '..';

export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
});

const connectDb = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        console.log('✅ Database pool connected and pinged successfully');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to the database:', err);
        process.exit(1); // Fail fast
    }
};

export default connectDb;
