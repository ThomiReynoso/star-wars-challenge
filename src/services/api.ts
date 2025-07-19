import type { ApiResponse, Person, Planet } from '@/types'
import { API_BASE_URL, API_ENDPOINTS, RETRY_CONFIG } from '@/constants/api'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retries: number = RETRY_CONFIG.MAX_RETRIES
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
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

  async getPeople(page: number = 1, search?: string): Promise<ApiResponse<Person>> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PEOPLE}`
    console.log('Fetching people from:', url)
    
    const result = await this.fetchWithRetry<Person[]>(url)
    console.log('People API response:', result)
    
    // Transform array response to paginated format
    const itemsPerPage = 10
    const allItems = Array.isArray(result) ? result : []
    
    // Filter by search if provided
    let filteredItems = allItems
    if (search) {
      const lowerSearch = search.toLowerCase()
      filteredItems = allItems.filter(person => 
        person.name && person.name.toLowerCase().includes(lowerSearch)
      )
    }
    
    // Paginate results
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedResults = filteredItems.slice(startIndex, endIndex)
    
    return {
      count: filteredItems.length,
      next: endIndex < filteredItems.length ? `page=${page + 1}` : null,
      previous: page > 1 ? `page=${page - 1}` : null,
      results: paginatedResults
    }
  }

  async getPlanets(page: number = 1, search?: string): Promise<ApiResponse<Planet>> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PLANETS}`
    console.log('Fetching planets from:', url)
    
    const result = await this.fetchWithRetry<Planet[]>(url)
    console.log('Planets API response:', result)
    
    // Transform array response to paginated format
    const itemsPerPage = 10
    const allItems = Array.isArray(result) ? result : []
    
    // Filter by search if provided
    let filteredItems = allItems
    if (search) {
      const lowerSearch = search.toLowerCase()
      filteredItems = allItems.filter(planet => 
        planet.name && planet.name.toLowerCase().includes(lowerSearch)
      )
    }
    
    // Paginate results
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedResults = filteredItems.slice(startIndex, endIndex)
    
    return {
      count: filteredItems.length,
      next: endIndex < filteredItems.length ? `page=${page + 1}` : null,
      previous: page > 1 ? `page=${page - 1}` : null,
      results: paginatedResults
    }
  }

  async getPersonById(id: string): Promise<Person> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PEOPLE}/${id}/`
    return this.fetchWithRetry<Person>(url)
  }

  async getPlanetById(id: string): Promise<Planet> {
    const url = `${this.baseUrl}${API_ENDPOINTS.PLANETS}/${id}/`
    return this.fetchWithRetry<Planet>(url)
  }
}

export const apiService = new ApiService()
export default apiService