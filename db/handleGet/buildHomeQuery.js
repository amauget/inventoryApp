function buildHomeQuery({ category, make }){
    const args = []
    let query = "SELECT cars.id, cars.category, cars.year, cars.make, cars.model, cars.trans, cars.price, cars.description, COALESCE(JSON_AGG(imgpath.path) FILTER (WHERE imgpath.path IS NOT NULL), '[]') AS imgpath FROM cars LEFT JOIN imgpath ON cars.id = imgpath.id"
    if(category !== '*'){
        query += ' WHERE cars.category = $1'
        args.push(category)
    }
    if(make !== '*'){
        if(args.length === 0){
            query+= ' WHERE cars.make = $1'
        }
        else{
            query += ' AND cars.make = $2'
        }
        args.push(make)
    }
    query += ' GROUP BY cars.id;'

    return [query, args]
    
}
buildHomeQuery({category: '*', make: 'Buick'})


module.exports = buildHomeQuery
