# 🚀 itgrow - blog

공부한 내용을 정리하는 <strong>지극히</strong> 개인적인 웹앱 블로그

## 📑 프로젝트 구조

```plaintext
- public/
  - Chivo_Mono/
  - Sigmar/
- src/
  - assets/
    - fonts/
  - components/
    - common/
    - ui/
  - hooks/
  - pages/
    - _app.js
    - _document.js
    - posts/[slug].js
- out/
```

- public/: 정적 파일(예: 폰트, 이미지 등)을 저장하는 폴더입니다. 이 폴더의 파일들은 서버를 통해 직접 제공됩니다.

- src/: 소스 파일들이 위치한 메인 디렉토리입니다.

- assets/: 프로젝트의 다양한 정적 자산(예: 이미지, 스타일시트, 폰트 등)을 포함합니다.

- fonts/: 프로젝트에서 사용하는 폰트 파일과 스타일시트가 포함된 폴더입니다.

- components/: 재사용 가능한 UI 컴포넌트를 모아 놓은 디렉토리입니다.

- common/: 여러 페이지에서 공통으로 사용되는 컴포넌트들이 위치한 폴더입니다. 

- ui/: 사용자 인터페이스 요소와 관련된 컴포넌트들

- hooks/: 커스텀 React Hook을 정의하는 폴더입니다. 

- pages/: Next.js에서 제공하는 페이지 라우팅 기능을 위한 디렉토리입니다. Next.js의 파일 기반 라우팅을 구현하며, 각 파일은 해당 경로에 대한 페이지를 정의합니다.

- _app.js: 공통 레이아웃 및 전역 상태 관리를 설정하는 파일입니다.

- _document.js: HTML 문서의 기본 구조를 설정하는 데 사용되는 파일입니다.

- posts/[slug].js: 동적 라우팅을 통해 각 블로그 게시물의 세부 내용을 보여주는 페이지 파일입니다.

- out/: 정적 빌드 결과물들이 저장되는 디렉토리입니다. Next.js에서 정적 사이트 생성(SSG)이나 서버 측 렌더링(SSR)을 사용하여 생성된 파일들이 위치합니다.


## 🛠️기술 스택

| 기술 스택                        | 버전     | 설명                                                             |
|---------------------------------|----------|----------------------------------------------------------------|
| <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  | `v18.2.0`  | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리              |
| <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">  | `v13.2.4`  | 서버 사이드 렌더링과 정적 사이트 생성을 위한 React 프레임워크          |
| <img src="https://img.shields.io/badge/graphql-E10098?style=for-the-badge&logo=graphql&logoColor=white">  | `v16.6.0`  | 데이터 쿼리를 위한 언어 및 런타임                                    |
| <img src="https://img.shields.io/badge/graphql--request-0D9DF3?style=for-the-badge&logo=graphql&logoColor=white">  | `v5.2.0`  | GraphQL 클라이언트 라이브러리                                        |
| <img src="https://img.shields.io/badge/dompurify-3B5998?style=for-the-badge&logo=purify&logoColor=white">  | `v3.0.6`   | HTML을 정화하기 위한 보안 라이브러리                                  |
| <img src="https://img.shields.io/badge/jsdom-3B5998?style=for-the-badge&logo=html5&logoColor=white">  | `v22.1.0`  | 서버 사이드 렌더링을 위한 DOM 구현 라이브러리                         |
| <img src="https://img.shields.io/badge/react--responsive-61DAFB?style=for-the-badge&logo=react&logoColor=black">  | `v9.0.2`  | 반응형 디자인 구현을 위한 라이브러리                                  |
| <img src="https://img.shields.io/badge/rebound-FF6347?style=for-the-badge&logo=rebound&logoColor=white">  | `v0.1.0`   | 물리 기반 애니메이션 구현을 위한 JavaScript 라이브러리                |
| <img src="https://img.shields.io/badge/node--html--parser-43853D?style=for-the-badge&logo=html5&logoColor=white">  | `v6.1.10` | Node.js에서 HTML을 파싱하는 라이브러리                               |
| <img src="https://img.shields.io/badge/prism.js-FFA500?style=for-the-badge&logo=prism&logoColor=white">  | `v1.29.0` | 코드 구문 강조를 위한 라이브러리
| ![Husky](https://img.shields.io/badge/husky-273347?style=for-the-badge&logo=git&logoColor=white) | `v8.0.3`        | Husky는 Git 훅을 관리하고 커밋 전에 스크립트를 실행할 수 있도록 도와주는 도구입니다. |
| ![Lint-staged](https://img.shields.io/badge/lint--staged-4A4A55?style=for-the-badge&logo=git&logoColor=white) | `v13.5.0`       | Lint-staged는 Git에 커밋하기 전에 수정된 파일에 대해서만 린트와 포맷을 수행하도록 도와주는 도구입니다. |
| <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">  | `v8.36.0`  | 코드 품질 유지 및 오류 탐지를 위한 도구                               |
| <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">  | `v3.3.3`  | 코드 포맷팅 도구                                                    |
| <img src="https://img.shields.io/badge/fontawesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white">  | `v6.4.2` | 아이콘 라이브러리                                                   |                                          |
| <img src="https://img.shields.io/badge/emotion-D36AC2?style=for-the-badge&logo=emotion&logoColor=white"> | `v11.10.6` | CSS-in-JS 라이브러리                                                |
| <img src="https://img.shields.io/badge/material--ui-0081CB?style=for-the-badge&logo=mui&logoColor=white">  | `v5.12.0` | React 컴포넌트를 위한 스타일링 라이브러리                             |
| <img src="https://img.shields.io/badge/rss-FFA500?style=for-the-badge&logo=rss&logoColor=white">  | `v1.2.2`  | RSS 피드 생성 라이브러리  


## 🌟 주요 기능

### ⚡ 동적 라우팅
- **설명**:  
  블로그 게시물의 세부 내용을 보여주기 위해 Next.js의 동적 라우팅을 사용합니다.  
  `pages/posts/[slug].js` 파일은 URL의 슬러그(`slug`)에 따라 블로그 포스트를 동적으로 렌더링합니다.  
  예를 들어, `/posts/my-first-post` 경로로 접속하면 해당 슬러그에 맞는 게시물이 표시됩니다.

- **구현**:  
  - **`getStaticPaths` 함수**: 빌드 시 모든 게시물의 경로를 미리 생성하여 정적 사이트를 생성합니다.
  - **`getStaticProps` 함수**: 각 게시물의 콘텐츠를 미리 가져와 정적 페이지로 렌더링합니다.

---

### 🔗 GraphQL 통합
- **설명**:  
  GraphQL 클라이언트 라이브러리(`graphql-request`)를 사용하여 [Hygraph API](https://hygraph.com)에서 데이터를 쿼리하고, 블로그 게시물의 내용을 동적으로 가져옵니다.

- **구현**:  
  - **GraphQL 쿼리**: `GraphQLClient`를 사용하여 블로그 게시물의 데이터(제목, 태그, 작성자, 콘텐츠 등)를 가져오는 `QUERY`를 실행합니다.
  - **데이터 요청**: `getStaticProps` 함수 내에서 GraphQL 쿼리를 사용하여 서버 사이드에서 데이터를 요청하고, 이를 props로 컴포넌트에 전달하여 렌더링합니다.

---

### 📱 반응형 디자인
- **설명**:  
  다양한 화면 크기에 따라 적응하는 반응형 UI를 제공합니다.  
  `react-responsive` 라이브러리를 사용하여 화면 크기나 장치 유형에 따라 다른 스타일을 적용하고, 최적의 사용자 경험을 제공합니다.

- **구현**:  
  - **`useMediaQuery` 훅**: 브라우저의 가로 폭에 따라 UI를 조정하는 데 사용됩니다. 예를 들어, 모바일 장치에서는 특정 컴포넌트를 숨기거나 레이아웃을 변경합니다.
  - **CSS Modules**: 컴포넌트별로 모듈화된 CSS 파일(`Slug.module.css`)을 사용하여 스타일을 적용하고, 클래스 이름의 충돌을 방지합니다.

---

### 🖥️ 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)
- **설명**:  
  Next.js의 강력한 기능을 활용하여 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 결합하여 성능과 SEO를 최적화합니다.

- **구현**:  
  - **정적 사이트 생성 (SSG)**: `getStaticProps`와 `getStaticPaths`를 사용하여, 빌드 시점에 모든 페이지를 미리 렌더링합니다.
  - **서버 사이드 렌더링 (SSR)**: `getServerSideProps` 함수(필요 시)를 사용하여 각 요청마다 서버에서 데이터를 가져와 페이지를 렌더링할 수 있습니다.
  - **재검증(Revalidation)**: `revalidate` 옵션을 사용하여 지정된 시간마다 페이지를 재생성하여, 실시간 데이터 업데이트를 지원합니다.

---

### 🔒 보안 조치
- **설명**:  
  `DOMPurify` 라이브러리를 사용하여 사용자 입력이나 외부 소스에서 가져온 데이터를 정화하고, 잠재적인 XSS(교차 사이트 스크립팅) 공격으로부터 보호합니다.

- **구현**:  
  - **데이터 정화**: 블로그 콘텐츠나 사용자 입력을 렌더링하기 전에 `DOMPurify.sanitize()`를 사용하여 모든 HTML 태그와 속성을 정화합니다.
  - **서버 측 정화**: 서버에서 데이터를 가져오고 처리할 때도 동일한 정화 절차를 거쳐, 클라이언트와 서버 모두에서 데이터 보안을 강화합니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
