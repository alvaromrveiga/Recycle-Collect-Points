import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';

const routes = express.Router(); //permite que as rotas fiquem em um arquivo separado
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itensController = new ItensController();

//index, show, create/store, update e delete/destroy são os padrões de métodos para controladores
routes.get('/itens', itensController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'), pointsController.create);


export default routes;