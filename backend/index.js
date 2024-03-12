const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

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

mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB Connected!'))
.catch(err =>console.log(err))

const port = process.env.PORT || 4000 //backend runs on port 4000, front end runs on port 3000
/*process.env.PORT is access the env PORt variable in ENV file, if it cant find variable itll go to 4000 automatically */
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})