import type { Profile } from '../types/profile'

// 사이트에 표시되는 콘텐츠의 단일 소스. 값 수정은 이 파일에서만 한다.
export const profile: Profile = {
  name: {
    ko: '김진영',
    en: 'Jinyoung Kim',
  },
  // TODO: 실제 연락용 이메일로 교체 (교체 전에는 단위 테스트가 실패한다)
  email: 'TODO@example.com',
  instagram: {
    handle: 'jinyoungkim.official',
    url: 'https://www.instagram.com/jinyoungkim.official',
  },
  // 표시 크기(160px)의 2배 해상도 WebP
  photo: {
    src: '/images/profile.webp',
    alt: '김진영 프로필 사진',
    width: 320,
    height: 320,
  },
}
