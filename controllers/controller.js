const db = require('../db/queries') //database functions
const auditFileTypes = require('../db/handlePost/auditFileTypes')
const scrubFileNames = require('../db/handlePost/scrubFileNames')

async function sortFilters(req, res){
    let filters = req.query //object with different filters (ie. category, year, make, etc)

    const result = await db.filterCategory(filters)

    return result

  
}

async function renderUpload(){
    const suggested = await db.createOptions()

    return suggested
}

async function postCar(req, res){
    const body = req.body
     const bodyelements = {  
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
        const postComponent = {
            category: 'TBD',
            year: body.year,
            make: body.make,
            trans: body.trans,
            description: body.description,
            imgpath: 'TBD',
            model: body.model
    
        }
        const files = req.files

        const validFiles = auditFileTypes(files)
        if(validFiles === true){
            scrubFileNames(files)
            const uploadedFiles = req.files.map(file =>({
                fileName: file.filename,
                path: `uploads/${file.filename}`
            })
            )
        }
        

}

module.exports = {
    sortFilters,
    postCar, 
    renderUpload
}