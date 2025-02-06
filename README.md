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

### placeholder-shown

### oauth 설정(적용 못함)

구글 개발자 설정 페이지  
https://console.cloud.google.com/apis/credentials/key/9ea68080-109c-4a9b-b0de-d86f82ca084b?hl=ko&project=even-sun-433101-s7

구글 oauth2.0 documentation 페이지  
https://developers.google.com/identity/protocols/oauth2/native-app?hl=ko

페이스북 개발자 설정 페이지  
https://developers.facebook.com/apps/?show_reminder=true

페이스북 oauth documentation 페이지  
https://developers.facebook.com/docs/facebook-login/guides/test
