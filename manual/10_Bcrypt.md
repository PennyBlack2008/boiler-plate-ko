# 10 Bcrypt 로 비밀번호 암호화 하기

[강의요약 다른사람이 정리한 것](https://yerinko.tistory.com/16)

B는 blowfish 의 b 인듯? blowfish 암호에 기반을 둔 암호해쉬함수이다.

## 순서

1. 먼저 Register Route 로 가기

```
app.post('/register', (req, res) => {
	const user = new User(req.body)
	/* 암호화할 타이밍 */
	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err})
		return res.status(200).json({
			success: true
		})
	})
})
```
2. 유저 정보들(Account, Passwrod 등등)을 데이터 베이스에 저장하기 전에 암호화한다.

3. bcrypt 사이트 보면서 진행

models/User.js 참고

- salt Rounds 선언
- salt 생성
- salt 를 이용해서 비밀번호를 암호화해야함
- 여기서 myPlaintextPassword 는 postman 에서 회원가입시에 raw 로 날리는 비밀번호를 의미
	- 여기 코드에서는 user.password 로 해주면 된다.

[bcrypt 링크](https://www.npmjs.com/package/bcrypt)


4. salt 생성

## 헤맸던 것
- 소요시간: 1시간
- 실수유형: 코드 누락
- 파일이름: models/User.js
- 실수 코드:

	여기서 password: 이후를 빼먹었다. 무슨 이유에서 빼먹었는 지 기억이 나지 않는다.
	```
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
	```