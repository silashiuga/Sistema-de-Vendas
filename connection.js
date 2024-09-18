const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DATABASE,
});

connection.connect(error => {
  if(error){
    throw new Error(error.message)
  } else {
    console.log('Banco conectado');
  }
})

module.exports = connection;