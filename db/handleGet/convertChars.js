function convertChars(data){
    return data.map(item =>{
        item.description = htmlRestore(item.description)
        return item
    })

}
function htmlRestore(text) {
    return text
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
}

module.exports = convertChars