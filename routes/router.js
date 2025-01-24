const { Router } = require('express')
const router = Router()
//insert controller functions..
const {sortFilters} = require('../controllers/controller')

router.get('/', async (req, res) => {
    const results = await sortFilters(req, res)
    
    //const make = req.query.make
    /* Implement first filter, then add others.. */
    console.log(results)
    res.render('index', { results: results })
})

router.get('/category', async (req, res) => {
    //category comes in..
    const category = req
    console.log(req.body)

    // console.log(category)
    //send to middleware to filter..
    //declare variables to populate rendering
    res.status(200).render('category', results)
})

module.exports = router