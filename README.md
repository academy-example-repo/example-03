# FrontEndExample

텍스트 입력으로 **목록 항목을 추가**하고, 각 줄의 **삭제 버튼으로 항목만 제거**할 수 있는 단일 페이지 예제입니다. 프레임워크 없이 HTML, CSS, JavaScript만 사용합니다.

---

## 목차

1. [전체 기능 개요](#1-전체-기능-개요)
2. [프로젝트 구조](#2-프로젝트-구조)
3. [HTML (`html/index.html`) 상세](#3-html-htmlindexhtml-상세)
4. [CSS (`css/index.css`) 상세](#4-css-cssindexcss-상세)
5. [JavaScript (`js/index.js`) 상세](#5-javascript-jsindexjs-상세)
6. [실행 방법](#6-실행-방법)

---

## 1. 전체 기능 개요

| 기능 | 동작 |
|------|------|
| **항목 추가** | 입력창에 문자열을 넣고 **Add** 버튼을 클릭하거나 **Enter** 키를 누르면, 그 내용이 목록 영역(`#container`)에 새 줄로 붙습니다. |
| **입력 검증** | 공백만 있거나 비어 있으면 추가하지 않고, 알림창으로 알린 뒤 입력창에 포커스를 돌립니다. |
| **항목 삭제** | 각 줄 오른쪽의 **X** 버튼을 누르면 해당 줄만 DOM에서 제거됩니다. 다른 줄은 그대로 둡니다. |
| **화면 구성** | 위쪽은 입력·추가 컨트롤, 아래쪽은 목록 박스입니다. 목록이 비어 있어도 박스 최소 높이로 영역이 보입니다. |

데이터는 **브라우저 메모리(DOM)에만** 존재하므로, 페이지를 새로고침하면 목록은 초기화됩니다. 서버 API나 `localStorage` 연동은 포함되어 있지 않습니다.

---

## 2. 프로젝트 구조

```
FrontEndExample/
├── html/
│   └── index.html    # 마크업, CSS/JS 연결
├── css/
│   └── index.css     # 스타일
├── js/
│   └── index.js      # 동작 로직
└── README.md         # 본 문서
```

`index.html`은 `html/` 폴더에 있으므로, 같은 프로젝트 루트의 `css/`, `js/`는 상대 경로 `../css/index.css`, `../js/index.js`로 불러옵니다.

---

## 3. HTML (`html/index.html`) 상세

### 3.1 문서 선언과 `<head>`

- **`<!DOCTYPE html>`**  
  HTML5 문서임을 브라우저에 알립니다.

- **`<html lang="ko">`**  
  문서 기본 언어가 한국어임을 표시합니다. 보조 기기·검색 등에 도움이 됩니다.

- **`<meta charset="UTF-8">`**  
  한글 등 문자가 올바르게 표시되도록 UTF-8을 지정합니다.

- **`<meta name="viewport" ...>`**  
  모바일에서 뷰포트 너비를 기기에 맞추고 초기 확대 비율을 1로 둡니다.

- **`<title>목록 추가/삭제</title>`**  
  브라우저 탭 제목입니다.

- **`<link rel="stylesheet" href="../css/index.css">`**  
  스타일시트를 연결합니다. `html/` 기준 한 단계 위의 `css` 폴더를 가리킵니다.

### 3.2 `<body>` 마크업

1. **`<div class="controls">`**  
   입력과 추가 버튼을 묶는 영역입니다. CSS에서 가로 배치(`flex`)에 사용합니다.

2. **`<input id="txtInput" type="text" placeholder="항목 입력">`**  
   - `id="txtInput"`은 JavaScript에서 `getElementById`로 찾기 위한 고유 식별자입니다.  
   - `placeholder`는 입력 전 안내 문구입니다.

3. **`<button id="btnAdd" type="button">Add</button>`**  
   - `id="btnAdd"`로 스크립트에서 클릭 이벤트를 연결합니다.  
   - `type="button"`은 버튼이 폼을 제출하지 않도록 하는 관례적 설정입니다(현재 폼 태그는 없지만, 나중에 감쌀 때도 안전합니다).

4. **`<br/>`**  
   컨트롤 블록과 목록 영역 사이 줄바꿈·간격용입니다.

5. **`<div id="container"></div>`**  
   **비어 있는 목록의 부모입니다.** JavaScript가 여기에만 `appendChild`로 각 항목(`div.list-item`)을 넣습니다. 정적 HTML에는 항목이 없고, 모두 스크립트로 생성됩니다.

6. **`<script src="../js/index.js"></script>`**  
   `</body>` 직전에 두어, 위의 `#container`, `#txtInput`, `#btnAdd`가 이미 DOM에 존재한 뒤 스크립트가 실행되게 합니다. 이렇게 해야 `getElementById`가 `null`이 되지 않습니다.

---

## 4. CSS (`css/index.css`) 상세

### 4.1 전역·본문

```css
* { box-sizing: border-box; }
```

- 너비 계산에 `padding`과 `border`가 포함되어, 입력창·버튼 정렬이 예측하기 쉽습니다.

```css
body { font-family: ...; margin: 1rem; max-width: 32rem; }
```

- 시스템 글꼴을 쓰고, 페이지 바깥 여백과 최대 너바를 제한해 가독성을 맞춥니다.

### 4.2 목록 컨테이너 `#container`

- `border`, `padding`, `min-height`로 **박스 형태와 최소 높이**를 줍니다.  
- `background`로 본문과 구분합니다.  
- `margin-bottom`으로 아래 요소와 간격을 둡니다(레이아웃에 따라 하단 여백 조정).

### 4.3 동적 항목 `.list-item`

- JavaScript가 만드는 **한 줄 한 줄**에 붙는 클래스입니다.  
- `display: flex` + `justify-content: space-between`으로 **텍스트는 왼쪽**, **삭제 버튼은 오른쪽**에 둡니다.  
- `background`, `margin-bottom`, `padding`, `border-radius`, `border`로 **카드처럼 보이는 줄** 스타일을 줍니다.

### 4.4 `.list-item:last-child`

- 마지막 항목 아래 `margin-bottom`을 없애, 컨테이너 안에서 불필요한 빈 공간을 줄입니다.

### 4.5 텍스트 영역 `.item-text`

- `flex: 1`로 가로로 남는 공간을 채우고, `word-break: break-word`로 긴 단어가 박스 밖으로 넘치지 않게 합니다.

### 4.6 삭제 버튼 `.btn-item-delete`

- 작은 패딩, 테두리, 배경, `cursor: pointer`로 버튼임을 보여 줍니다.

**`.btn-item-delete:hover`**

- 마우스를 올리면 빨간 톤으로 바뀌어 **삭제 동작**임을 직관적으로 알 수 있게 합니다.

### 4.7 입력 영역 `.controls`, `#txtInput`, `#btnAdd`

- `.controls`: `flex`로 입력과 Add 버튼을 한 줄에 배치합니다.  
- `#txtInput`: `flex: 1`로 넓게 쓰고, 테두리·둥근 모서리로 통일감을 줍니다.  
- `#btnAdd`: 파란 강조 버튼 스타일과 `:hover` 시 약간 어두운 배경으로 피드백을 줍니다.

---

## 5. JavaScript (`js/index.js`) 상세

### 5.1 즉시 실행 함수(IIFE) `(function () { ... })();`

- 코드 전체를 감싸 **전역 변수 오염을 막습니다.** `container`, `txtInput`, `btnAdd` 등은 함수 내부 스코프에만 있습니다.

### 5.2 DOM 참조

- 페이지 로드 후 스크립트가 실행될 때 한 번 `getElementById`로 세 요소를 가져옵니다.  
- 이후 모든 로직이 이 참조를 재사용합니다.

### 5.3 `createListItem(text)`

역할: 문자열 `text`를 표시하는 **한 행의 루트 요소** `div.list-item`을 만들고 반환합니다.

| 단계 | 설명 |
|------|------|
| `div` 생성 | `className = "list-item"`으로 CSS 항목 스타일 적용 |
| `span` 생성 | `className = "item-text"`, `textContent = text` — **텍스트는 `textContent`로만 넣어 HTML 삽입(XSS) 위험을 줄임** |
| `button` 생성 | `type="button"`, 클래스 `btn-item-delete`, 표시 `"X"`, `aria-label="Delete"` |
| 삭제 클릭 | `row.remove()`로 **해당 행 전체**를 DOM에서 제거 |
| 자식 연결 | `row`에 `span`, `button` 순으로 `appendChild` 후 `row` 반환 |

호출하는 쪽에서 `container.appendChild(createListItem(value))`를 하면, 과제에서 요구하는 것처럼 **`#container`에 자식으로 붙는 구조**가 됩니다.

### 5.4 `addItem()`

1. `txtInput.value.trim()`으로 앞뒤 공백을 제거한 값을 구합니다.  
2. 빈 문자열이면 `alert("내용을 입력하세요.")`, `txtInput.focus()`, `return` — **빈 항목 추가 방지**  
3. 그렇지 않으면 `container.appendChild(createListItem(value))`  
4. 입력값을 비우고 `txtInput.focus()` — 연속 입력에 편리

### 5.5 이벤트

- **`btnAdd.addEventListener("click", addItem)`** — 버튼으로 추가  
- **`txtInput`의 `keydown`** — `e.key === "Enter"`이면 `preventDefault()` 후 `addItem()` — **Enter로도 추가**

---

## 6. 실행 방법

1. 파일 탐색기에서 `html/index.html`을 더블클릭하거나, 브라우저에서 파일을 연다.  
2. 또는 로컬 정적 서버가 있다면 프로젝트 루트에서 서버를 띄운 뒤 해당 HTML 경로로 접속한다.

**주의:** `file://`로 열 때 일부 브라우저 정책은 제한될 수 있지만, 이 예제는 로컬 파일·상대 경로만 쓰므로 일반적으로 문제 없이 동작합니다.

---

## 요약

- **HTML**: 페이지 골격, ID·클래스로 스크립트·스타일 후크를 제공하고, 목록은 빈 `#container`에서 시작합니다.  
- **CSS**: 컨테이너·항목 줄·삭제 버튼 호버·입력/추가 컨트롤까지 시각과 사용감을 정의합니다.  
- **JavaScript**: 추가·검증·Enter 키·항목별 삭제까지 **전부 DOM API**로 처리합니다.  

이 세 파일이 함께 동작해 **“입력 → 목록 반영 → 개별 삭제”** 흐름을 완성합니다.
