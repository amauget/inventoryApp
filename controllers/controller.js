const db = require('../db/queries') //database functions

async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)

    const result = await db.filterCategory(filters)

    return result

  
}

async function postCar(req, res){
    const suggested = await db.createOptions()

    return suggested
}

module.exports = {
    sortFilters,
    postCar
}