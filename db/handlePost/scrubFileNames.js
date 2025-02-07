function scrubFileNames(files){
    const postID = crypto.randomUUID()
    files.forEach(file => {
        const filetype = getFileTypes(file)
        console.log(filetype)
    })
    // console.log(files)
}

function getFileTypes(file){
    let filetype = file.originalname
    for(let i = 0; i < filetype.length - 1; i++){
        if(!filetype[i] === '.'){ //find sorting for file type. 
            filetype -= filetype[i]
            
        }
    }
    return filetype
}

module.exports = scrubFileNames