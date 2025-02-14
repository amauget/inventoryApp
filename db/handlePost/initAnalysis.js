const fs = require('fs')

const cleanData = require('./cleanData')
const verifyValues = require('./verifyValues')
const auditFileTypes = require('./auditFileSize')
const auditFileSize = require('./auditFileSize')

async function initAnalysis(files, cleanedData){ //data is every non-file form value
    try{
        const validFiles = auditFileTypes(files) //prevents non image file upload
        const validSize = auditFileSize(files)  //prevents oversized uploads
  
        const dataVerified = await verifyValues(cleanedData) //compares selector inputs to db, verifies year range and int-type.

        if(validFiles === true && validSize === true && dataVerified === true){ //THIS ISN'T ANALYSIS.. REFACTOR INTO ITS OWN FUNCTION
            return true
        }
        else{
            throw new Error(`Correct file type: ${validFiles}, Valid file size: ${validSize}, Data Verified: ${dataVerified}`)
        }
    }
    catch(error){
        console.error(error)
        return false
    }
}
module.exports = initAnalysis