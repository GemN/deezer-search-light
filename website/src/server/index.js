import 'babel-polyfill';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import proxy from 'express-http-proxy';

const APP_PORT = process.env.APP_PORT || 4242;
const app = express();

app.use(cors());
app.use('/api', proxy('https://api.deezer.com'));

// morgan setup
app.use(morgan('dev'));
app.use('/public', express.static(path.resolve(__dirname, '../../build')));
app.use('/img', express.static(path.resolve(__dirname, '../../build/img')));
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../views/index.html'));
});

app.listen(APP_PORT, (err) => {
  console.log(`Server is now running on localhost:${APP_PORT}`);
  if (err) {
    console.warn(err);
  }
});
