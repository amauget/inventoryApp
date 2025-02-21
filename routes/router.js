const { Router } = require('express')
const router = Router()
const path = require('node:path')
const multer = require('multer')

const {sortFilters, postCar, renderUpload} = require('../controllers/controller')
const makes = require('../db/seedDB/allMakes')
const { privateDecrypt } = require('node:crypto')

const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})


router.get('/', async (req, res) => {
    const results = await sortFilters(req, res)
    console.log(results[0].id)
    const make = req.query.make

    res.render('index', { results: results, data: JSON.stringify(results) }) // "data" for front end JS
})

router.get('/category', async (req, res) => {
    //category comes in..
    const category = req
    //send to middleware to filter..
    //declare variables to populate rendering
    res.status(200).render('category', results)
})

router.get('/addCar', async (req, res) => {
    const results = await renderUpload(req, res)

    res.render('addCar', { results })
})

router.post('/addCar', upload.any(), async (req, res) => { 
    if(!req.files || req.files.length === 0){
        return res.status(400).json({error: 'No files uploaded'})
    }
    if(req.files.length > 10){
        return res.status(400).json({error:"Limit of 10 images allowed. Quit changing my javascript!"})
    }
    

    const fileData = await postCar(req, res, upload)


    // const results = await renderUpload(req, res)
    //wipe storage image value to prevent duplicate posts.
    const results = await sortFilters(req, res)
    res.redirect('/')

})

module.exports = router