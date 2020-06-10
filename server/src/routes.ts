import express from 'express';
import { celebrate, Joi } from 'celebrate';

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

routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            itens: Joi.string().required(),
        })
    }, {
        abortEarly: false, //desse modo mostra todos os campos que não foram preenchidos
    }),
    pointsController.create);


export default routes;