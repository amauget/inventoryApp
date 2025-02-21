function scrubFileNames(files){
    files.forEach(file => {
        const newName = crypto.randomUUID()
        const fileType = getFileTypes(file.originalname)
        file.filename = `${newName}${fileType}`
        file.path = `uploads/${file.filename}`
    })
    return files
}

function getFileTypes(filename){
    let filetype = []
    for(let i = filename.length - 1; i >= 0; i--){
        filetype.splice(0,0, filename[i])
        if(filename[i] === '.'){ //starts at end of file. '.' marks start of fileType
            break
        }
    }
    return filetype.toString().replaceAll(',','')
}

module.exports = scrubFileNames