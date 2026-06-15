import path from 'path';
import {mkdir, readFile, writeFile} from 'fs/promises';

const IMG_URL = process.env.IMG_URL || 'https://picsum.photos/1200';
const dataDir = path.join(import.meta.dirname, '..', 'data');
const imagePath = path.join(dataDir, 'image.jpg');
const timestampPath = path.join(dataDir, 'timestamp');
const MAX_AGE = 10 * 60 * 1000; // 10 minutes
const CHECK_INTERVAL = 10000; // 10 seconds

await mkdir(dataDir, {recursive: true});

const downloadImage = async () => {
    const response = await fetch(IMG_URL);
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
    }
    const downloadTime = Date.now();
    console.log(`Image downloaded successfully at ${new Date(downloadTime).toISOString()}`);
    const buffer = await response.arrayBuffer();
    await writeFile(imagePath, Buffer.from(buffer));
    await writeFile(timestampPath, String(downloadTime));
};

const shouldDownloadImage = async () => {
    try {
        const timestampStr = await readFile(timestampPath, 'utf8');
        const lastDownloadTime = Number.parseInt(timestampStr, 10);
        const now = Date.now();
        const imageAge = now - lastDownloadTime;
        const ageMinutes = Math.floor(imageAge / 60000);
        const ageSeconds = Math.floor((imageAge % 60000) / 1000);
        console.log(`Last image download was ${ageMinutes} minutes and ${ageSeconds} seconds ago`);
        return imageAge > MAX_AGE;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No previous image download found, downloading new image');
            return true;
        }
        throw error;
    }
};

export const startImageDownloader = async () => {
  while (true) {
    try {
      if (await shouldDownloadImage()) {
        await downloadImage();
      }
    } catch (err) {
      console.error("Error during image download:", err);
    }
    await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
  }
};
