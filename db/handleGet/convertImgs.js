const fs = require('fs')
const path = require('path')

function convertImgs(data){ /* NOTE: REMOVE FILE DIRECTORY FROM DB... THERE IS ONLY ONE AND IT'S ESTABLISHED. */

    // This has currently would require a nested loop.. not great.
    const files = data.imgpath
    console.log(data)
    const base64 = 
        files.map(file =>{
            const imagePath = path.join(process.cwd(), '../../', 'uploads', file)
            // Read the file and convert it to base64
            const base64Image = fs.readFileSync(imagePath).toString('base64')
            
            // Define the MIME type (for PNG)
            return `data:image/png;base64,${base64Image}`
        })

    return data.imgpath = base64
}

// convertImgs(['3009b6bf-a351-4ae0-aed7-4fb38ff4e4ed.png','b5fe07ab-9be7-4127-a6f3-8edd2bfaebaa.jpg'])

module.exports = convertImgs