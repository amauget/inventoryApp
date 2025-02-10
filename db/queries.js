const pool = require('./pool')
const buildQuery = require('./buildQuery')

//functions go here..
async function filterCategory(filters){
    //add conditions to eventually allow for all datatypes to be filtered.
    const queryData = buildQuery(filters)
    let query = queryData[0]
    let args = queryData[1]
    try{
        let result = ''
        if(args.length === 0){
            result = await pool.query(query);
        }
        else{
            result = await pool.query(query, [...args]) //MAKE SURE SPREADER SYNTAX USED.. OTHERWISE NESTED ARRAY COUNTS AS SINGLE ARG.
        }
        //Add handler for empty results.
        return result.rows
    }
    catch(err){
        result = await pool.query('SELECT * FROM cars;')
        return result.rows
    }   
}

async function createOptions(){ //only call if a year has been selected.
    const result = await pool.query('SELECT * FROM make_models')
    return result.rows    
}
// example of posting into imgpath db.. 
// insert into imgpath(id, path) values(1,'/img/domestic/chevelle.jpg');

async function allModels(){
    const makeRequest = await pool.query("SELECT model FROM make_models WHERE model = 'Camaro'")
    return makeRequest.rows
}

async function postImages(image){
    console.log(image)
    const postQuery = 'INSERT INTO imgpath(id, path) VALUES($1, $2)'
    const postImg = await pool.query(postQuery, [image.id, image.path])
    return postImg
}
async function postData(data){

}

module.exports = {
    filterCategory,
    createOptions,
    allModels,
    postImages,
    postData
}