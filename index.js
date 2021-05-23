const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://penni:asdf1234@boilerplate.zrueg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conneceted...'))
  .catch(err => console.log(err))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res){
	res.send('hello world')
})

app.listen(port, function(){
	console.log('Example app listening at http://localhost:${port}')
})
