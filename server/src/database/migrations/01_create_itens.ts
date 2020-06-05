import Knex from 'knex'; //com K maiúsculo porque será usado como tipo

export async function up(knex: Knex){ //realizar as alterações feitas no banco, criar a tabela
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down (knex: Knex) { //voltar atrás se errar algo, deletear a tabela
    return knex.schema.dropTable('itens');
}

// o down faz o oposto do up