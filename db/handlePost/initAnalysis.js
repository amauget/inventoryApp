const fs = require('fs')

const cleanData = require('./cleanData')
const verifyValues = require('./verifyValues')
const auditFileTypes = require('./auditFileSize')
const auditFileSize = require('./auditFileSize')
const scrubFile = require('./scrubFile')

async function initAnalysis(files, data){ //data is every non-file form value
    try{
        const validFiles = auditFileTypes(files) //prevents non image file upload
        const validSize = auditFileSize(files)  //prevents oversized uploads

        const cleanedData = cleanData(data) //removes scripting characters
        const dataVerified = await verifyValues(cleanedData) //compares selector inputs to db, verifies year range and int-type.

        if(validFiles === true && validSize === true && dataVerified === true){ //THIS ISN'T ANALYSIS.. REFACTOR INTO ITS OWN FUNCTION
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
        
        else{
            throw new Error(`Correct file type: ${validFiles}, Valid file size: ${validSize}, Data Verified: ${dataVerified}`)
        }
    }
    catch(error){
        return error
    }

}
module.exports = initAnalysis