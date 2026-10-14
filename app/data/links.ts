import type { ExternalLink } from '../types/link'

// 메인 페이지 하단에 표시되는 외부 링크(영상, 아티클, 인터뷰 등).
// 배열 순서대로 표시된다. 비어 있으면 섹션 자체가 표시되지 않는다.
export const links: ExternalLink[] = [
  {
    title: 'AI 디자이너 김진영의 실전 팁 with Adobe',
    source: 'YouTube',
    url: 'https://youtu.be/D-LRfi32FfY',
    date: '2026-06',
  },
  {
    title: '진영킴! 허성범의 유튜브 출연',
    source: 'YouTube',
    url: 'https://youtu.be/g3HG3aGiGnw',
    date: '2026-05',
  },
  {
    title: 'AI 디자이너 인터뷰, Adobe',
    source: 'YouTube',
    url: 'https://youtu.be/TyGL5hUPKLM',
    date: '2026-03',
  },
  {
    title: '진영킴의 디지털인사이트 인터뷰',
    source: '디지털인사이트',
    url: 'https://ditoday.com/?p=139581',
    date: '2026-01',
  },
]
