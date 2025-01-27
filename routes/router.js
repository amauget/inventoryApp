const { Router } = require('express')
const router = Router()
//insert controller functions..
const {sortFilters, postCar} = require('../controllers/controller')
const makes = require('../db/makes')


router.get('/', async (req, res) => {
    const results = await sortFilters(req, res)
    
    //const make = req.query.make
    /* Implement first filter, then add others.. */
    res.render('index', { results: results })
})

router.get('/category', async (req, res) => {
    //category comes in..
    const category = req
    //send to middleware to filter..
    //declare variables to populate rendering
    res.status(200).render('category', results)
})

router.get('/addCar', async (req, res) => {
    // console.log(req.query)
    const reqData = req.query
    const carData = {
        year: reqData.year, 
        make: reqData.make, 
        model: reqData.model
    }

    const results = postCar(req, res)
    console.log(results)
    res.render('addCar', { results })
})

router.post('/', async (req, res) => {
    //audit entries
    //process to add new car to database or reject entry
})

module.exports = router