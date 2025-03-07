const db = require('../db/queries') //database functions
const cleanData = require('../db/handlePost/cleanData')
const convertImgs = require('../db/handleGet/convertImgs')
const convertChars = require('../db/handleGet/convertChars')

//handler functions
const initAnalysis = require('../db/handlePost/initAnalysis')
const prepData = require('../db/handlePost/prepData')

async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)
    if(filters.category === undefined){
        filters = {category: '*', make: '*'}
    }

    const response = await db.filterCategory(filters)
    //convert img files to binary stream
    const data = convertImgs(response)
    
    const finalData = convertChars(data)
     

    return finalData
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
            const preppedItems = await prepData(req.files, cleanedData) //confirms files save before finalizing data
            const images = preppedItems[0], data = preppedItems[1]

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

async function handleLogin(req, res){
    const login = cleanData(req.body)
    const isAdmin = await db.checkCredentials(login)
    return isAdmin
}

async function handleDeletePost(req, res){
    try{
        const cleanedID = cleanData(req.body.postID)
        await db.removePostData(cleanedID)
        await db.removePostImgs(cleanedID)
    
        return true
    }
    catch(err){
        return false
    }
}

async function handleSingleRequest(ID){
    const cleanedID = cleanData(ID)

    const imgData = await db.singlePostImg(cleanedID)
    const imgs = convertImgs(imgData)[0].imgpath
    return imgs
}

module.exports = {
    sortFilters,
    postCar, 
    renderUpload,
    handleLogin,
    handleDeletePost,
    handleSingleRequest
}