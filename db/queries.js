const safeQuery = require('./safeQuery')
const buildHomeQuery = require('./handleGet/buildHomeQuery')


//functions go here..

async function filterCategory(filters){
    //add conditions to eventually allow for all datatypes to be filtered.
    const queryData = buildHomeQuery(filters) 

    let query = queryData[0]
    let args = queryData[1]
    try{
        let result = ''
        if(args.length === 0){
            result = await safeQuery(query);
        }
        else{
            result = await safeQuery(query, [...args]) //MAKE SURE SPREADER SYNTAX USED.. OTHERWISE NESTED ARRAY COUNTS AS SINGLE ARG.
        }
    return result.rows
    }
    catch(err){
        result = await safeQuery('SELECT * FROM cars;')
        return result.rows
    }   
}
async function getImgNames(id){
    const query = 'SELECT imgpath FROM imgpath WHERE id = $1'
    const imgNames = await safeQuery(query, [id])
    return imgNames.rows 
}

async function createOptions(){ //only call if a year has been selected.
    const result = await safeQuery('SELECT * FROM make_models')
    return result.rows    
}
// example of posting into imgpath db.. 
// insert into imgpath(id, path) values(1,'/img/domestic/chevelle.jpg');

async function allModels(){
    const makeRequest = await safeQuery("SELECT model FROM make_models WHERE model = 'Camaro'")
    return makeRequest.rows
}

async function postImages(image){
    const postQuery = 'INSERT INTO imgpath(id, imgpath) VALUES($1, $2)'

    const postImg = await safeQuery(postQuery, [image.id, image.filename])
    return postImg
}
async function postData(data){
    const postQuery = 'INSERT INTO cars(id, category, year, make, trans, price, description, model) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [data.id, data.category, data.year, data.make, data.trans, data.price, data.description, data.model]

    const postedData = await safeQuery(postQuery, [...values])
    return postedData
}

async function checkCredentials(login) {
    const loginQuery = await safeQuery('SELECT * FROM login WHERE username = $1 AND password = $2', [login.username, login.password])
    return loginQuery.rows.length === 0 ? false : true
}

async function removePostData(postID){
    const loginQuery = await safeQuery('DELETE FROM cars WHERE id = $1', [postID])
    return true
}
async function removePostImgs(postID){
    const loginQuery = await safeQuery('DELETE FROM imgpath WHERE id = $1', [postID])
    return true
}
async function singlePostData(postID){
    const postQuery = await safeQuery('SELECT * FROM cars WHERE id = $1', [postID])
    return postQuery.rows
}

async function singlePostImg(postID) {
    const imgQuery = await safeQuery('SELECT ARRAY_AGG(imgpath) AS imgpath FROM imgpath WHERE id = $1',[postID])
    return imgQuery.rows
    //rewrite query to truncate tables. Imgpath should be an array.
}

module.exports = {
    filterCategory,
    createOptions,
    allModels,
    postImages,
    postData,
    checkCredentials,
    removePostData,
    removePostImgs,
    singlePostData,
    singlePostImg,
    getImgNames
}