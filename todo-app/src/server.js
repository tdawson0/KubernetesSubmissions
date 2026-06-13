import express from 'express';
import path from 'path';

const publicDir = path.join(import.meta.dirname, '..', 'public');
const dataDir = path.join(import.meta.dirname, '..', 'data');

export const startServer = () => {
	const app = express();
	const PORT = process.env.PORT || 3000;

	app.use(express.static(publicDir));
 
  app.get('/image.jpg', (req, res) => {
    res.sendFile(path.join(dataDir, 'image.jpg'));
  });

  app.get('/timestamp', (req, res) => {
    res.type('text/plain').sendFile(path.join(dataDir, 'timestamp'));
  });

	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
};
