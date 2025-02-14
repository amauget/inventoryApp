const db = require('../db/queries') //database functions
const cleanData = require('../db/handlePost/cleanData')

//handler functions
const initAnalysis = require('../db/handlePost/initAnalysis')
const prepData = require('../db/handlePost/prepData')
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
    const cleanedData = cleanData(req.body) //removes scripting characters

    const validItems =  await initAnalysis(req.files, cleanedData)
    const postedArray = []

    if(validItems){
        try{
            const preppedItems = await prepData(req.files, cleanedData)
            const images = preppedItems[0], data = preppedItems[1]
            console.log(preppedItems)
            const imagePostPromises = images.map(image => {
                db.postImages(image)
            })
            const postedArray = await Promise.all(imagePostPromises) //prevents req 201 return before img post completes
            const dataPosted = await db.postData(data)

            return res.status(201)
        }
        catch(err){
            console.error(err)
            return res.status(500).json({message: 'An error occurred on the server.'})
        }
    }
    else{
        return res.status(403).json({message:'Security risk detected. Post request denied.'})
    }
}

module.exports = {
    sortFilters,
    postCar, 
    renderUpload
}