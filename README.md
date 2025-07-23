# Star Wars Challenge

A Vue 3 application for exploring Star Wars characters and planets data with search, filtering, and sorting capabilities.

![Vue.js](https://img.shields.io/badge/Vue.js-3.4-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## Live Demos

- **Production**: [https://star-wars-challenge-production.netlify.app](https://star-wars-challenge-production.netlify.app)
- **Staging**: [https://star-wars-challenge-staging.netlify.app](https://star-wars-challenge-staging.netlify.app)

## Features

- Search and filter characters and planets
- Sortable table views with pagination
- Individual detail pages for characters and planets
- Responsive design
- Full keyboard navigation and accessibility support
- Docker setup for local development

## Setup and Installation

### Prerequisites
- Node.js 20+
- npm 10+

### Getting Started

```bash
# Clone and install
git clone https://github.com/ThomiReynoso/star-wars-challenge.git
cd star-wars-challenge
npm install

# Run development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

### Available Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Lint and fix code
npm run type-check   # TypeScript checking
```

## Testing

```bash
# Unit tests with Vitest
npm test
npm run test:coverage    # With coverage report

# E2E tests with Playwright
npm run test:e2e
npx playwright show-report  # Check e2e report 
```

The project includes comprehensive tests for components, composables, and API services with good coverage on critical modules.

## Docker Development

```bash
# Build the app first
npm run build

# Run with Docker Compose
docker-compose up --build -d
```

Access the app at [http://localhost:8080](http://localhost:8080). Includes Nginx configuration with proper SPA routing support.

## Architectural Decisions

### State Management Strategy

**Decision**: Vue 3 Composition API with composables instead of Vuex/Pinia

**Rationale**:
- The application scope doesn't justify a full state management library
- Composables provide excellent TypeScript integration and type inference
- Better testability - each composable can be tested in isolation
- Leverages Vue's native reactivity system without additional abstractions
- Easier to understand and maintain

**Implementation**:
```typescript
// usePeople.ts - Centralized people data management
export function usePeople() {
  const people = ref<Person[]>([])
  const loading = ref<LoadingState>({ isLoading: false, error: null })
  
  const fetchPeople = async (options?: FetchOptions) => {
    loading.value = { isLoading: true, error: null }
    try {
      const response = await apiService.getPeople(options)
      people.value = response.results
    } catch (error) {
      loading.value = { isLoading: false, error: error.message }
    }
  }
  
  return { people, loading, fetchPeople, /* other methods */ }
}
```

**Trade-offs**:
- ✅ Less boilerplate than Vuex/Pinia
- ✅ Better TypeScript experience
- ❌ No dev tools integration
- ❌ Less structure for larger applications

---

### Styling Approach

**Decision**: SCSS with design system patterns over CSS-in-JS or utility frameworks

**Rationale**:
- No runtime overhead compared to CSS-in-JS solutions
- Better IDE support and autocomplete than utility classes
- Centralized design tokens enable consistent theming
- SCSS mixins provide reusable patterns for common UI elements
- Easier to implement accessibility requirements (focus states, contrast)

**Implementation Structure**:
```scss
// Design tokens in _variables.scss
$primary-color: #4299e1;
$text-color: #e2e8f0;
$spacing-base: 0.25rem;

// Reusable patterns in _mixins.scss
@mixin button-base {
  padding: calc($spacing-base * 2) calc($spacing-base * 4);
  border-radius: 6px;
  transition: all 0.2s ease;
}

@mixin focus-visible {
  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}
```

**Benefits**:
- Consistent visual language across components
- Easy to maintain and update design tokens
- Good performance (no runtime CSS generation)
- Excellent accessibility support

---

### API Layer Architecture

**Decision**: Service layer pattern with centralized error handling

**Rationale**:
- Separation of concerns - UI components don't need to know about API implementation details
- Centralized error handling and retry logic
- Easy to mock for testing
- Type safety with TypeScript interfaces
- Future-proof if API changes or we need to add caching

**Implementation**:
```typescript
// api.ts - Service layer
class ApiService {
  private async fetchWithRetry<T>(
    fetchFn: () => Promise<Response>,
    maxRetries = 3
  ): Promise<T> {
    // Retry logic with exponential backoff
  }

  async getPeople(options?: FetchOptions): Promise<ApiResponse<Person[]>> {
    return this.fetchWithRetry(() => 
      fetch(`${API_BASE_URL}/people/?${buildQueryString(options)}`)
    )
  }
}

export const apiService = new ApiService()
```

**Data Flow**:
```
Component → Composable → API Service → SWAPI
    ↓           ↓           ↓           ↓
  Display ← State Update ← Transform ← Raw Data
```

**Advantages**:
- Clean separation between business logic and data fetching
- Consistent error handling across the app
- Easy to extend with caching, request deduplication, etc.
- Testable in isolation

---

### Component Organization

**Decision**: Feature-based folder structure with atomic design principles

**Rationale**:
- Easier to locate related files (component + styles + tests)
- Scales better than grouping by file type
- Clear boundaries between features
- Reusable components are easily identifiable

**Structure**:
```
src/components/
├── common/           # Reusable UI components
│   ├── Pagination.vue
│   ├── SearchInput.vue
│   └── LoadingSpinner.vue
├── people/          # People-specific components
│   ├── PeopleTable.vue
│   └── PersonDetail.vue
└── planets/         # Planets-specific components
    ├── PlanetTable.vue
    └── PlanetDetail.vue
```

**Component Communication**:
- Props down for data
- Events up for actions
- Composables for shared state
- Minimal prop drilling

---

### TypeScript Configuration

**Decision**: Strict TypeScript with comprehensive type coverage

**Configuration**:
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noImplicitReturns": true
}
```

**Benefits**:
- Catch errors at compile time
- Better IDE experience with autocomplete
- Self-documenting code through interfaces
- Safer refactoring

**Key Interfaces**:
```typescript
interface Person {
  name: string
  height: string
  mass: string
  gender: string
  birth_year: string
  homeworld: string
  url: string
  created: string
}

interface LoadingState {
  isLoading: boolean
  error: string | null
}
```

---

### Build Tool Selection

**Decision**: Vite over Webpack/Create React App

**Rationale**:
- Significantly faster development server startup
- Hot Module Replacement (HMR) is nearly instantaneous
- Modern ESM-based development
- Optimized production builds with Rollup
- Great TypeScript support out of the box

**Configuration highlights**:
- Source maps enabled for debugging
- Manual chunks for better caching
- Modern browser targets for smaller bundles

## Project Structure

```
src/
├── components/          # Vue components organized by feature
├── composables/         # Business logic and state management
├── services/           # API and external service integrations
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
├── views/              # Page-level components
├── router/             # Vue Router configuration
└── assets/styles/      # Global styles and SCSS files
```

## API Integration

The app integrates with [SWAPI](https://swapi.info/) to fetch Star Wars data:

- `GET /people/` - Character listings with pagination
- `GET /people/{id}/` - Individual character details
- `GET /planets/` - Planet listings with pagination
- `GET /planets/{id}/` - Individual planet details

Error handling includes retry logic for failed requests and user-friendly error messages.

## Accessibility

The application follows WCAG 2.1 AA guidelines:

- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- Sufficient color contrast ratios
- Skip links for navigation
- Focus management on route changes

## Design iteration

### First mock
<img width="1384" height="758" alt="image" src="https://github.com/user-attachments/assets/6dbb7111-c5f6-4663-828d-dd5a7eb9ea58" />

<img width="1381" height="739" alt="image" src="https://github.com/user-attachments/assets/2c1d1164-c282-4039-922d-a73c4c6d8b1f" />

### Second mock
<img width="1373" height="756" alt="image" src="https://github.com/user-attachments/assets/4523765b-1c2d-4bf4-a174-cc49bb4b6874" />

### Third mock
<img width="1047" height="772" alt="image" src="https://github.com/user-attachments/assets/2bd63326-4e64-4f2f-9c5b-5ded321a3b4c" />

### Final mock
<img width="1137" height="877" alt="image" src="https://github.com/user-attachments/assets/e293268b-fd09-473a-9787-b9f378c4479d" />

<img width="1201" height="880" alt="image" src="https://github.com/user-attachments/assets/f751fae0-7c20-4a80-8456-3dc13270d116" />

<img width="1135" height="855" alt="image" src="https://github.com/user-attachments/assets/da543792-35d7-4125-8fcd-7766fe711927" />


## License

This project is licensed under the MIT License.
