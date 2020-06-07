import { Request, Response } from 'express';
import knex from '../database/connection';

class ItensController {
    async index(request: Request, response: Response) {
        //await faz esperar carregar tudo, usando await é necessário usar o async na função
        const itens = await knex('itens').select('*');

        //Serialized significa que estou transformando os dados para uma forma mais fácil de acessar por quem recebê-los
        const serializedItens = itens.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `/uploads/${item.image}`,
            }
        });

        return response.json(serializedItens);
    }
}

export default ItensController;