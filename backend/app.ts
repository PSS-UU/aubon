import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { connect as db_connect, insertReport, getReports } from './database';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function generateUpdatedBitmap(): void {
    const python = spawn('python3', ['bmp_generator.py'], { cwd: 'python' });
    python.on('close', (code) => { });
}

function moveLatestResultToHistory(): void {
    const rawdata = fs.readFileSync('python/latest.json');
    const data = JSON.parse(rawdata.toString());
    let date = data['Observation Time'];
    date = `${date.substring(0, 13)}.${date.substring(14)}`;
    date = `${date.substring(0, 16)}.${date.substring(17)}`;
    fs.rename('python/latest.png', `python/history/${date}.png`, (err) => {
        if (err) console.log(`ERROR: ${err}`);
    });
}

setInterval(() => {
    moveLatestResultToHistory();
    generateUpdatedBitmap();
}, 1000 * 60 * 60);

db_connect().then(() => {
    // moveLatestResultToHistory(); // Uncomment this for testing purposes
    generateUpdatedBitmap();
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/send-report', (req, res) => {
        // TODO: Add pictures
        const long = req.body.longitude;
        const lat = req.body.latitude;
        const rating = req.body.auroraRating;
        const ID = req.body.userID;

        if (rating < 0 || rating > 5) {
            res.status(400);
            res.send('Rating must be an integer between 0 and 5');
            return;
        }

        if (long < -180 || long > 180 || lat < -90 || lat > 90) {
            res.status(400);
            res.send('Invalid coordinates');
            return;
        }

        insertReport(long, lat, rating, ID).then((success: boolean) => {
            if (!success) {
                res.status(500);
            }
            res.send(success);
        });
    });

    app.get('/get-reports', (req, res) => {
        getReports().then((result: any) => {
            if (result === null) {
                res.status(500);
            }
            res.send(result.rows);
        });
    });

    app.get('/latest.png', (req, res) => {
        res.sendFile('python/latest.png', { root: path.resolve(__dirname, '..') }, (err) => {
            if (err) {
                res.status(404);
                res.send('File not found');
            }
        });
    });

    app.listen(port, () => {
        console.log(
            `Express is listening at http://localhost:${port}`
        );
    });
});
