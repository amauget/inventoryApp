const express = require('express')
const app = express()
const path = require('node:path')
const multer = require('multer')

const router = require('./routes/router')

const assetPath = path.join(__dirname, 'public') //public assets such as stylesheets

app.use(express.static(assetPath))

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Listening on: ', PORT)
})

