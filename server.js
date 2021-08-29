require(`dotenv`).config()
const express = require(`express`);
const mysql = require(`mysql2/promise`);
const cTable = require(`console.table`);

//apparently need to use mysql2 rather than native mysql

console.log(process.env);

console.table([
  {
    name: `foo`,
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
])

const app = express();

const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Database Successfully Connected.`)
})



app.listen(PORT, () => {
  console.log(`App is live at http://localhost:${PORT}`)
})