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

async function end() {
    await client.end();
}

export {
    connect,
    end
};
