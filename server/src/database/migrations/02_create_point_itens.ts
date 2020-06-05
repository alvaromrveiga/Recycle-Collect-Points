import Knex from 'knex'; //com K maiúsculo porque será usado como tipo

export async function up(knex: Knex) { //realizar as alterações feitas no banco, criar a tabela
    return knex.schema.createTable('point_itens', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('itens');
    });
}

export async function down(knex: Knex) { //voltar atrás se errar algo, deletear a tabela
    return knex.schema.dropTable('point_itens');
}

// o down faz o oposto do up