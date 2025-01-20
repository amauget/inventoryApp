const pool = require('./pool')

//functions go here..
async function filterQuery({category, year, make, drive, price, model}){
    //add conditions to eventually allow for all datatypes to be filtered.
    const query = `
        SELECT * FROM cars WHERE category = $1
    `
    const result = await pool.query(query, [category])
    return result.rows // ".rows" is the specific info that was logged.
}

module.exports = {filterQuery}