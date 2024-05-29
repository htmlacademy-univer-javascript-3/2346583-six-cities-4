import { test, expect } from '@playwright/test';

test('Избранное (неавторизован/авторизован)', async ({
    page,
  }) => {
    const isFavorite = async () => {
      const favBtnClassList = await page
        .locator('.bookmark-button')
        .first()
        .evaluate((el) => [...el.classList]);
      return favBtnClassList.includes('place-card__bookmark-button--active');
    };

    const getFavoritesNumber = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');

    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');

    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__inside-list');

    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173/favorites');
    await page.waitForURL('http://localhost:5173/login');


    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'UserTest@mail.com');
    await page.fill('input[name="password"]', '88hit88');

    await Promise.all([
      page.waitForURL('http://localhost:5173'),
      page.click('button[type="submit"]'),
    ]);

    await page.waitForSelector('.cities__card');

    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() ===  201
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    const isFavoriteAfterAction = await isFavorite();
    expect(isFavoriteAfterAction).toBeTruthy();

    await page.waitForSelector("text='1'");

    await Promise.all([
      page.waitForURL('http://localhost:5173/favorites'),
      page.getByRole('link', { name: 'UserTest@mail.com' }).click(),
    ])

    await page.waitForSelector(`.favorites__list`);

    const favCardCity = await page.locator('.locations__item-link').first().textContent();
    expect(favCardCity).toBe('Paris');

    const favoritesCardsNumber = await page.locator('.locations__item-link').count();
    const lastFavCounter = await getFavoritesNumber();
    expect(favoritesCardsNumber).toBe(lastFavCounter);

    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() ===  200
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    await page.waitForSelector("text='Nothing yet saved.'");
  });
