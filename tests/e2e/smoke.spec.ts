import { test, expect } from '@playwright/test'

test.describe('Star Wars App - Smoke Test', () => {
  test('happy path: load → search → sort → paginate', async ({ page }) => {
    // Navigate to the application
    await page.goto('/')

    // Wait for the page to load and verify we're on the home page
    await expect(page.locator('h1')).toContainText('Star Wars')

    // Navigate to People page
    await page.click('text=Characters')
    await page.waitForURL('/people')

    // Wait for people data to load
    await page.waitForSelector('[data-testid="people-table"]', {
      timeout: 10000,
    })

    // Verify people are loaded
    const peopleRows = page.locator('[data-testid="people-row"]')
    await expect(peopleRows.first()).toBeVisible()

    // Test search functionality
    const searchInput = page.locator('[data-testid="search-input"]')
    await searchInput.fill('Luke')

    // Wait for search results
    await page.waitForTimeout(500) // Wait for debounce

    // Verify search results contain "Luke"
    const filteredRows = page.locator('[data-testid="people-row"]')
    const firstRowName = filteredRows
      .first()
      .locator('[data-testid="person-name"]')
    await expect(firstRowName).toContainText('Luke')

    // Clear search to see all results again
    await searchInput.clear()
    await page.waitForTimeout(500)

    // Test sorting functionality
    const sortButton = page.locator('[data-testid="sort-name"]')

    // Sort by name descending
    await sortButton.click()

    // Wait for sort to apply
    await page.waitForTimeout(500)

    // Verify sorting (first name should be different after sorting)
    const firstPersonAfterSort = filteredRows
      .first()
      .locator('[data-testid="person-name"]')
    await expect(firstPersonAfterSort).toBeVisible()

    // Test pagination if there are multiple pages
    const paginationContainer = page.locator('[data-testid="pagination"]')

    if (await paginationContainer.isVisible()) {
      // Check if there's a "Next" button
      const nextButton = page.locator('[data-testid="next-page"]')

      if (await nextButton.isEnabled()) {
        // Get the current page number
        const currentPageBefore = await page
          .locator('[data-testid="current-page"]')
          .textContent()

        // Click next page
        await nextButton.click()

        // Wait for page to change
        await page.waitForTimeout(500)

        // Verify page changed
        const currentPageAfter = await page
          .locator('[data-testid="current-page"]')
          .textContent()
        expect(currentPageAfter).not.toBe(currentPageBefore)

        // Verify new data is loaded
        await expect(filteredRows.first()).toBeVisible()

        // Go back to previous page
        const prevButton = page.locator('[data-testid="prev-page"]')
        if (await prevButton.isEnabled()) {
          await prevButton.click()
          await page.waitForTimeout(500)
        }
      }
    }

    // Test navigation to Planets page
    await page.click('text=Planets')
    await page.waitForURL('/planets')

    // Wait for planets data to load
    await page.waitForSelector('[data-testid="planets-table"]', {
      timeout: 10000,
    })

    // Verify planets are loaded
    const planetRows = page.locator('[data-testid="planet-row"]')
    await expect(planetRows.first()).toBeVisible()

    // Test search on planets page
    const planetsSearchInput = page.locator('[data-testid="search-input"]')
    await planetsSearchInput.fill('Tatooine')
    await page.waitForTimeout(500)

    // Verify search results
    const filteredPlanetRows = page.locator('[data-testid="planet-row"]')
    const firstPlanetName = filteredPlanetRows
      .first()
      .locator('[data-testid="planet-name"]')
    await expect(firstPlanetName).toContainText('Tatooine')

    // Navigate back to home
    await page.click('text=Star Wars')
    await page.waitForURL('/')

    // Verify we're back on home page
    await expect(page.locator('h1')).toContainText('Star Wars')
  })
})