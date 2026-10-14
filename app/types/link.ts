export interface ExternalLink {
  title: string
  /** 매체/플랫폼 이름. 예: 'YouTube', '월간 디자인' */
  source: string
  url: string
  /** 'YYYY-MM' 또는 'YYYY-MM-DD' */
  date?: string
}
