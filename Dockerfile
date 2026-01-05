# Use official Node.js LTS image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments for public environment variables
ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ARG PUBLIC_SITE_URL
ARG PUBLIC_SITE_NAME
ARG PUBLIC_PHONE
ARG PUBLIC_EMAIL

# Accept build arguments for private environment variables
ARG OPENAI_API_KEY
ARG RESEND_API_KEY
ARG ADMIN_EMAIL

# Set environment variables for build
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_SITE_NAME=$PUBLIC_SITE_NAME
ENV PUBLIC_PHONE=$PUBLIC_PHONE
ENV PUBLIC_EMAIL=$PUBLIC_EMAIL
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV ADMIN_EMAIL=$ADMIN_EMAIL

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3005

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3005

# Start the application
CMD ["node", "build/index.js"]
