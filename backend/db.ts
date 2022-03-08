import { Client } from 'pg';

const client = new Client({
    host: process.env.DB_HOST || 'aubon-db',
    user: process.env.DB_USER || 'aubon',
    password: process.env.DB_PASSWORD || 'aubon',
    database: 'aubon',
    port: Number(process.env.DB_PORT) || 5432
});

async function connect() : Promise<void> {
    await client.connect();
}

async function insertReport(long: Number, lat : Number, rating: Number, ID: Number): Promise<boolean> {
    const query = `
        INSERT INTO reports(longitude, latitude, rating, timestamp)
        VALUES ($1, $2, $3, $4)
    `;
    const values = [long, lat, rating, new Date().toISOString()];
    const result = await client
        .query(query, values)
        .then(() => true)
        .catch((e) => {
            console.error(e.stack);
            return false;
        });
    return result;
}

async function getReports(): Promise<any> {
    const currentDateObj = new Date();
    const numberOfMlSeconds = currentDateObj.getTime();
    const removeMlSeconds = 6 * 60 * 60 * 1000; // 6 hours
    const cutoffTime = new Date(numberOfMlSeconds - removeMlSeconds).toISOString();

    const query = `
    SELECT * FROM reports
    WHERE TIMESTAMP > $1
    `;
    const values = [cutoffTime];
    const result = await client
        .query(query, values)
        .then((res) => res)
        .catch((e) => {
            console.error(e.stack);
            return null;
        });
    return result;
}

async function end() {
    await client.end();
}

export {
    connect,
    end,
    insertReport,
    getReports
};
