const express = require('express')
const morgan = require('morgan')
const  cors = require('cors')

require('./db')

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

//middlelware error - manejar el mismo error para todos por igual
app.use((error,req,res,next) => {
    return(res.json({
        message:'Error!!!'
    }))
})

module.exports = app;