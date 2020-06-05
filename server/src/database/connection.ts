import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'), //padroniza o acesso aos caminhos
        //__dirname é uma variável global que retorna o caminho para o diretório 
        //que a variável está sendo executada, ou seja, aqui
    },
    useNullAsDefault: true,
});

export default connection;