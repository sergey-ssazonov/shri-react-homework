import { test, expect } from '@playwright/test';

test.describe('Навигация по основным разделам', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('корректно переключается активный пункт меню', async ({ page }) => {
    const analystLink = page.getByRole('link', { name: 'CSV Аналитик' });
    await expect(analystLink).toHaveClass(/active/);

    const generatorLink = page.getByRole('link', { name: 'CSV Генератор' });
    await generatorLink.click();
    await expect(page).toHaveURL(/\/generator$/);
    await expect(generatorLink).toHaveClass(/active/);
    await expect(analystLink).not.toHaveClass(/active/);

    const historyLink = page.getByRole('link', { name: 'История' });
    await historyLink.click();
    await expect(page).toHaveURL(/\/history$/);
    await expect(historyLink).toHaveClass(/active/);
    await expect(generatorLink).not.toHaveClass(/active/);

    await analystLink.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(analystLink).toHaveClass(/active/);
    await expect(historyLink).not.toHaveClass(/active/);
  });
});
