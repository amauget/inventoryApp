const pool = require('./pool')
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
            result = await pool.query(query);
        }
        else{
            result = await pool.query(query, [...args]) //MAKE SURE SPREADER SYNTAX USED.. OTHERWISE NESTED ARRAY COUNTS AS SINGLE ARG.
        }
        //Add handler for empty results.
        const testQuery = `
        SELECT 
            cars.id, 
            cars.category, 
            cars.year, 
            cars.make, 
            cars.model, 
            cars.trans, 
            cars.price, 
            cars.description, 
            COALESCE(JSON_AGG(imgpath.path) FILTER (WHERE imgpath.path IS NOT NULL), '[]') AS imgpath
        FROM cars
        LEFT JOIN imgpath ON cars.id = imgpath.id
        GROUP BY cars.id;

        `        
        const testOutput = await pool.query(testQuery)
        // console.log(testOutput.rows, 'here') //IT WORKS!!
    return result.rows
    }
    catch(err){
        result = await pool.query('SELECT * FROM cars;')
        return result.rows
    }   
}
async function getImgs(id){
    const query = 'SELECT * FROM imgpath WHERE id = $1'
    const imgs = await pool.query(query, [id])

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
    const postQuery = 'INSERT INTO imgpath(id, path) VALUES($1, $2)'
    const postImg = await pool.query(postQuery, [image.id, image.path])
    return postImg
}
async function postData(data){
    const postQuery = 'INSERT INTO cars(id, category, year, make, trans, price, description, model) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [data.id, data.category, data.year, data.make, data.trans, data.price, data.description, data.model]

    const postedData = await pool.query(postQuery, [...values])
    return postedData
}

module.exports = {
    filterCategory,
    createOptions,
    allModels,
    postImages,
    postData
}