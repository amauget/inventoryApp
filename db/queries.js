const pool = require('./pool')
const buildQuery = require('./buildQuery')

//functions go here..
async function filterCategory(filters){
    //add conditions to eventually allow for all datatypes to be filtered.
    const queryData = buildQuery(filters)
    let query = queryData[0]
    let args = queryData[1]
    try{
        let result = ''
        if(args.length === 0){
            result = await pool.query(query)
        }
        else{
            result = await pool.query(query, [...args]) //MAKE SURE SPREADER SYNTAX USED.. OTHERWISE NESTED ARRAY COUNTS AS SINGLE ARG.
        }
        return result.rows
    }
    catch(err){
        console.error(err)
        result = await pool.query('SELECT * FROM cars;')
        return result.rows
    }   
}

module.exports = {filterCategory}