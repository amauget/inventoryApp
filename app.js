const express = require('express')
const app = express()
const path = require('node:path')
const multer = require('multer')

const router = require('./routes/router')

const assetPath = path.join(__dirname, 'public') //public assets such as stylesheets

app.use(express.static(assetPath))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //rename file to include date.. avoids naming collisions
    }
})

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Listening on: ', PORT)
})
