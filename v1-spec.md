# 디자이너 홈페이지 v0.1 개발 명세

## 0. 한 줄 목표

cafe24에서 구입한 도메인이 **빈 페이지가 아니라 "디자이너 소개 + 연락처"를 보여주는 단일 페이지**로 열리게 한다.
이번 작업은 **빠른 첫 배포**가 목표다. 이후 작품 갤러리와 관리자 기능을 붙일 수 있도록 구조만 열어 둔다.

---

## 1. 범위

### 이번에 하는 것 (v0.1)
- 단일 페이지 1개 (`/`)
  - 프로필 사진
  - 이름 (한글 / 영문)
  - Contact: 이메일, 인스타그램 링크
- 404 페이지
- 기본 SEO / OG 메타 태그, 파비콘
- 정적 사이트 생성(SSG) 후 배포, cafe24 도메인 연결
- 최소한의 테스트와 CI

### 이번에 하지 않는 것
- 작품 갤러리, 관리자 페이지, 로그인, DB, 이미지 업로드
- Pinia, Redis, Docker (필요해지는 v0.2 이후에 도입)
- 인스타그램 API 연동 (사진은 파일로 직접 넣는다)
- 다국어 라우팅 (한글/영문은 한 화면에 함께 표기)
- 애니메이션, 인터랙션 효과
- 분석 도구(GA 등)

---

## 2. 콘텐츠

> 아래 값은 모두 `app/data/profile.ts` 한 곳에서 관리한다. 컴포넌트에 직접 하드코딩하지 않는다.

| 항목 | 값 | 비고 |
|---|---|---|
| 이름 (한글) | `김진영` | ⚠️ 본인 확인 필요 |
| 이름 (영문) | `Jinyoung Kim` | ⚠️ 표기 확인 필요 (띄어쓰기, 성/이름 순서) |
| 이메일 | `TODO@example.com` | ⚠️ 받아서 입력 |
| 인스타그램 | `https://www.instagram.com/jinyoungkim.official` | |
| 프로필 사진 | `public/images/profile.webp` | 아래 3-4 참고 |
| 페이지 설명 (meta description) | `TODO` | ⚠️ 한 줄 소개 문구를 받으면 입력. 없으면 `김진영 · Jinyoung Kim` |

화면에 직함이나 소개 문구는 **넣지 않는다.** 받은 내용만 표시한다. 문구가 확정되면 `profile.ts`에 필드를 추가한다.

---

## 3. 기술 스택과 초기 세팅

### 3-1. 스택
- **Nuxt** 최신 안정 버전 + **TypeScript**
  - ⚠️ 작업 시점의 최신 메이저 버전(4.x)을 확인해서 사용한다. 3.x를 쓸 이유가 없으면 최신을 쓴다.
- 패키지 매니저: **pnpm**
- 스타일: 컴포넌트 내 `<style scoped>` + 전역 CSS 변수 파일 1개. CSS 프레임워크는 쓰지 않는다 (페이지가 하나라서 필요 없음).
- 폰트: **Pretendard** (`pretendard` npm 패키지를 self-host하거나 dynamic subset 사용). fallback은 시스템 폰트.
- Lint: `@nuxt/eslint`
- 테스트: **Vitest** (단위), **Playwright** (E2E 스모크)
- CI: **GitHub Actions**
- 렌더링: `nuxt generate`로 **완전 정적 출력**

### 3-2. 디렉터리 구조

```
.
├─ app/
│  ├─ app.vue
│  ├─ pages/
│  │  └─ index.vue
│  ├─ components/
│  │  ├─ ProfileHeader.vue    # 사진 + 이름
│  │  └─ ContactLinks.vue     # 이메일, 인스타그램
│  ├─ data/
│  │  └─ profile.ts           # 콘텐츠 단일 소스 (타입 포함)
│  ├─ types/
│  │  └─ profile.ts           # Profile 타입
│  ├─ assets/css/
│  │  └─ base.css             # 리셋, CSS 변수(색, 간격, 폰트)
│  └─ error.vue               # 404 등 에러 페이지
├─ public/
│  ├─ images/profile.webp
│  ├─ og.jpg
│  ├─ favicon.ico
│  └─ apple-touch-icon.png
├─ tests/
│  ├─ unit/profile.spec.ts
│  └─ e2e/home.spec.ts
├─ .github/workflows/ci.yml
├─ nuxt.config.ts
├─ vitest.config.ts
├─ playwright.config.ts
└─ README.md
```

- 빈 폴더(`server/`, `stores/` 등)는 미리 만들지 않는다. 필요할 때 추가한다.
- `profile.ts`의 데이터 형태는 나중에 API 응답으로 대체될 수 있게 **타입을 먼저 정의**하고, 컴포넌트는 props로 데이터를 받는다. (v0.2에서 데이터 소스를 바꿔도 컴포넌트는 그대로 쓰기 위해서)

```ts
// app/types/profile.ts
export interface Profile {
  name: { ko: string; en: string }
  email: string
  instagram: { handle: string; url: string }
  photo: { src: string; alt: string; width: number; height: number }
  description?: string
}
```

### 3-3. nuxt.config.ts 요구 사항
- `app.head`: `lang="ko"`, `title`, `meta description`, viewport, `theme-color`
- OG / Twitter 메타: `og:title`, `og:description`, `og:image`(절대 URL), `og:url`, `og:type=website`, `twitter:card=summary_large_image`
- 사이트 URL은 환경 변수 `NUXT_PUBLIC_SITE_URL`로 받는다 (기본값: 실제 도메인)
- `nitro.prerender`로 `/` 생성, 404용 `404.html` 생성 확인

### 3-4. 프로필 사진 처리
- 인스타그램 이미지 URL을 **직접 링크하지 않는다** (CDN URL이 만료됨). 파일로 받아서 저장소에 넣는다.
- 인스타그램 프로필 사진은 해상도가 낮을 수 있다(⚠️ 대략 320px 수준으로 알려져 있음). 가능하면 **디자이너에게 원본 파일을 받는다.**
- 표시 크기의 2배 해상도로 리사이즈하고 **WebP**로 변환한다. `width`/`height` 속성을 명시해 레이아웃 이동(CLS)을 막는다.
- 첫 화면 이미지이므로 `loading="eager"`, `fetchpriority="high"`.
- `alt`: `김진영 프로필 사진`
- `@nuxt/image`는 v0.1에서 도입하지 않는다. v0.2에서 도입하고 성능 전후 비교 자료로 쓴다.

---

## 4. 디자인 가이드

**방향:** 평범하고 단정한 명함 같은 한 페이지. 꾸밈보다 여백과 타이포그래피로 정리한다.

- 레이아웃: 화면 중앙 정렬 단일 컬럼. 최대 너비 약 480px. 세로로도 화면 중앙에 오도록 (`min-height: 100dvh`).
- 순서: 사진 → 한글 이름 → 영문 이름 → Contact 링크
- 사진: 정사각형 비율, 표시 크기 약 120–160px. 원형 또는 살짝 둥근 모서리 중 하나 (기본: 원형).
- 이름
  - 한글: 가장 크게 (약 28–32px, weight 600)
  - 영문: 작고 옅게 (약 14–16px, 자간 약간 넓게, 보조 텍스트 색)
- Contact
  - 텍스트 링크 2개를 가로로 나란히 (모바일에서 좁으면 세로). 예: `Email` · `Instagram`
  - 아이콘을 쓴다면 단색 SVG 인라인, 텍스트와 함께. 아이콘만 단독으로 쓰지 않는다.
  - hover 시 밑줄 정도의 최소한의 변화
- 색
  - 라이트: 배경 따뜻한 오프화이트(예: `#FAFAF8`), 본문 거의 검정(예: `#1A1A1A`), 보조 텍스트 회색(예: `#6B6B6B`)
  - `prefers-color-scheme: dark` 대응 (배경 `#111`, 본문 `#EDEDED` 수준)
  - 포인트 색은 쓰지 않는다
- 하단 푸터: `© 2026 Jinyoung Kim` 한 줄, 작고 옅게
- 하지 않을 것: 그라데이션 배경, 그림자 카드, 이모지, 과한 애니메이션, 스톡 아이콘 세트 전체 import

**접근성**
- 텍스트 대비 WCAG AA 이상
- 키보드 포커스 표시(`:focus-visible`) 유지
- 외부 링크(인스타그램)는 `target="_blank" rel="noopener noreferrer"` + 스크린리더용 "새 창" 안내
- 이메일은 `mailto:` 링크

---

## 5. 테스트

### 단위 테스트 (Vitest) — `tests/unit/profile.spec.ts`
- `profile.email`이 이메일 형식인지, `TODO`가 남아 있지 않은지
- `profile.instagram.url`이 `https://www.instagram.com/`으로 시작하는지
- 이름 ko/en이 빈 문자열이 아닌지
- 사진 `width`/`height`가 양수인지

> `TODO` 값이 남아 있으면 테스트가 실패해야 한다. 즉 실제 값이 들어가기 전에는 배포 파이프라인이 통과하지 않는다.

### E2E 스모크 (Playwright) — `tests/e2e/home.spec.ts`
- `/` 접속 시 한글·영문 이름이 보인다
- 프로필 이미지가 로드되고 `alt`가 있다
- 이메일 링크 `href`가 `mailto:`로 시작한다
- 인스타그램 링크가 올바른 URL이고 `target="_blank"`, `rel`에 `noopener`가 포함된다
- 존재하지 않는 경로에서 404 페이지가 보인다
- 모바일 뷰포트(390×844)에서 가로 스크롤이 생기지 않는다
- 브라우저: Chromium만 (v0.1)
- 테스트 대상: `nuxt generate` 결과물을 정적 서버로 띄워서 실행

---

## 6. CI (GitHub Actions)

`.github/workflows/ci.yml` — `pull_request`, `main` push에서 실행

1. checkout, pnpm 세팅, Node LTS, 의존성 캐시
2. `pnpm lint`
3. `pnpm typecheck` (`nuxi typecheck`)
4. `pnpm test:unit`
5. `pnpm generate`
6. Playwright 브라우저 설치(Chromium만) 후 `pnpm test:e2e`

- 실패 시 Playwright 리포트를 artifact로 업로드
- Lighthouse CI는 v0.1에서 **필수 아님**. 대신 배포 후 수동으로 Lighthouse를 한 번 측정해 README에 기록한다(성능 개선 전후 비교의 기준값).

`package.json` scripts:
```
dev, build, generate, preview, lint, typecheck, test:unit, test:e2e
```

---

## 7. 배포와 도메인 연결

### 7-1. 호스팅
- 기본 선택: **Cloudflare** (Pages 또는 Workers 정적 에셋), 무료 플랜
  - 이유: 정적 사이트 무료 호스팅, 상업적 사용 가능, 이후 Nuxt 서버 기능(Nitro)도 같은 곳에서 확장 가능
  - ⚠️ Vercel 무료(Hobby) 플랜은 상업적 사용을 제한하는 것으로 알고 있다. 디자이너의 업무용 사이트이므로 기본 선택에서 제외. 작업 시점의 약관을 확인할 것.
  - ⚠️ Cloudflare의 정적 호스팅 제품 구성(Pages / Workers)은 자주 바뀐다. 작업 시점 공식 문서 기준으로 진행한다.
- GitHub 저장소와 연결해 `main` 머지 시 자동 배포
- 빌드 명령 `pnpm generate`, 출력 디렉터리 `.output/public`
- PR마다 프리뷰 URL 생성

### 7-2. cafe24 도메인 연결
- 도메인은 디자이너 명의의 cafe24 계정에 있다. **DNS 변경은 디자이너 본인이 하거나 계정 접근 권한을 받아서 진행**한다.
- 방법 A (권장): cafe24에서 **네임서버를 Cloudflare로 변경** → Cloudflare에서 DNS 관리
- 방법 B: cafe24 DNS 관리에서 호스팅 대시보드가 안내하는 **A / CNAME 레코드**를 추가
- 레코드 값은 이 문서에 하드코딩하지 않는다. **호스팅 대시보드에 표시된 값을 그대로 사용**한다.
- 루트 도메인과 `www` 둘 다 연결하고, 하나로 리다이렉트한다 (기본: `www` → 루트)
- HTTPS 인증서 자동 발급 확인
- ⚠️ 네임서버 변경은 반영까지 수 시간~최대 48시간 걸릴 수 있다. 일정에 여유를 둔다.
- ⚠️ 이 도메인으로 이메일을 쓰고 있다면(MX 레코드) 네임서버 변경 시 메일 레코드를 반드시 옮긴다. 사용 여부를 먼저 확인한다.

---

## 8. 완료 기준 (Definition of Done)

- [ ] 실제 도메인(루트, www)으로 HTTPS 접속 시 페이지가 열린다
- [ ] 사진, 한글 이름, 영문 이름, 이메일, 인스타그램 링크가 보이고 링크가 동작한다
- [ ] 모바일(390px)과 데스크톱(1440px)에서 레이아웃이 깨지지 않는다
- [ ] 다크 모드에서 읽기에 문제가 없다
- [ ] 없는 경로에서 404 페이지가 나온다
- [ ] 카카오톡·인스타그램 DM 등에 링크를 붙였을 때 OG 미리보기(제목, 이미지)가 나온다
- [ ] CI(lint, typecheck, unit, e2e)가 통과한다
- [ ] Lighthouse(모바일) Performance / Accessibility / Best Practices / SEO 측정값을 README에 기록했다 (목표: 모두 90 이상)
- [ ] README에 로컬 실행, 콘텐츠 수정 위치(`app/data/profile.ts`), 배포 방법, 도메인 설정 내역이 적혀 있다

---

## 9. 다음 단계에서 붙일 것 (참고, 이번 작업 범위 아님)

| 버전 | 내용 | 도입 기술 |
|---|---|---|
| v0.2 | 작품 갤러리(목록/상세), 이미지 최적화, 성능 전후 비교 | `@nuxt/image`, Lighthouse CI |
| v0.3 | 디자이너가 직접 작품을 올리는 관리자 페이지 | Nitro 서버 API, 인증, 이미지 스토리지, DB, Pinia |
| v0.4 | 로컬 개발 환경 통일, 캐시 | Docker Compose, (필요 시) Redis |

---

## 10. 작업 전에 확인할 것

- [ ] 영문 이름 표기, 연락용 이메일 주소
- [ ] 프로필 사진 원본 파일을 받을 수 있는지
- [ ] 한 줄 소개 문구를 넣을지 (없으면 이름만 표시)
- [ ] 호스팅 계정을 누구 명의로 만들지 (디자이너 본인 권장, 개발자는 멤버로 초대)
- [ ] 이 도메인으로 메일을 쓰고 있는지 (MX 레코드 유무)
- [ ] cafe24 DNS 변경을 누가 할지
