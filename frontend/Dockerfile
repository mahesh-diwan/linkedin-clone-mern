
Copy

# ============================================
# OPTIMIZED FRONTEND DOCKERFILE
# ============================================
# File: frontend/Dockerfile.prod

# Stage 1: Build with Node
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm ci

# Build arguments
ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Copy source code
COPY . .

# Build application
RUN npm run build

# Verify build output
RUN test -d /app/dist || (echo "Build failed: dist directory not found" && exit 1)

# ============================================
# Stage 2: Production Nginx Server
# ============================================
FROM nginx:1.25-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy optimized nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/run/nginx

# Run as non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
