process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down...');

    server.close(() => {
        console.log('Server gracefully shut down.');
        process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000); 
});


const express = require('express')
const app = express()
const path = require('node:path')
const multer = require('multer')

console.log('router')
const router = require('./routes/router')

console.log('assetPath')
const assetPath = path.join(__dirname, 'public') //public assets such as stylesheets

console.log('app.use(express.static(assetPath))')

app.use(express.static(assetPath))

console.log('app.use(express.urlencoded({ extended: true }))')
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

console.log('app.use('/', router)')
app.use('/', router)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).render('404')
});
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Listening on: ', PORT)
})

