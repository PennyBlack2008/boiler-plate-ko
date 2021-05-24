/* nodejs 에서 this 란 무엇인가?
https://www.zerocho.com/category/NodeJS/post/5b67e8607bbbd3001b43fd7b

-----------------------------------------------
node 에서 전역 환경에서의 this 는 module.exports 이다.

- 테스트
console.log(this, module.exports, exports)
console.log(this === module.exports)
console.log(this === exports)
console.log(module.exports === exports)

- 결과
{} {} {}
true
true
true

-----------------------------------------------

-----------------------------------------------
함수 선언문 안의 this 는 global 입니다.

- 테스트
function a() {
	console.log('a', this === exports, this === global)
}
const b = () => {
	console.log('b', this === exports)
}
a()
b()

- 결과
a false true
b true
-----------------------------------------------
*/

function a() {
	console.log('a', this === exports, this === global)
}
const b = () => {
	console.log('b', this === exports)
}
a()
b()