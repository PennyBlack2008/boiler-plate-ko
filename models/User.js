const mongoose = require('mongoose')
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

const User = mongoose.model('User', userSchema)

module.exports = {User}