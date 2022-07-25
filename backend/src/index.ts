import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';

const port = process.env.PORT || 5000;

const pathToBuild = 
  process.env.NODE_ENV === 'dev'
  ? path.join(__dirname, '..', '..', 'frontend', 'dist')
  : path.join(__dirname, '..', '..', '..', 'frontend', 'dist');

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(pathToBuild));

app.get('/ping', (req, res) => {
  res.status(200).send("pong").end();
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server listening on port ${port}`)
});


