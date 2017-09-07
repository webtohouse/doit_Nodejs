// 주소 문자열과 요청 파라미터 다루기
// 웹 사이트에서 접속하기 위한 사이트 주소 정보는 노드에서 URL객체로 만들 수 있다.

/*
* URL객체
* protocol : http & https & ftp ....
* host : 웹사이트 주소 (www.google.co.kr)
* query : ? 기준으로 뒤에 오는 문자열
*/

// 주소 문자열을 URL 객체로 변환하기

/*
* parse() : 주소 문자열을 파싱하여 URL 객체를 만들어 준다.
* format() : URL 객체를 주소 문자열로 변환합니다.
*/

const url = require('url');

// 주소 문자열을 URL 객체로 만들기
var urlStr = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=steve+jobs';
var curURL = url.parse(urlStr); // parse() 문자열을 객체로 변환.

console.dir(curURL);
console.log('query : ' + curURL.query); // query 요소에 접근.

var curStr = url.format(curURL); // format() 객체를 문자열로 변환.
console.log('url : ' + curStr);

/*
urlStr 객체
{
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'search.naver.com',
  port: null,
  hostname: 'search.naver.com',
  hash: null,
  search: '?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=steve+jobs',
  query: 'where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=steve+jobs', // 요청 파라미터
  pathname: '/search.naver',
  path: '/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=steve+jobs',
  href: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=steve+jobs' }
*/



// 요청 파라미터 확인하기

// 요청 파라미터 구분하기
var querystring = require('querystring');
var params = querystring.parse(curURL.query);
console.log('검색어 :' + params.query);
