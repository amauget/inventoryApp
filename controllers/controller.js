const db = require('../db/queries') //database functions
const cleanData = require('../db/handlePost/cleanData')
const convertImgs = require('../db/handleGet/convertImgs')
const convertChars = require('../db/handleGet/convertChars')

//handler functions
const initAnalysis = require('../db/handlePost/initAnalysis')
const prepData = require('../db/handlePost/prepData')
const scrubFile = require('../db/handlePost/scrubFile')

const deleteImgFiles = require('../db/handleDeleteFiles/deleteImgFiles')
const uploadFiles = require('../db/handlePost/uploadFiles')

async function sortFilters(filters){
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
            const scrubbedFiles = scrubFile(req.files) 
            const postID = crypto.randomUUID() 

            const uploadedImgs = await uploadFiles(scrubbedFiles, postID) //saves to uploads directory
            if(uploadedImgs){
                const finalData = await prepData(cleanedData, postID) //confirms files save before finalizing data
                
                const imagePostPromises = uploadedImgs.map(image => { //innate error handler. If images undefined, error thrown.
                    db.postImages(image)
                })
                
                await Promise.all(imagePostPromises) //prevents req 201 return before img post completes
    
                await db.postData(finalData)
    
                return res.status(201)
            }

        }
        catch(err){
            console.error(err)
            return res.status(500).json({message: 'The following error has occurred on the server: ' + err})
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

        //Request all associated images for file deletion:
        const fileNames = await db.getImgNames(cleanedID)
        await deleteImgFiles(fileNames)

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