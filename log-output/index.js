import {v4 as uuidv4} from 'uuid';
import express from 'express';

const UUID = uuidv4();

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`${new Date().toISOString()}: ${UUID}`);
});

setInterval(() => {
    console.log(`${new Date().toISOString()}: ${UUID}`);
}, 5000);
