# Test Coverage Setup

## Current Status
Test coverage is currently disabled due to dependency installation issues with `@vitest/coverage-v8`.

## To Enable Coverage

### 1. Install Coverage Dependencies
```bash
npm install --save-dev @vitest/coverage-v8@^1.0.0
```

### 2. Update CI Workflow
In `.github/workflows/ci.yml`, change:
```yaml
- name: Run unit tests
  run: npm test -- --run
```

To:
```yaml
- name: Run unit tests
  run: npm test -- --coverage
```

### 3. Enable Coverage Upload
Uncomment the coverage upload section in CI:
```yaml
- name: Upload coverage reports
  uses: codecov/codecov-action@v3
  if: always()
  with:
    file: ./coverage/lcov.info
    flags: unittests
    name: codecov-umbrella
```

## Available Scripts
- `npm run test:coverage` - Run tests with coverage (once dependency is installed)
- `npm test -- --run` - Run tests without coverage (current CI setup)

## Coverage Configuration
Coverage is already configured in `vitest.config.ts`:
- Provider: v8
- Reporters: text, lcov, html
- Excludes: config files, type definitions, main.ts

## Files Excluded from Coverage
- `node_modules/**`
- `dist/**`
- `tests/e2e/**`
- `**/*.config.{js,ts}`
- `**/*.d.ts`
- `src/main.ts`
- `src/env.d.ts`