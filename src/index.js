const express = require('express')
const app     = express()
const morgan  = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')


//SETTING
app.set('port', process.env.PORT || 3000)



//database
mongoose.connect('mongodb://localhost/menv-database',{
 
}).then(() => {
     console.log('db is conected')
    })
 .catch(err => console.error(err))




//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


//routes 
app.use('/api/task',require('./routes/tasks.js'))


//file static
app.use(express.static(__dirname+'/public'))


//LISTEN
app.listen(app.get('port'), ()=> {

    console.log('server on port ', app.get('port'))
})