const Pool = require('pg').Pool;
const {
  USER,
  PASSWORD,
  HOST,
  DB_PORT,
  DATABASE
} = require('./variables')

const pool = new Pool({
  user:USER,
  password:PASSWORD,
  host:HOST,
  port:DB_PORT,
  database:DATABASE
});

module.exports = pool;