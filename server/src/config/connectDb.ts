import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '.';

const connectDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            multipleStatements: true,
            connectionLimit: 60,
            waitForConnections: true,
            queueLimit: 0,
            debug: false,
        });

        console.log('MySQL Database connected successfully');
        return connection;
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit(1);
    }
};

export default connectDb;