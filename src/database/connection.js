var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'novoevento.com.br',
        user : 'novoevento_usuario', 
        password : 'senha123..',
        database : 'novoevento_familia_pets'
     }
});
module.exports = knex;