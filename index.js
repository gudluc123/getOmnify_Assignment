const express = require('express')
const mongoose = require('mongoose')

const bodyparser= require('body-parser')
const route= require('./src/model/routes/route')

const app = express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

app.get('/test-me', function (req, res){

    res.send("hello world")
})

mongoose.connect("mongodb+srv://rahul:a8nUBuLVvqzszy09@cluster0.6luou.mongodb.net/eventDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route)

app.listen(process.env.port || 3000, function (){

console.log("Express app running on port " + (process.env.port ||3000 ))

})