const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'test',
    user: 'postgres',
    password: 'postgres',

  }
})
