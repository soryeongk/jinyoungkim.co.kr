import type { Profile } from '../types/profile'

// 사이트에 표시되는 콘텐츠의 단일 소스. 값 수정은 이 파일에서만 한다.
export const profile: Profile = {
  name: {
    ko: '김진영',
    en: 'Jinyoung Kim',
  },
  email: 'coltv.turn.j@gmail.com',
  instagram: {
    handle: 'jinyoungkim.official',
    url: 'https://www.instagram.com/jinyoungkim.official',
  },
  // 원본 1080px WebP (표시는 160px, CSS로 축소)
  photo: {
    src: '/images/profile.webp',
    alt: '김진영 프로필 사진',
    width: 1080,
    height: 1080,
  },
}
