function auditFileTypes(files){
    let validFile = true
    files.forEach(file =>{
        if(!file.mimetype.includes('image/')){
            validFile = false
        }
    })
    return validFile
}

module.exports = auditFileTypes