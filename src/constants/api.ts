export const API_BASE_URL = 'https://swapi.info/api'

export const API_ENDPOINTS = {
  PEOPLE: '/people',
  PLANETS: '/planets',
} as const

export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  DEFAULT_PAGE: 1,
} as const

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const
