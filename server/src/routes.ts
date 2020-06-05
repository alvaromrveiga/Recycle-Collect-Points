import express from 'express';

import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';

const routes = express.Router(); //permite que as rotas fiquem em um arquivo separado
const pointsController = new PointsController();
const itensController = new ItensController();

//index, show, create/store, update e delete/destroy são os padrões de métodos para controladores
routes.get('/itens', itensController.index);
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;