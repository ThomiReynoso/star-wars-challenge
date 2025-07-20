# NPM Installation Issues & Solutions

## Problem
Local development has npm cache permission issues causing `npm ci` to fail.

## Error Messages
```
EACCES: permission denied, mkdir '/Users/user/.npm/_cacache/...'
Your cache folder contains root-owned files
```

## Solutions

### 1. Use Temporary Cache (Recommended for Local Development)
```bash
npm ci --cache /tmp/npm-cache
# or use the script:
npm run ci:install
```

### 2. Fix NPM Cache Permissions (Permanent Fix)
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

### 3. Alternative: Remove and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## CI/CD Impact
- **GitHub Actions**: Uses clean environment, no issues expected
- **Local Development**: Use `npm run ci:install` for clean installs
- **Regular Development**: Use `npm install` for normal package management

## Available Scripts
- `npm run ci:install` - Clean install with temporary cache
- `npm install` - Regular install for development
- `npm ci` - Standard clean install (may fail locally)

## Prevention
- Avoid using `sudo npm install` 
- Use nvm/Node version manager instead of system Node.js
- Regularly clean npm cache: `npm cache clean --force`