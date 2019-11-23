var options = {
  development: {
      client: 'pg',
      connection: 'postgres://localhost/test',
    },
};

var environment = process.env.NODE_ENV || 'development';
var config = options[environment];
module.exports = require('knex')(config);
