import express from 'express';
import path from 'path';
import {readFile} from 'fs/promises';

const logFilePath = path.join('/', 'app', 'logs', 'log');
const PING_URL = 'http://ping-pong-svc:1234/pings';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/logs', async (req, res) => {
    try {
        const log = await readFile(logFilePath, 'utf8');
        const response = await fetch(PING_URL);
        const { count } = await response.json();
        res.type('text/plain').send(`${log}Ping / Pongs: ${count}`);
    } catch (err) {
        console.error('Error reading files:', err);
        res.status(500).send('Error reading files');
    }
});
