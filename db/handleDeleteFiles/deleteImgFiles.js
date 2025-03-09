const fs = require('fs')
const path = require('node:path')


async function deleteImgFiles(fileNames){
        fileNames.map(async (file) =>{
            const filePath = __dirname +'/../../uploads/' + file.imgpath
       
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(__dirname)
                    console.error(`Error removing file: ${err}`)
                    return
                }
                console.log(filePath + ' has been removed')
            })
        })
    
}

//fileNames structure = [{imgpath: 'name1.filetype'}, {imgpath: 'name2.filetype'} ]
module.exports = deleteImgFiles
