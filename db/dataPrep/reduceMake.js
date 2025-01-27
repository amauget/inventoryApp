function reduceMake(results){
    let makes = []
    let added = {}
    results.forEach(result => {
        if(added[result.make] === undefined){
            makes.push(result.make)
            added[result.make] = true
        }
    })
    return makes.sort()
}

module.exports = reduceMake