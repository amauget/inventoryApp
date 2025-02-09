const categoryList = require('../seedDB/categoryList') 
//json file that lists makes and specifies domestic, jdm, or euro. "Make" is the list key.

/* NO NEED TO COMBINE DATAPOINTS.. THESE WILL BE GOING TO DIFFERENT TABLES. */
function prepData(data, files){
    data.category = categoryList[data.make]
    data.imgpath = createPathArray(files) //creates img src pathways

    return data
}
function createPathArray(files){
    const pathArray = []

    for(let i = 0; i < files.length; i++){
        pathArray.push(files[i].path)
    }
    return pathArray
}

module.exports = prepData

