const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')

const app = express()

app.use(bodyParser.json()) //accetping it as JSON data
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = { //standard cors setup
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

const port = 4000 //backend runs on port 4000, front end runs on port 3000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})