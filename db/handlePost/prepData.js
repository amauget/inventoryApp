const scrubFile = require('./scrubFile')
const fs = require('fs')
const categories = require('../seedDB/categoryList.json')

async function prepData(files, cleanedData){
    const scrubbedFiles = scrubFile(files) //sanitize file name & path
    const postID = crypto.randomUUID() //assign an id number for the post.
   
    const uploadedFiles = await Promise.all( //write files to correct directory
        scrubbedFiles.map( async (file) => { //ONLY WRITING 1 FILE
            await fs.promises.writeFile(file.path, file.buffer)
            return {
                id: postID,
                filename: file.filename,
                path: file.path,
            }
        })
    )
    
    if(uploadedFiles){  
        console.log(cleanedData.make)
        console.log(categories)
        const category = categories[cleanedData.make]
        cleanedData.id = postID 
        cleanedData.category = category

        return [uploadedFiles, cleanedData]
    }
}
module.exports = prepData