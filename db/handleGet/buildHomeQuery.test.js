const buildHomeQuery = require('./buildHomeQuery')

// query is a 2 part array.. [PROMPT, ARGS]

it('returns the appropriate query', () =>{
    let query = buildHomeQuery({category: '*', make: '*'}) 
    expect(query[0])
        .toEqual(`SELECT cars.id, cars.category, cars.year, cars.make, cars.model, cars.trans, cars.price, cars.description, COALESCE(JSON_AGG(imgpath.path) FILTER (WHERE imgpath.path IS NOT NULL), '[]') AS imgpath FROM cars LEFT JOIN imgpath ON cars.id = imgpath.id GROUP BY cars.id;`
    )
    expect(query[1]).toEqual([])
})

it('only places "where" after first filter requirement', () =>{
    let query = buildHomeQuery({category: 'euro', make: '*'}) 
    expect(query[0])
    .toEqual(`SELECT cars.id, cars.category, cars.year, cars.make, cars.model, cars.trans, cars.price, cars.description, COALESCE(JSON_AGG(imgpath.path) FILTER (WHERE imgpath.path IS NOT NULL), '[]') AS imgpath FROM cars LEFT JOIN imgpath ON cars.id = imgpath.id WHERE cars.category = $1 GROUP BY cars.id;`)

    expect(query[1]).toEqual(['euro'])

    query = buildHomeQuery({category: 'domestic', make: 'Chevrolet'})
    expect(query[0]).toBe(`SELECT cars.id, cars.category, cars.year, cars.make, cars.model, cars.trans, cars.price, cars.description, COALESCE(JSON_AGG(imgpath.path) FILTER (WHERE imgpath.path IS NOT NULL), '[]') AS imgpath FROM cars LEFT JOIN imgpath ON cars.id = imgpath.id WHERE cars.category = $1 AND cars.make = $2 GROUP BY cars.id;`)
    expect(query[1]).toEqual(['domestic', 'Chevrolet'])
})