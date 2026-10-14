import { expect, test } from '@playwright/test'
import { profile } from '../../app/data/profile'

test.describe('홈', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('한글·영문 이름이 보인다', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toContainText(profile.name.ko)
    await expect(heading).toContainText(profile.name.en)
  })

  test('프로필 이미지가 로드되고 alt가 있다', async ({ page }) => {
    const img = page.getByRole('img', { name: profile.photo.alt })
    await expect(img).toBeVisible()
    await expect(img).toHaveAttribute('alt', profile.photo.alt)
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  })

  test('이메일 링크가 mailto:로 시작한다', async ({ page }) => {
    const email = page.getByRole('link', { name: 'Email' })
    await expect(email).toHaveAttribute('href', /^mailto:/)
  })

  test('인스타그램 링크가 새 창으로 안전하게 열린다', async ({ page }) => {
    const instagram = page.getByRole('link', { name: /Instagram/ })
    await expect(instagram).toHaveAttribute('href', profile.instagram.url)
    await expect(instagram).toHaveAttribute('target', '_blank')
    await expect(instagram).toHaveAttribute('rel', /noopener/)
  })
})

test('존재하지 않는 경로에서 404 페이지가 보인다', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다' })).toBeVisible()
  await expect(page.getByRole('link', { name: '홈으로 돌아가기' })).toBeVisible()
})

test.describe('모바일', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('가로 스크롤이 생기지 않는다', async ({ page }) => {
    await page.goto('/')
    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalScroll).toBe(false)
  })
})
