const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true, // 문자열의 space 없애줌
		unique: 1
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String, // 특이하게 이미지값이 string 이다.
	token: {
		type: String
	},
	tokenExp: { // 토큰 사용 기간
		type: Number
	}
})

/* bcrpyt 암호화. pre 는 'save' 전에 다음을 진행한다는 의미 */
userSchema.pre('save', function(next){
	var user = this // this 는 위의 userSchema 를 가리킨다.
	if (user.isModified('password')) {
		// 비밀번호를 암호화 시킨다. To hash a password. function 에서 salt 가 생성됨
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, function(err, hash) {
				// Store hash in your password DB.
				if (err) return next(err)
				user.password = hash
				next() // root 의 index.js 에 user.save 로 넘어간다.
			})
		})
	} else { // 비밀번호가 아닌 다른 것을 바꾸었을 때 바로 넘겨준다.
		next()
	}
})
const User = mongoose.model('User', userSchema)

module.exports = { User }