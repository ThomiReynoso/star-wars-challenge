import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePeople } from '../usePeople'
import { apiService } from '@/services/api'
import type { Person } from '@/types'

// Mock the API service
vi.mock('@/services/api', () => ({
  apiService: {
    getPeople: vi.fn()
  }
}))

const mockPeople: Person[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.info/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.info/api/people/1/'
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    homeworld: 'https://swapi.info/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
    url: 'https://swapi.info/api/people/2/'
  },
  {
    name: 'R2-D2',
    height: '96',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    homeworld: 'https://swapi.info/api/planets/8/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:11:50.376000Z',
    edited: '2014-12-20T21:17:50.311000Z',
    url: 'https://swapi.info/api/people/3/'
  }
]

describe('usePeople', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with correct default values', () => {
    const { people, loading, pagination, search } = usePeople()

    expect(people.value).toEqual([])
    expect(loading.value.isLoading).toBe(false)
    expect(loading.value.error).toBe(null)
    expect(pagination.value.currentPage).toBe(1)
    expect(pagination.value.totalPages).toBe(1)
    expect(pagination.value.totalItems).toBe(0)
    expect(pagination.value.itemsPerPage).toBe(10)
    expect(search.value.query).toBe('')
    expect(search.value.sortBy).toBe('name')
    expect(search.value.sortOrder).toBe('asc')
  })

  it('should fetch people successfully', async () => {
    const mockResponse = {
      count: mockPeople.length,
      next: null,
      previous: null,
      results: mockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, people, loading, pagination } = usePeople()

    await fetchPeople()

    expect(apiService.getPeople).toHaveBeenCalledWith(1, '')
    expect(loading.value.isLoading).toBe(false)
    expect(loading.value.error).toBe(null)
    expect(people.value).toHaveLength(mockPeople.length)
    expect(pagination.value.totalItems).toBe(mockPeople.length)
    expect(pagination.value.totalPages).toBe(1) // 3 items with 10 per page = 1 page
  })

  it('should handle API errors', async () => {
    const errorMessage = 'Failed to fetch people'
    vi.mocked(apiService.getPeople).mockRejectedValueOnce(new Error(errorMessage))

    const { fetchPeople, loading } = usePeople()

    await fetchPeople()

    expect(loading.value.isLoading).toBe(false)
    expect(loading.value.error).toBe(errorMessage)
  })

  it('should filter people by search query', async () => {
    const mockResponse = {
      count: mockPeople.length,
      next: null,
      previous: null,
      results: mockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, searchPeople, people } = usePeople()

    // First fetch all people
    await fetchPeople()
    expect(people.value).toHaveLength(3)

    // Then search for "Luke"
    searchPeople('Luke')
    
    // Wait for debounce to complete
    await new Promise(resolve => setTimeout(resolve, 350))
    
    // Should only return Luke Skywalker
    expect(people.value).toHaveLength(1)
    expect(people.value[0].name).toBe('Luke Skywalker')
  })

  it('should sort people correctly', async () => {
    const mockResponse = {
      count: mockPeople.length,
      next: null,
      previous: null,
      results: mockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, sortPeople, people } = usePeople()

    // First fetch all people
    await fetchPeople()

    // Sort by name descending
    sortPeople('name', 'desc')

    // Should be sorted by name descending: R2-D2, Luke Skywalker, C-3PO
    const names = people.value.map(p => p.name)
    expect(names).toEqual(['R2-D2', 'Luke Skywalker', 'C-3PO'])
  })

  it('should handle pagination correctly', async () => {
    // Create more mock data to test pagination
    const largeMockPeople = Array.from({ length: 25 }, (_, i) => ({
      ...mockPeople[0],
      name: `Person ${i + 1}`,
      url: `https://swapi.info/api/people/${i + 1}/`
    }))

    const mockResponse = {
      count: largeMockPeople.length,
      next: null,
      previous: null,
      results: largeMockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, goToPage, people, pagination } = usePeople()

    // First fetch all people
    await fetchPeople()

    expect(pagination.value.totalItems).toBe(25)
    expect(pagination.value.totalPages).toBe(3) // 25 items with 10 per page = 3 pages
    expect(people.value).toHaveLength(10) // First page should have 10 items

    // Go to page 2
    goToPage(2)
    expect(pagination.value.currentPage).toBe(2)
    expect(people.value).toHaveLength(10) // Second page should have 10 items

    // Go to page 3
    goToPage(3)
    expect(pagination.value.currentPage).toBe(3)
    expect(people.value).toHaveLength(5) // Third page should have 5 items
  })

  it('should not allow invalid page navigation', async () => {
    const mockResponse = {
      count: mockPeople.length,
      next: null,
      previous: null,
      results: mockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, goToPage, pagination } = usePeople()

    await fetchPeople()

    const initialPage = pagination.value.currentPage

    // Try to go to invalid pages
    goToPage(0) // Too low
    expect(pagination.value.currentPage).toBe(initialPage)

    goToPage(999) // Too high
    expect(pagination.value.currentPage).toBe(initialPage)
  })

  it('should reset to page 1 when searching', async () => {
    // Create enough mock data for multiple pages
    const largeMockPeople = Array.from({ length: 25 }, (_, i) => ({
      ...mockPeople[0],
      name: `Person ${i + 1}`,
      url: `https://swapi.info/api/people/${i + 1}/`
    }))

    const mockResponse = {
      count: largeMockPeople.length,
      next: null,
      previous: null,
      results: largeMockPeople
    }

    vi.mocked(apiService.getPeople).mockResolvedValueOnce(mockResponse)

    const { fetchPeople, goToPage, searchPeople, pagination } = usePeople()

    await fetchPeople()

    // Go to page 2
    goToPage(2)
    expect(pagination.value.currentPage).toBe(2)

    // Search should reset to page 1
    searchPeople('Person 1')
    
    // Wait for debounce to complete
    await new Promise(resolve => setTimeout(resolve, 350))
    
    expect(pagination.value.currentPage).toBe(1)
  })
})