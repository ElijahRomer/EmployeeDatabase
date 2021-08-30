const dbInteraction = require("../dbInteraction/dbInteract");
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}


const connection = new dbInteraction(config)

module.exports = connection;