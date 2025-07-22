import type { ApiResponse, Person, Planet } from '@/types'
import { API_BASE_URL, API_ENDPOINTS, RETRY_CONFIG } from '@/constants/api'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  public async fetchWithRetry<T>(
    url: string,
    options?: Record<string, unknown>,
    retries: number = RETRY_CONFIG.MAX_RETRIES
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers as Record<string, string>),
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve =>
          setTimeout(resolve, RETRY_CONFIG.RETRY_DELAY)
        )
        return this.fetchWithRetry<T>(url, options, retries - 1)
      }
      throw error
    }
  }

  async getPeople(
    _page: number = 1,
    _search?: string
  ): Promise<ApiResponse<Person>> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PEOPLE}`
    console.log('Fetching people from:', url)

    const result = await this.fetchWithRetry<Person[]>(url)
    console.log('People API response:', result)

    // Return all data for client-side pagination
    const allItems = Array.isArray(result) ? result : []

    return {
      count: allItems.length,
      next: null,
      previous: null,
      results: allItems,
    }
  }

  async getPlanets(
    _page: number = 1,
    _search?: string
  ): Promise<ApiResponse<Planet>> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PLANETS}`
    console.log('Fetching planets from:', url)

    const result = await this.fetchWithRetry<Planet[]>(url)
    console.log('Planets API response:', result)

    // Return all data for client-side pagination
    const allItems = Array.isArray(result) ? result : []

    return {
      count: allItems.length,
      next: null,
      previous: null,
      results: allItems,
    }
  }

  async getPersonById(id: string): Promise<Person> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PEOPLE}/${id}`
    return this.fetchWithRetry<Person>(url)
  }

  async getPlanetById(id: string): Promise<Planet> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PLANETS}/${id}`
    return this.fetchWithRetry<Planet>(url)
  }
}

export const apiService = new ApiService()
export default apiService
