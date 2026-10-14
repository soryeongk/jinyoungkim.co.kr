import { describe, expect, it } from 'vitest'
import { profile } from '../../app/data/profile'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

describe('profile', () => {
  it('이메일이 올바른 형식이다', () => {
    expect(profile.email).toMatch(EMAIL_PATTERN)
  })

  it('TODO 값이 남아 있지 않다', () => {
    expect(JSON.stringify(profile)).not.toMatch(/TODO/i)
  })

  it('인스타그램 URL이 https://www.instagram.com/ 으로 시작한다', () => {
    expect(profile.instagram.url.startsWith('https://www.instagram.com/')).toBe(true)
  })

  it('인스타그램 URL이 handle과 일치한다', () => {
    expect(profile.instagram.url).toBe(`https://www.instagram.com/${profile.instagram.handle}`)
  })

  it('한글/영문 이름이 비어 있지 않다', () => {
    expect(profile.name.ko.trim()).not.toBe('')
    expect(profile.name.en.trim()).not.toBe('')
  })

  it('사진 width/height가 양수다', () => {
    expect(profile.photo.width).toBeGreaterThan(0)
    expect(profile.photo.height).toBeGreaterThan(0)
  })

  it('사진 alt가 비어 있지 않다', () => {
    expect(profile.photo.alt.trim()).not.toBe('')
  })
})
