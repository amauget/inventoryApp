const db = require('../db/queries') //database functions

async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)

    const result = await db.filterCategory(filters)

    return result

  
}

async function postCar(req, res){
     const body = {  
            year: '1965',
            make: 'Cadillac',
            model: 'model',
            trans: 'manual',
            description: 'DFHB'
        }
        const imgs = [
            {
                fieldname: 'imgUpload',
                originalname: '3000gt.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: 'public/uploads',
                filename: '1738525210247.png',
                path: 'public/uploads/1738525210247.png',
                size: 173640
          }
        ]
    const suggested = await db.createOptions()

    return suggested
}

module.exports = {
    sortFilters,
    postCar
}