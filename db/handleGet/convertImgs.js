const fs = require('fs')
const path = require('path')

function convertImgs(data){ /* NOTE: REMOVE FILE DIRECTORY FROM DB... THERE IS ONLY ONE AND IT'S ESTABLISHED. */
    try{
        let convertedData = data.map(item => {
            let convertedImgs = 
            (item.imgpath).map(file =>{
                const imagePath = path.join(process.cwd(), './', 'uploads', file)
                // Read the file and convert it to base64
                const base64Image = fs.readFileSync(imagePath).toString('base64')
                
                // Define the MIME type (for PNG)
                return `data:image/png;base64,${base64Image}`
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

// convertImgs([
//     {
//       id: '45a7d9fd-b0e1-4cfa-8aae-ad0f001ba12e',
//       category: 'jdm',
//       year: 1996,
//       make: 'Toyota',
//       model: ' Supra',
//       trans: 'auto',
//       price: '45000.00',
//       description: '',
//       imgpath: [ 'b5fe07ab-9be7-4127-a6f3-8edd2bfaebaa.jpg' ]
//     },
//     {
//       id: '6625ca5f-62a4-4ae7-9b87-c9b739d329f8',
//       category: 'domestic',
//       year: 1966,
//       make: 'Cadillac',
//       model: 'Catera',
//       trans: 'auto',
//       price: '35000.00',
//       description: 'She Fresh!',
//       imgpath: [ '3009b6bf-a351-4ae0-aed7-4fb38ff4e4ed.png' ]
//     }
//   ])
module.exports = convertImgs