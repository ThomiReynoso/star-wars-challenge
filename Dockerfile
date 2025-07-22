# Production stage - serve pre-built files
FROM nginx:alpine

# Copy pre-built app to nginx (build locally first)
COPY dist /usr/share/nginx/html

# Copy nginx config (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]