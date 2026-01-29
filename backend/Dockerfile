# Stage 1: Modules
FROM node:18-alpine AS modules
WORKDIR /app
COPY package*.json ./
# Install only production dependencies to keep it light
RUN npm install --omit=dev

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app

# Copy production node_modules from the first stage
COPY --from=modules /app/node_modules ./node_modules
# Copy the rest of your source code
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
