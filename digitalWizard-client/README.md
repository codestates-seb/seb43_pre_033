# 🧙🏻‍♀️ digitalWizard-client

## 라이브러리

설치된 라이브러리 입니다.

- [react-redux, redux-toolkit](https://ko.redux.js.org/introduction/installation)
- [react-icons](https://react-icons.github.io/react-icons/)
- [axios](https://axios-http.com/kr/docs/intro)
- [react-router-dom](https://axios-http.com/kr/docs/intro)
- eslint, prettier 플러그인

<br>

## json-server 라이브러리

- json-sever는 글로벌로 설치되었나 확인해주세요 :)
- json-server 실행 스크립트는 BE분들께 데이터 구조 받으면 작성 후 다시 공지하겠습니다. _(port 확인)_
- 유어클래스에 json-server 활용한 과제 링크 걸어 놓겠습니다. 기억이 안나시면 참고하세요
  [유어클래스](https://urclass.codestates.com/content/d6cff4fe-e2f2-4355-ab50-2933a05cb4c9?playlist=2377)

터미널에 아래와 같이 입력하면 설치여부를 알 수 있습니다.

```
# json server 버전 확인
json-server -v
```

만약 아무것도 나오지 않는다면 아래 명령어를 입력해 설치해주세요.

```
# json server 설치
npm i -g json-server
```

<br>

## Notice

### 모든 작업(commit, push 포함)은 `digitalWizard-client` 폴더 안 `본인 브랜치`에 합니다.

- File > Open Folder > seb43_pre_033 > `digitalWizard-client`
- commit, push 전에 터미널에서 본인 브랜치인지 확인해주세요 🥰

### commit

- 상위 README.md 파일의 Commit Message 참고해 다음과 같은 형식으로 작성해주세요.
  - ex) 질문 작성 기능 구현 했을 때
  ```
  git commit -m 'feat : add question'
  ```

### push

- push는 꼭 본인 브랜치에 해주세요. <br>
- 실수로 dev-FE로 하셨다면 팀원분들께 즉시 말해주세요 :)

```
git push origin 본인브랜치
```

### pull

- pull-request 요청 전 본인 브랜치와 dev-FE 브랜치와 동기화 되어 있어야 합니다.
- dev-FE 변동사항이 있다면, push 하기 전 dev-FE 브랜치 작업물들을 pull 해주세요.

```
# 현재 본인 브랜치가 맞는지 확인해주세요! 아니라면 다음과 같이 변경하시면 됩니다.
git checkout 본인브랜치

# dev-FE 브랜치와 싱크가 맞지 않다면 (본인 브랜치에서) pull 해주세요
git pull origin dev-FE
```

### component

- 최상위 파일인 `index.js`를 제외하고 모든 리액트 관련 파일(context, component 등)은 확장자 `jsx`로 통일해주세요.
  - ex) 헤더컴포넌트인경우 ➡️ `Header.jsx`
- 이 외의 로직만 존재하는 파일의 경우 확장자 `js`로 통일합니다.
