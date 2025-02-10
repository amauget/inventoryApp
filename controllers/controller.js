const db = require('../db/queries') //database functions

//handler functions
const initAnalysis = require('../db/handlePost/initAnalysis')
async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)

    const result = await db.filterCategory(filters)

    return result
}
async function renderUpload(){
    const suggested = await db.createOptions()

    return suggested
}

async function postCar(req, res, upload){
    const validItems =  await initAnalysis(req.files, req.body)
    const postedArray = []

    if(validItems){
        try{
            const images = validItems[0], data = validItems[1]
            const imagePostPromises = images.map(image => {
                db.postImages(image)
            })
            const postedArray = await Promise.all(imagePostPromises) //prevents req 201 return before img post completes
            const dataPosted = await db.postData(data)

            return req.status(201)
        }
        catch(err){
            return req.status(500).json({message: 'An error occurred on the server.'})
        }
    }
    else{
        return req.status(403).json({message:'Security risk detected. Access denied.'})
    }
    
}

module.exports = {
    sortFilters,
    postCar, 
    renderUpload
}