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
```

### dompurity

https://github.com/remarkablemark/html-react-parser/issues/94
(html-react-parser 보안 이슈)

innerHtml 기능을 쓰기 위해 xss 공격에 보호해주는 라이브러리를 설치했습니다. xss, xssfilter, html-react-parser도 있지만 가장 대중적으로 쓰이는 dompurity로 설치했습니다.

files는 읽기전용 속성이므로 변경이 불가능하지만, value값을 바꾸면 files의 값을 리셋하는 것은 가능하다.
