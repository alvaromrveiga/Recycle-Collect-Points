import Knex from 'knex'; //com K maiúsculo porque será usado como tipo

export async function up(knex: Knex){ //realizar as alterações feitas no banco, criar a tabela
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('address');
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down (knex: Knex) { //voltar atrás se errar algo, deletear a tabela
    return knex.schema.dropTable('points');
}

// o down faz o oposto do up