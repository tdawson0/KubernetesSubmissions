import express from 'express';
import path from 'path';

const publicDir = path.join(import.meta.dirname, '..', 'public');
const dataDir = path.join(import.meta.dirname, '..', 'data');
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

export const startServer = async () => {
	const app = express();
	const PORT = process.env.PORT || 3000;

	app.use(express.static(publicDir));

  if (process.env.NODE_ENV === 'development') {
    const { createProxyMiddleware } = await import('http-proxy-middleware');
    console.log(`Proxying API requests to backend at ${backendUrl}`);
    app.use('/todos', createProxyMiddleware({ target: backendUrl + '/todos', changeOrigin: true }));
  }
 
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
