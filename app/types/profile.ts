export interface Profile {
  name: { ko: string, en: string }
  email: string
  instagram: { handle: string, url: string }
  photo: { src: string, alt: string, width: number, height: number }
  description?: string
}
