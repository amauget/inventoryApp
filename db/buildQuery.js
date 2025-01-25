function buildQuery(filters){
    let query = 'SELECT * FROM cars WHERE'
    let args = []
    let firstFilter = true
    let columns = ['category', 'year', 'make', 'model', 'drive', 'price', 'description', 'img', 'model']
    let colLength = 9

    let dollar = 1
    //columns are db columns, but also the keys for "filters"
    for(let i in columns){
        if(filters[columns[i]] !== undefined && filters[columns[i]] !== '*'){ 
            if(i < colLength - 1 && firstFilter === false){ //prevents "AND" after "WHERE"
                query += ' AND'
            }
            else{
                firstFilter = false
            }
            query += ` ${columns[i]} = $${dollar}` //dollar increments $1, $2 etc..
            dollar += 1
            args.push(filters[columns[i]])
        }
    }
    console.log(args)
    if(args.length === 1 && args[0] === '*'){
        query = 'SELECT * FROM cars'
    }
    return [query += ';', args]
    
}
module.exports = buildQuery