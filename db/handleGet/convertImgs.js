const fs = require('fs')
const path = require('path')

function convertImgs(data){ /* NOTE: REMOVE FILE DIRECTORY FROM DB... THERE IS ONLY ONE AND IT'S ESTABLISHED. */
    try{
        let convertedData = data.map(item => {
            let convertedImgs = 
            (item.imgpath).map(file =>{
                const imagePath = path.join(process.cwd(), './', 'uploads', file)
                // Read the file and convert it to base64
                try{
                    const base64Image = fs.readFileSync(imagePath).toString('base64')
                
                    // Define the MIME type (for PNG)
                    return `data:image/png;base64,${base64Image}`
                }
                catch(error){
                    return ''
                }
              
            })
            item.imgpath = convertedImgs
       
            return item
        })
        return data
    }
    catch(err){
        console.error(err)
        return data //returns data without base64 img
    }
}

module.exports = convertImgs