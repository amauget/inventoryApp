const db = require('../db/queries') //database functions
const auditFileTypes = require('../db/handlePost/auditFileTypes')
const auditFileSize = require('../db/handlePost/auditFileSize')
const scrubFile = require('../db/handlePost/scrubFile')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
        const files = req.files

        const validFiles = auditFileTypes(files)
        const validSize = auditFileSize(files)
        if(validFiles === true && validSize === true){
            scrubFile(files)

            try{
                const uploadedFiles = await Promise.all(
                    files.map( async (file) => {
                        await fs.promises.writeFile(file.path, file.buffer)
                        return {
                            filename: file.filename,
                            path: file.path
                        }
                    })
                    
                )
                const data = req.body
                console.log(data)
            }
            catch(error){
                console.error(error)
            }

        }
        else{
            return json({validFileTypes: validFiles, validFileSizes: validSize})
        }
        

}

module.exports = {
    sortFilters,
    postCar, 
    renderUpload
}