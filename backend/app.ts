import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { connect as db_connect, insertReport } from './database';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db_connect().then(() => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/send-report', (req, res) => {
        // TODO: Add pictures
        const long = req.body.longitude;
        const lat = req.body.latitude;
        const rating = req.body.auroraRating;
        insertReport(long, lat, rating).then((success: boolean) => {
            res.send(success);
        });
    });

    app.listen(port, () => {
        console.log(
            `Express is listening at http://localhost:${port}`
        );
    });
});
