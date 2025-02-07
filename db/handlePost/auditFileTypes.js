function auditFileTypes(files){
    files.forEach(file =>{
        if(!file.mimetype.includes('image/')){
            return false
        }
    })
    return true
}

module.exports = auditFileTypes