import { Client } from 'pg';

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'aubon',
    port: Number(process.env.DB_PORT) || 5432
});

async function connect() : Promise<any> {
    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message); // Hello world!
    await client.end();
}
export default connect;
