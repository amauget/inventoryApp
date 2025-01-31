const db = require('../db/queries') //database functions
const reduceMake = require('../db/dataPrep/reduceMake')
//file handles middleware logic & processes between the router and db query functions
async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)

    const result = await db.filterCategory(filters)

    return result

  
}

async function postCar(req, res){
    //add logic to generate category based on make
    const data = {year: req.query.year, make: req.query.make}

    const suggested = await db.createOptions()
    console.log(suggested)
    const cleanupMake = reduceMake(suggested)
    console.log(cleanupMake)
    /* 
        NOTE FOR NEXT WEEK:
        addCar.ejs triggers get request when year selected changes.
        router sends req data here
        build object a make database request
        cleanupMake removes duplicates and alphabetizes for "make" selector
    */
    return suggested

    //where to handle populating make if year is defined? Otherwise, option should be disabled.

}
module.exports = {
    sortFilters,
    postCar
}