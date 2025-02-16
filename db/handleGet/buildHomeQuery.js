function buildHomeQuery(filters){
    let query = 'SELECT * FROM cars WHERE'
    let args = []
    let firstFilter = true
    let columns = ['id','category', 'year', 'make', 'trans', 'price', 'description', 'model']
    //include id to associate with get request for associated imgs
    let colLength = 7

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
    
    if(args.length === 0 /* || args[0] === '*' */){
        query = 'SELECT * FROM cars'
    }

    return [query += ';', args]
    
}



module.exports = buildHomeQuery