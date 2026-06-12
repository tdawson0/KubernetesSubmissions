import path from 'path';
import {readFile, writeFile} from 'fs/promises';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const countFilePath = path.join('/app/data', 'count');

const initializeCount = async () => {
    try {
        await writeFile(countFilePath, '0', {flag: 'wx'});
    } catch (error) {
        if (error.code !== 'EEXIST') {
          console.error('Error initializing count file:', error);
        }
    }
};

await initializeCount();

const readCount = async () => {
    const rawCount = await readFile(countFilePath, 'utf8');
    const count = Number.parseInt(rawCount, 10);
    return Number.isNaN(count) ? 0 : count;
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/pingpong', async (req, res) => {
    const count = await readCount();
    await writeFile(countFilePath, String(count + 1));
    res.type('text/plain').send(`pong ${count}`);
});
