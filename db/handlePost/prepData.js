const fs = require('fs')
const categories = require('../seedDB/categoryList.json') 
// categories.json eg.-> categories["Ford"] = "Domestic"

async function prepData(cleanedData, postID){ //adds category, assigns post id
    const category = categories[cleanedData.make]
    cleanedData.id = postID 
    cleanedData.category = category

    return cleanedData
}
module.exports = prepData