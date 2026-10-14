import { describe, expect, it } from 'vitest'
import { links } from '../../app/data/links'

describe.each(links)('links: $title', (link) => {
  it('제목과 매체명이 비어 있지 않다', () => {
    expect(link.title.trim()).not.toBe('')
    expect(link.source.trim()).not.toBe('')
  })

  it('URL이 https로 시작한다', () => {
    expect(link.url.startsWith('https://')).toBe(true)
  })

  it('날짜가 YYYY-MM 또는 YYYY-MM-DD 형식이다', () => {
    if (link.date) expect(link.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/)
  })
})

describe('links', () => {
  it('URL이 중복되지 않는다', () => {
    const urls = links.map(link => link.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('TODO 값이 남아 있지 않다', () => {
    expect(JSON.stringify(links)).not.toMatch(/TODO/i)
  })
})
