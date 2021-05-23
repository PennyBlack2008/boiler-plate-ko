const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyPrser = require('body-parser')
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const config = require('./config/key')

// application/x-www-form-urlencoded 분석해서 가져오는 것
app.use(bodyParser.urlencoded({extended: true}))
// application/json 분석해서 가져오는 것
app.use(bodyPrser.json())

mongoose.connect(config.mongoURI, {
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conneceted...'))
  .catch(err => console.log(err))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res){
	res.send('hello world!!')
})

app.post('/register', (req, res) => {
	// 회원 가입시 필요한 정보들을 client 에서 가져오면
	// 그것들을 데이터 베이스에 넣어준다.
	// req.body 에는 아래 코드처럼 이런 식으로 들어가 있다.
	// {
	// 	id: "hello",
	// 	password: "123"
	// }
	const user = new User(req.body)

	// req.body 의 user 모델이 save 된다.
	user.save((err, userInfo) => {
		if (err) return res.json({ success : false, err })
		return res.status(200).json({
			success : true
		})
	})
})

app.listen(port, function(){
	console.log('Example app listening at http://localhost:${port}')
})
