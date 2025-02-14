const scrubFile = require('./scrubFile')
const fs = require('fs')

async function prepData(files, cleanedData){
    const scrubbedFiles = scrubFile(files) //sanitize file name & path
    const postID = crypto.randomUUID() //assign an id number for the post.
    
    const uploadedFiles = await Promise.all( //write files to correct directory
        scrubbedFiles.map( async (file) => {
            await fs.promises.writeFile(file.path, file.buffer)
            return {
                id: postID,
                filename: file.filename,
                path: file.path,
            }
        })
    )
    if(uploadedFiles){  
        cleanedData.id = postID 

        return [uploadedFiles, cleanedData]
    }
}
module.exports = prepData