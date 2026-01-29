
# ============================================
# OPTIMIZED BACKEND DOCKERFILE
# ============================================
# File: backend/Dockerfile.prod

# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# ============================================
# Stage 2: Build/Runtime
# ============================================
FROM node:18-alpine

WORKDIR /app

# Create non-root user and group
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    mkdir -p /app/logs && \
    chown -R appuser:appgroup /app

# Copy node_modules from deps stage
COPY --from=deps --chown=appuser:appgroup /app/node_modules ./node_modules

# Copy application code
COPY --chown=appuser:appgroup . .

# Install curl for health checks
RUN apk add --no-cache curl

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Use node as entrypoint for proper signal handling
ENTRYPOINT ["node"]

# Start application
CMD ["server.js"]
