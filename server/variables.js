require('dotenv').config();

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DB_PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;


module.exports ={
  USER,
  PASSWORD,
  HOST,
  DB_PORT,
  DATABASE
}