import 'dotenv/config';
import express from 'express';
import { connect as db_connect } from './database';

const app = express();
const port = 3000;

db_connect().then(() => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {
        console.log(
            `Express is listening at http://localhost:${port}`
        );
    });
});
