const pool = require('../pool')

async function verifyValues(data){
    try{
        const year = parseInt(data.year) // throws error if non-numerical values exist.
        const make = await GET('make', data.make) //makes get request of scrubbed inputs. Only allows posting if they're pre-existing.
        const model = await GET('model', data.model)
        const trans = data.trans

        //description has no comparative properties. Just scrub and post.. Maybe add profanity checker later.
        if((year >= 1965 && year <= 2000) && make.length > 0 && model.length > 0 && (trans === 'manual' || trans === 'auto' || trans === undefined)){
            return true //valid input
        }
        else{
            throw new Error()
        }
    }
    catch(err){
        return false
    }
}

async function GET(column, value){
    const getRequest = `SELECT ${column} FROM make_models WHERE ${column} = $1`
    
    const result = await pool.query(getRequest, [value])

    return result.rows

}
module.exports = verifyValues