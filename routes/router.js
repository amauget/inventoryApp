const { Router } = require('express')
const router = Router()
const path = require('node:path')
const multer = require('multer')

const {sortFilters, postCar} = require('../controllers/controller')
const makes = require('../db/makes')
const { privateDecrypt } = require('node:crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomUUID()+ path.extname(file.originalname)) //scrub filename and path
    }
})

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
    const results = await postCar(req, res)
    res.render('addCar', { results })
})

router.post('/', upload.array('imgUpload', 10), async (req, res) => { /* MAJOR SECURITY CONCERNS */
    console.log(req.files)
    if(!req.files || req.files.length === 0){
        return res.status(400).json({error: 'No files uploaded'})
    }
    const uploadedFiles = req.files.map(file =>({
        fileName: file.fileName,
        path: `uploads/${file.fileName}`
    })
    )
    console.log(uploadedFiles)
    const results = await postCar(req, res)
    
    res.render('addCar', { results })

})

module.exports = router