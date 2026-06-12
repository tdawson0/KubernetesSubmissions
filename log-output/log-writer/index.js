import {v4 as uuidv4} from 'uuid';
import path from 'path';
import {writeFile} from 'fs/promises';

const UUID = uuidv4();

const logFilePath = path.join('/', 'app', 'logs', 'log');

const writeLog = async () => {
    const msg = `${new Date().toISOString()}: ${UUID}`;
    try {
        await writeFile(logFilePath, `${msg}\n`, 'utf8');
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
};

setInterval(writeLog, 5000);