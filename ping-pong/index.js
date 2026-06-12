import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

let count = 0;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/pingpong', (req, res) => {
    res.send(`pong ${count++}`);
});
