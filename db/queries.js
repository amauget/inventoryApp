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
            result = await pool.query(query);
        }
        else{
            result = await pool.query(query, [...args]) //MAKE SURE SPREADER SYNTAX USED.. OTHERWISE NESTED ARRAY COUNTS AS SINGLE ARG.
        }
        //Add handler for empty results.
        return result.rows
    }
    catch(err){
        result = await pool.query('SELECT * FROM cars;')
        return result.rows
    }   
}

async function createOptions({ year, make }){ //only call if a year has been selected.
    console.log(year)

    let args = [year] 
    let prompt = `SELECT * FROM make_models 
        WHERE CAST(SPLIT_PART(yearrange, '-', 1) AS INTEGER) <= $1
        AND CAST(SPLIT_PART(yearrange, '-', 2) AS INTEGER) >= $1
        `
    if(make !== 'make'){
        prompt += 'AND make = $2'
        args.push(make)
    }
    prompt += ';'

    const result = await pool.query(prompt, args)
    console.log(result.rows)
    return result.rows    
}


module.exports = {
    filterCategory,
    createOptions
}