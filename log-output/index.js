import {v4 as uuidv4} from 'uuid';

const logger = () => {
    const timestamp = new Date().toISOString();
    const message = `${uuidv4()}`;
    console.log(`${timestamp}: ${message}`);
};

setInterval(() => {
    logger();
}, 5000);