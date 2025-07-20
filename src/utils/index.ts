import type { SortOrder } from '@/types'

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Sort array of objects by a specific field
 */
export function sortBy<T>(
  array: T[],
  field: keyof T,
  order: SortOrder = 'asc'
): T[] {
  if (!array || !Array.isArray(array)) return []

  return [...array].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Filter array by search query (case insensitive)
 */
export function filterByName<T extends { name: string }>(
  array: T[],
  query: string
): T[] {
  if (!array || !Array.isArray(array)) return []
  if (!query) return array

  const lowerQuery = query.toLowerCase()
  return array.filter(
    item => item && item.name && item.name.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Extract ID from SWAPI URL
 */
export function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? matches[1] : ''
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return 'Unknown'
  }
}

/**
 * Calculate total pages from total items and items per page
 */
export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  return Math.ceil(totalItems / itemsPerPage)
}
