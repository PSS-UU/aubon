import { Client } from 'pg';

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

async function end() {
    await client.end();
}

export {
    connect,
    end,
    insertReport
};
