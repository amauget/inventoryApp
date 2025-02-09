const verifyValues = require('./verifyValues')

function cleanData(data){
    try{
        for(let i in data){
            data[i] = htmlEscape(data[i]) //prevent cross-site scripting
        }
        return data
    }  
    catch(error){ //What is this catching?
        console.error(error)
        
    }
}

function htmlEscape(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
}

module.exports = cleanData
