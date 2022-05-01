// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mssql',
    connection: {
      user: 'des_moburb',
      password: 'des_moburb',
      server: '10.70.1.41',
      database: 'des_moburb'
    }
  },
};
