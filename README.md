# 개인프로젝트 게시판 만들기

## 프로젝트 소개

- 게시판

## 라이브러리

개발중은 로고가 아닌 수기로 적겠습니다.

## 설치

```bash
npx create-next-app@latest
npm i clsx zod
npm i @heroicons/react
npm i dompurity
npm i html-react-parser
npm i axios
npm i @tanstack/react-query
npm i @types/axios
```

개발자용 라이브러리를 따로 구분 안 해줬습니다. 어차피 react가 컴파일 돌릴 때, 필요없는 코드들은 빼주기 때문에

### dompurity

https://github.com/remarkablemark/html-react-parser/issues/94
(html-react-parser 보안 이슈)

innerHtml 기능을 쓰기 위해 xss 공격에 보호해주는 라이브러리를 설치했습니다. xss, xssfilter도 있지만 가장 대중적으로 쓰이는 dompurity로 설치했습니다.

files는 읽기전용 속성이므로 변경이 불가능하지만, value값을 바꾸면 files의 값을 리셋하는 것은 가능하다.

이슈 발생, DOMpurify의 sanitize 함수가 없다고 오류를 띄운다. dom이 구축되기 전에 nextjs가 실행되는데, dompurify는 dom이 없으면 오류가 터진다는 모양이다.

https://stackoverflow.com/questions/61296940/how-to-include-dom-manipulating-scripts-into-ssr-next-js-app

https://www.reddit.com/r/nextjs/comments/kty9vi/dompurifysanitize_throws_error_that_sanitize_is/?rdt=45775

브라우저 환경에서만 실행: useEffect 훅은 브라우저에서 렌더링 후에 실행됩니다. 이는 서버 사이드에서 HTML을 생성하는 과정과는 별개로, 클라이언트에서만 실행되는 코드 블록입니다. DOMPurify는 브라우저의 DOM API를 사용하기 때문에, 클라이언트 사이드에서만 사용하는 것이 적절합니다.

수정: html-react-parser는 xss 공격을 보호해주는 라이브러리가 아닌 편의성을 위한 라이브러리다.
js dom은 서버사이드의 라이브러리다. 이 프로젝트에서는 클라이언트 사이드만 이용, 지금은 필요없다.

```js
//https://accounts.google.com/o/oauth2/v2/auth?client_id=&redirect_uri=http://localhost:3000/autoClose&response_type=code id_token&scope=https://www.googleapis.com/auth/userinfo.email&nonce=rklqjlejqwlkejlqwejklqwjekl

// 여기서 리다이렉트로 페이지로 갑니다.

//https://oauth2.googleapis.com/token?client_id=&client_secret=&code=&redirect_uri=http://localhost:3000/autoClose&grant_type=authorization_code&nonce=rklqjlejqwlkejlqwejklqwjekl

// 코드를 받고, 해당 페이지에서 액세스 토큰을 받아야합니다.

//https://www.googleapis.com/oauth2/v3/userinfo?access_token=ya29.a0AcM612ysemG1TrrfMapP9Q3nyLFtNtL9-st1xIZybVOJXSBpDKMgY6b4U-R_ZizVRAu1W1V5amtLfIgtY8hdOirRxPh0MqLPoG8r82CtSOz4jiU0Fr3xplsLmGERgFqjYNGEhDwSefrNtCMglZmRApSe5t725XpoMwaCgYKAdISARASFQHGX2Mi9sK5v-QFLcXO62YwT5e0TA0169&nonce=rklqjlejqwlkejlqwejklqwjekl

// 여기서 sub(식별자), email과 프로필 이메일을 받을 수 있었습니다. 하지만, 필요한건 sub와 email
```
