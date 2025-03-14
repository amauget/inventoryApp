const { Router } = require('express')
const router = Router()
// const multer = require('multer')

// const {sortFilters, postCar, renderUpload, handleLogin, handleDeletePost, handleSingleRequest} = require('../controllers/controller')

// const categoryList = require('../db/seedDB/categoryList.json')
// const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
// const upload = multer({storage: storage})
console.log('test')
router.get('/', (req,res) =>{
    console.log('request received!')
    res.render('404')
})

// router.get('/', async (req, res) => {
//     console.log('TESTING DEPLOYMENT REQUEST')
    // let filters = req.query //object with different filters (ie. category, year, make, etc)
    // if(filters.category === undefined){
    //     filters = {category: '*', make: '*'}
    // }

    // const results = await sortFilters(filters)

    // res.render('index', { results: results, filters: filters, data: JSON.stringify(results), categoryList: JSON.stringify(categoryList) }) // "data" for front end JS

    

// })

// router.get('/addCar', async (req, res) => {
//     try{
//         const results = await renderUpload(req, res)

//         res.render('addCar', { results })
    
//     }
//     catch(error){
//         res.render('404')
//     }
// })

// router.post('/addCar', upload.any(), async (req, res) => { 
//     //PRICE INPUT HAS A BUG
//     if(!req.files || req.files.length === 0){
//         return res.status(400).json({error: 'No files uploaded'})
//     }
//     if(req.files.length > 10){
//         return res.status(400).json({error:"Limit of 10 images allowed. Quit changing my javascript!"})
//     }
//     if(parseInt(req.body.price) > 1000000 ){
//         res.redirect('/addcar')
//     }
    

//     const fileData = await postCar(req, res, upload)

//     //wipe storage image value to prevent duplicate posts.
//     const results = await sortFilters(req, res)
//     res.redirect('/')

// })
// router.get('/login', (req, res) => {
//     res.render('login', {incorrect: false})

// })
// router.get('/loginAttempt', async (req, res) => {
//     const isAdmin = await handleLogin(req, res)

//     if(isAdmin){
//         res.status(200).redirect('deleteAds')
//     }
//     else{
        
//         res.render('login', {incorrect: true})
//     }

// })

// router.get('/deleteAds', async (req, res) => {
//     let filters = req.query //object with different filters (ie. category, year, make, etc)
//     if(filters.category === undefined){
//         filters = {category: '*', make: '*'}
//     }
//     const results = await sortFilters(filters)
    
//     res.render('deleteAds', { results: results, data: JSON.stringify(results), loginFailed: false, categoryList: JSON.stringify(categoryList) })
// })

// router.post('/deleteAds', async (req, res) => {
//     const isAdmin = await handleLogin(req, res)
//     if(isAdmin){
//         const deleted = await handleDeletePost(req, res)
//         let status = 201
//         if(deleted !== true){
//             status = 404
//         }
//         res.redirect('deleteAds')
//     }
//     else{
//         let filters = req.query //object with different filters (ie. category, year, make, etc)
//         if(filters.category === undefined){
//             filters = {category: '*', make: '*'}
//         }
//         const results = await sortFilters(filters)
//         //NEEDED: attach previous ID number to form
//         res.render('deleteAds', { results: results, data: JSON.stringify(results), loginFailed: true, loginFailedID: req.body.postID, categoryList: JSON.stringify(categoryList) })

//     }
// })
// router.post('/viewSingle', async (req, res) => {
//     //images are too large to pass through a form as base64
//     const itemImages = await handleSingleRequest(req.body.id)
//     const item = {
//         id: req.body.id,
//         category: req.body.category,
//         year: req.body.year,
//         make: req.body.make,
//         model: req.body.model,
//         trans: req.body.trans,
//         price: req.body.price,
//         description: req.body.description,
//         imgpath: itemImages
//     }

//     res.render('viewSingle', {item})
// });

module.exports = router
