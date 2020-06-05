import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json()); //enteder o request.body como json
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);