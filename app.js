const express = require('express')
const app = express()
const path = require('node:path')

const router = require('./routes/router')

const assetPath = path.join(__dirname, 'public') //public assets such as stylesheets

app.use(express.static(assetPath))

app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/', router)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).render('404')
});
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Listening on: ', PORT)
})

