const pool = require('./pool')

async function safeQuery(text, args = []){
    try{
      const result = await pool.query(text, args)
      return result
    }
    catch(error){
      console.error('DB error has occured')
      return []
  
    }
}

async function testDB(){
    const result = await pool.query('select * from cars;')
    console.log(result.rows)
}
testDB()

module.exports = safeQuery