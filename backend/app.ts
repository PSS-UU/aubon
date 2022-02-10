import 'dotenv/config';
import express from 'express';
import connect from './database';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    connect();
    console.log(
        `Express is listening at http://localhost:${port}`
    );
});
