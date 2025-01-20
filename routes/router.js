const { Router } = require('express')
const router = Router()
//insert controller functions..
const {sortFilters} = require('../controllers/controller')

router.get('/', (req, res) => {
    const filters = req.query //object with different filters (ie. category, year, make, etc)
    sortFilters(filters)
    //const make = req.query.make
    /* Implement first filter, then add others.. */
    res.render('index')
})

router.get('/category', (req, res) => {
    //category comes in..
    const category = req
    console.log(req.body)
   

    // console.log(category)
    //send to middleware to filter..
    //declare variables to populate rendering
    res.status(200).render('category')
})

module.exports = router