const { Router } = require('express')
const router = Router()
const path = require('node:path')
const multer = require('multer')

const {sortFilters, postCar, renderUpload, handleLogin, handleDeletePost, handleSingleRequest} = require('../controllers/controller')
const makes = require('../db/seedDB/allMakes')
const { privateDecrypt } = require('node:crypto')

const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})



router.get('/', async (req, res) => {
    const results = await sortFilters(req, res)
  
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
    //PRICE INPUT HAS A BUG
    if(!req.files || req.files.length === 0){
        return res.status(400).json({error: 'No files uploaded'})
    }
    if(req.files.length > 10){
        return res.status(400).json({error:"Limit of 10 images allowed. Quit changing my javascript!"})
    }
    if(parseInt(req.body.price) > 1000000 ){
        res.redirect('/addcar')
    }
    

    const fileData = await postCar(req, res, upload)


    // const results = await renderUpload(req, res)
    //wipe storage image value to prevent duplicate posts.
    const results = await sortFilters(req, res)
    res.redirect('/')

})
router.get('/login', (req, res) => {
    res.render('login', {incorrect: false})

})
router.get('/loginAttempt', async (req, res) => {
    const isAdmin = await handleLogin(req, res)

    if(isAdmin){
        res.status(200).redirect('deleteAds')
    }
    else{
        
        res.render('login', {incorrect: true})
    }

})

router.get('/deleteAds', async (req, res) => {
    const results = await sortFilters(req, res)
    console.log('redirect')

    
    res.render('deleteAds', { results: results, data: JSON.stringify(results), loginFailed: false })
})

router.post('/deleteAds', async (req, res) => {
    const isAdmin = await handleLogin(req, res)
    if(isAdmin){
        const deleted = await handleDeletePost(req, res)
        let status = 201
        if(deleted !== true){
            status = 404
        }
        res.redirect('deleteAds')
    }
    else{
        const results = await sortFilters(req, res)
        //NEEDED: attach previous ID number to form
        res.render('deleteAds', { results: results, data: JSON.stringify(results), loginFailed: true, loginFailedID: req.body.postID })

    }
})
router.post('/viewSingle', async (req, res) => {
    const ID = req.body.data

    const result = await handleSingleRequest(ID)
    const data = result[0]
    res.render('viewSingle', {})
})
module.exports = router