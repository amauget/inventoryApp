const { Pool } = require("pg");

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl:{
    rejectUnauthorized: false,
  }
})
// const pool = new Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });


module.exports  = pool