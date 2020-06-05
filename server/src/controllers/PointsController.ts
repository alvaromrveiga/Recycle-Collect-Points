import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, itens } = request.query;

        //Separa os itens passados na query, remove os espaços de cada um e garante que são números
        const parsedItens = String(itens)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_itens', 'points.id', '=', 'point_itens.point_id')
            .whereIn('point_itens.item_id', parsedItens)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() //para não repetir o mesmo ponto de coleta duas vezes se coleta 1 e 2 por exemplo
            .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params; //Equivalente a const id = request.params.id;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            //O código 400 significa Bad Request
            return response.status(400).json({ message: "Point not found" });
        }

        const itens = await knex('itens')
            .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
            .where('point_itens.point_id', id)
            .select('itens.title');

        return response.json({ point, itens });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            address,
            city,
            uf,
            itens
        } = request.body;

        //Transaction: se um dos inserts falhar impede que o outro seja executado
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            address,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);
        const point_id = insertedIds[0]; //0 porque é o único ponto inserido

        const pointItens = itens.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })

        await trx('point_itens').insert(pointItens);

        await trx.commit(); //se tudo funciona ele dá o commit de todos ao mesmo tempo

        return response.json({
            id: point_id,
            ...point,

        });
    }
}

export default PointsController;