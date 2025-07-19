import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../api'
import type { Person, Planet } from '@/types'

// Mock fetch globally
const mockFetch = vi.fn()
Object.assign(globalThis, { fetch: mockFetch })

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchWithRetry', () => {
    it('should fetch data successfully on first try', async () => {
      const mockData = [{ name: 'Luke Skywalker' }]
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockData),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.fetchWithRetry('https://test.com/api')

      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith('https://test.com/api', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockData)
    })

    it('should retry on network failure and succeed', async () => {
      const mockData = [{ name: 'Luke Skywalker' }]
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }
      const mockSuccessResponse = {
        ok: true,
        json: () => Promise.resolve(mockData),
      }

      mockFetch
        .mockResolvedValueOnce(mockErrorResponse) // First call fails
        .mockResolvedValueOnce(mockSuccessResponse) // Second call succeeds

      const result = await apiService.fetchWithRetry('https://test.com/api')

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(result).toEqual(mockData)
    })

    it('should throw error after max retries', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }

      mockFetch.mockResolvedValue(mockErrorResponse)

      await expect(
        apiService.fetchWithRetry('https://test.com/api')
      ).rejects.toThrow('HTTP error! status: 500')

      expect(mockFetch).toHaveBeenCalledTimes(4) // Initial call + 3 retries
    })

    it('should handle network errors and retry', async () => {
      const networkError = new Error('Network error')
      const mockData = [{ name: 'Luke Skywalker' }]
      const mockSuccessResponse = {
        ok: true,
        json: () => Promise.resolve(mockData),
      }

      mockFetch
        .mockRejectedValueOnce(networkError) // First call throws network error
        .mockResolvedValueOnce(mockSuccessResponse) // Second call succeeds

      const result = await apiService.fetchWithRetry('https://test.com/api')

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(result).toEqual(mockData)
    })

    it('should throw network error after max retries', async () => {
      const networkError = new Error('Network error')

      mockFetch.mockRejectedValue(networkError)

      await expect(
        apiService.fetchWithRetry('https://test.com/api')
      ).rejects.toThrow('Network error')

      expect(mockFetch).toHaveBeenCalledTimes(4)
    })
  })

  describe('getPeople', () => {
    it('should fetch people data successfully', async () => {
      const mockPeopleData: Person[] = [
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
          url: 'https://swapi.info/api/people/1/',
        },
      ]

      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPeopleData),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPeople()

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.info/api/people', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual({
        count: 1,
        next: null,
        previous: null,
        results: mockPeopleData,
      })
    })

    it('should handle empty people response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(null),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPeople()

      expect(result).toEqual({
        count: 0,
        next: null,
        previous: null,
        results: [],
      })
    })

    it('should handle non-array people response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' }),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPeople()

      expect(result).toEqual({
        count: 0,
        next: null,
        previous: null,
        results: [],
      })
    })
  })

  describe('getPlanets', () => {
    it('should fetch planets data successfully', async () => {
      const mockPlanetsData: Planet[] = [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
          residents: [],
          films: [],
          created: '2014-12-09T13:50:49.641000Z',
          edited: '2014-12-20T20:58:18.411000Z',
          url: 'https://swapi.info/api/planets/1/',
        },
      ]

      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPlanetsData),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPlanets()

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.info/api/planets', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual({
        count: 1,
        next: null,
        previous: null,
        results: mockPlanetsData,
      })
    })

    it('should handle empty planets response', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve([]),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPlanets()

      expect(result).toEqual({
        count: 0,
        next: null,
        previous: null,
        results: [],
      })
    })
  })

  describe('getPersonById', () => {
    it('should fetch person by ID successfully', async () => {
      const mockPerson: Person = {
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
        url: 'https://swapi.info/api/people/1/',
      }

      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPerson),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await apiService.getPersonById('1')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.info/api/people/1/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      expect(result).toEqual(mockPerson)
    })

    it('should handle fetch error for person by ID', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      }

      mockFetch.mockResolvedValue(mockErrorResponse)

      await expect(apiService.getPersonById('999')).rejects.toThrow(
        'HTTP error! status: 404'
      )

      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.info/api/people/999/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    })
  })

  describe('Error handling edge cases', () => {
    it('should handle JSON parsing errors', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      }

      mockFetch.mockResolvedValueOnce(mockResponse)

      await expect(
        apiService.fetchWithRetry('https://test.com/api')
      ).rejects.toThrow()
    })

    it('should wait between retries', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }

      mockFetch.mockResolvedValue(mockErrorResponse)

      const startTime = Date.now()

      try {
        await apiService.fetchWithRetry('https://test.com/api')
      } catch (error) {
        // Expected to fail
      }

      const endTime = Date.now()
      const duration = endTime - startTime

      // Should have waited at least 2 seconds (2 retries * 1000ms delay)
      expect(duration).toBeGreaterThanOrEqual(1500) // Allow some margin for test execution
    })
  })
})
