const db = require('../db/queries') //database functions

//file handles middleware logic & processes between the router and db query functions
async function sortFilters(filters){
    const result = await db.filterCategory(filters)
    return result
}

module.exports = {sortFilters}