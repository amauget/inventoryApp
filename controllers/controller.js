const db = require('../db/queries') //database functions

//file handles middleware logic & processes between the router and db query functions
async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)
    const result = await db.filterCategory(filters)
    return result
}

module.exports = {sortFilters}