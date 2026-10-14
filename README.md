# jinyoungkim.co.kr

디자이너 김진영(Jinyoung Kim)의 소개 + 연락처 단일 페이지. Nuxt 4로 정적 생성(SSG)한다.
작업 범위와 결정 사항은 [`v1-spec.md`](./v1-spec.md) 참고.

## 로컬 실행

Node 24 이상, pnpm이 필요하다.

```bash
nvm use            # .nvmrc (Node 24)
pnpm install
pnpm dev           # http://localhost:3000
```

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm generate` | 정적 사이트 생성 → `.output/public` |
| `pnpm preview` | 생성 결과 미리보기 |
| `pnpm lint` | ESLint (`pnpm lint:fix`로 자동 수정) |
| `pnpm typecheck` | 타입 검사 |
| `pnpm test:unit` | Vitest 단위 테스트 |
| `pnpm test:e2e` | Playwright E2E (먼저 `pnpm generate` 필요) |

> macOS 13 등 Playwright 번들 Chromium이 지원되지 않는 환경에서는 설치된 Chrome으로 실행한다:
> `PW_CHANNEL=chrome pnpm test:e2e`

## 콘텐츠 수정

화면에 표시되는 값은 모두 **`app/data/profile.ts`** 한 곳에서 관리한다. 컴포넌트에는 하드코딩하지 않는다.

- 이름, 이메일, 인스타그램, 프로필 사진 정보, 페이지 설명(`description`, 선택)
- `TODO`가 남아 있으면 단위 테스트가 실패하므로 CI가 통과하지 않는다.

### 이미지 교체

| 파일 | 규격 | 현재 상태 |
|---|---|---|
| `public/images/profile.webp` | 320×320 WebP (표시 160px의 2배) | ⚠️ 임시 회색 이미지 |
| `public/og.jpg` | 1200×630 JPEG | ⚠️ 임시 단색 이미지 |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | 32px / 180px | 임시 `JK` 모노그램 |

사진 크기를 바꾸면 `profile.ts`의 `photo.width`/`height`도 함께 바꾼다.

```bash
# 예: 원본 사진을 320px WebP로 변환 (macOS)
sips -Z 320 original.jpg --out /tmp/profile.jpg
cwebp -q 82 /tmp/profile.jpg -o public/images/profile.webp
```

## 환경 변수

| 이름 | 기본값 | 설명 |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | `https://jinyoungkim.co.kr` | OG 이미지·canonical의 절대 URL 기준. 프리뷰 배포에서는 프리뷰 URL로 설정 |

## 배포

> 아직 진행 전. 진행 후 실제 설정값으로 갱신한다.

- 호스팅: Cloudflare (Pages 또는 Workers 정적 에셋), 무료 플랜
- GitHub 저장소 연결, `main` 머지 시 자동 배포 / PR마다 프리뷰 URL
- 빌드 명령: `pnpm generate`
- 출력 디렉터리: `.output/public`
- Node 버전: 24 (`.nvmrc`)

## 도메인 설정 내역

> 아직 진행 전. 진행 후 기록한다.

- [ ] 방법: 네임서버 변경(Cloudflare) / A·CNAME 레코드 중 선택한 것
- [ ] 루트 + `www` 연결, `www` → 루트 리다이렉트
- [ ] HTTPS 인증서 발급 확인
- [ ] MX 레코드(메일) 사용 여부 및 이전 내역

## Lighthouse 기준값 (모바일)

> 배포 후 실제 도메인에서 측정해 기록한다. v0.2 성능 개선 전후 비교의 기준값.

| 측정일 | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| - | - | - | - | - |
