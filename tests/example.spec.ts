import { test, expect } from '@playwright/test';


test('Verify that the user can register in the system.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Don\'t have an account? Sign Up' }).click();
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('123');
  await page.locator('html').click();
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.getByText('Incorrect email')).toBeVisible();
});


test('Verify that the user can log in.', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.locator('div').filter({ hasText: 'Двухярусный2000₽Read More Детский1500₽Read More С макаронами2000₽Read More' }).nth(1)).toBeVisible();
})

test('Verify that the user can view the side menu.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('more').first().click();
  await expect(page.locator('div').filter({ hasText: 'Show followShow allLog out' }).nth(1)).toBeVisible();
});

test('Verify that the user can view detailed information for each cake.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Read More' }).nth(1).click();
  await expect(page.getByText('Back Детский1500₽Read More')).toBeVisible();
});

test('Verify that the user can delete a cake', async ({ page }) => {
  
});


test('Verify that the user can create a new cakes.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('more').nth(1).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('123');
  await page.getByLabel('Price *').click();
  await page.getByLabel('Price *').fill('123');
  await page.getByLabel('Image *').click();
  await page.getByLabel('Image *').fill('123');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add' }).press('Escape');
  await page.getByLabel('Go to page 8').click();
  await expect(page.locator('.MuiGrid-root > .MuiGrid-root')).toBeVisible();
  await page.locator('button:nth-child(4)').click();
});

test('Verify that the user can search', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('Search…').click();
  await page.getByPlaceholder('Search…').fill('Де');
  await expect(page.getByText('Детский1500₽Read More 1')).toBeVisible();
});

test('Verify that the user can see follow', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.MuiCardActions-root > button').first().click();
  await page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.locator('div:nth-child(3) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Show follow' }).click();
  await expect(page.locator('div').filter({ hasText: 'Двухярусный2000₽Read More Детский1500₽Read More С макаронами2000₽Read More' }).nth(1)).toBeVisible();
});

test('Verify that the user can see all', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.MuiCardActions-root > button').first().click();
  await page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.locator('div:nth-child(3) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Show follow' }).click();
  await expect(page.locator('div').filter({ hasText: 'Двухярусный2000₽Read More Детский1500₽Read More С макаронами2000₽Read More' }).nth(1)).toBeVisible();
  await page.getByLabel('more').click();
  await page.getByRole('button', { name: 'Show all' }).click();
  await expect(page.locator('div').filter({ hasText: 'Двухярусный2000₽Read More Детский1500₽Read More С макаронами2000₽Read More' }).nth(1)).toBeVisible();
});

test('Verify that the user can logout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.locator('html')).toBeVisible();
});

test('Verify that the user can add favorite', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Show follow' }).click();
  await expect(page.locator('.MuiGrid-root > .MuiGrid-root')).toBeVisible();
});

test('Verify that the user can delete favorite', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('123@gmail.com');
  await page.getByLabel('Email Address *').press('Tab');
  await page.getByLabel('Password *').fill('123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Show follow' }).click();
  await expect(page.locator('.MuiGrid-root > .MuiGrid-root')).toBeVisible();
  await page.getByLabel('more').click();
  await page.getByRole('button', { name: 'Show all' }).click();
  await page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardActions-root > button').first().click();
  await page.getByLabel('more').first().click();
  await page.getByRole('button', { name: 'Show follow' }).click();
  await expect(page.locator('#root > div')).toBeVisible();
});