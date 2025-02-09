const multer = require('multer')
const path = require('path')
const fs = require('fs')

const cleanData = require('./cleanData')
const verifyValues = require('./verifyValues')
const auditFileTypes = require('./auditFileSize')
const auditFileSize = require('./auditFileSize')
const scrubFile = require('./scrubFile')
const prepData = require('./prepData') //REFACTOR.. NO NEED TO COMBINE DATA/FILES

async function initAnalysis(files, data){ //data is every non-file form value
    try{
        const validFiles = auditFileTypes(files) //prevents non image file upload
        const validSize = auditFileSize(files)  //prevents oversized uploads

        const cleanedData = cleanData(data) //removes scripting characters
        const dataVerified = await verifyValues(cleanedData) //compares selector inputs to db, verifies year range and int-type.

        if(validFiles === true && validSize === true && dataVerified === true){ 
            const scrubbedFiles = scrubFile(files) //sanitize file name & path
            
            const uploadedFiles = await Promise.all( //write files to correct directory
                scrubbedFiles.map( async (file) => {
                    await fs.promises.writeFile(file.path, file.buffer)
                    return {
                        filename: file.filename,
                        path: file.path,
                    }
                })
                
            )
            if(uploadedFiles){ //last requirement is met for posting data.

                const postID = crypto.randomUUID() //assign an id number for the post.
                
                cleanedData.id = postID
                uploadedFiles.id = postID //Ensures post id exists in both tables. 

                return [uploadedFiles, cleanedData]
            }
            }
        
        else{
            throw new Error(`Correct file type: ${validFiles}, Valid file size: ${validSize}, Data Verified: ${dataVerified}`)//At least one value will read false.
        }
    }
    catch(error){
        return error
    }

}
module.exports = initAnalysis