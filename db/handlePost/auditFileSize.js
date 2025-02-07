function auditFileSize(files){
    let validSize = true
    files.forEach(file =>{
        if(file.size > 6 * (10 ** 6)){ //6mb max
            validSize = false
        }
    }
    )
    return validSize
}
module.exports = auditFileSize