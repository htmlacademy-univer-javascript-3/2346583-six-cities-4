import { test, expect } from '@playwright/test';

test('Авторизация валидна/невалидна', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'UserTest@mail.com');
  await page.fill('input[name="password"]', 'invalid');

  await page.click('button[type="submit"]');

  await page.isVisible(
  "text='Validation error: '/six-cities/login''"
  );

  expect(page.url()).toBe('http://localhost:5173/login');
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'UserTest@mail.com');
  await page.fill('input[name="password"]', '88hit88');

  await Promise.all([
  page.waitForURL('http://localhost:5173'),
  page.click('button[type="submit"]'),
  ]);
});
