import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

// `pnpm generate` 결과물(.output/public)을 정적 서버로 띄워 테스트한다.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      // 로컬에서 번들 Chromium을 쓸 수 없는 환경이면 PW_CHANNEL=chrome 으로 설치된 Chrome 사용
      use: { ...devices['Desktop Chrome'], channel: process.env.PW_CHANNEL },
    },
  ],
  webServer: {
    command: `serve .output/public --listen ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
})
