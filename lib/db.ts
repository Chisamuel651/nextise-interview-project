import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const query = (text: string, params?: Array<any>): Promise<any> => { return pool.query(text, params)};