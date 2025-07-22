// Base API Response Types
export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// People Types
export interface Person {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

// Planet Types
export interface Planet {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

// UI State Types
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface SearchState {
  query: string
  sortBy: 'name' | 'created'
  sortOrder: 'asc' | 'desc'
}

// Generic Types
export type SortOrder = 'asc' | 'desc'
export type SortField = 'name' | 'created'

export interface TableColumn {
  key: string
  label: string
  sortable: boolean
}
