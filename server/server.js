const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


const mongoose = require('mongoose')

const config = require('./config')
const user = require('./routes/user')

mongoose.connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error\n'))
db.on('open', () => {
    console.log("Connected to Database")
})

const app = express()
const port = process.env.PORT || 8000
app.use(bodyparser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`Example server listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1><br><br> N')
})

app.use('/user', cors(), user);

app.post('/products', cors(), (request, response) => {
    console.log(request.method, request.url)
    let body = []
    request.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        // console.log(body)
        console.log(JSON.parse(body))
    })
    
    response.end('Hello post request at /products\n')
})