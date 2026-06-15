import express from 'express';
import path from 'path';
import {readFile} from 'fs/promises';

const logFilePath = path.join('/', 'app', 'logs', 'log');
const configFilePath = path.join('/', 'app', 'config', 'information.txt');
const PING_URL = 'http://ping-pong-svc:1234/pings';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/logs', async (req, res) => {
    let log, config;
    try {
        log = await readFile(logFilePath, 'utf8');
        config = await readFile(configFilePath, 'utf8');
    } catch (err) {
        console.error('Error reading files:', err);
        return res.status(500).send('Error reading files');
    }
    const response = await fetch(PING_URL);
    const { count } = await response.json();
    const message = process.env.MESSAGE || 'no message set';
    const text = [
        `file content: ${config.trim()}`,
        `env variable: ${message.trim()}`,
        log.trim(),
        `Ping / Pongs: ${count}`,
    ].join('\n');
    res.type('text/plain').send(text);
});
