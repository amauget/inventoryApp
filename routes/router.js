const { Router } = require('express')
const router = Router()
const path = require('node:path')
const multer = require('multer')

const {sortFilters, postCar, renderUpload} = require('../controllers/controller')
const makes = require('../db/makes')
const { privateDecrypt } = require('node:crypto')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})


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
    const results = await renderUpload(req, res)

    res.render('addCar', { results })
})

router.post('/addCar', upload.any(), async (req, res) => { /* MAJOR SECURITY CONCERNS */
    if(!req.files || req.files.length === 0){
        return res.status(400).json({error: 'No files uploaded'})
    }
    if(req.files.length > 10){
        return res.status(400).json({error:"Limit of 10 images allowed. Quit changing my javascript!"})
    }

    const fileData = await postCar(req, res, upload)


    const results = await renderUpload(req, res)
    //wipe storage image value to prevent duplicate posts.
    res.render('addCar', { results })

})

module.exports = router