import express from 'express';
import path from 'path';
import {readFile} from 'fs/promises';

const logFilePath = path.join('/', 'app', 'logs', 'log');

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    readFile(logFilePath, 'utf8')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error('Error reading log file:', err);
            res.status(500).send('Error reading log file');
        });
});
