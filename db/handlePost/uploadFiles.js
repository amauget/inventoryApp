const fs = require('fs')


async function uploadFiles(scrubbedFiles, postID){
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

    return uploadedFiles
}

module.exports = uploadFiles