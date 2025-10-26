FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build the React app
RUN npm run build

# ============================================
# STAGE 2: PRODUCTION STAGE
# ============================================
# Start fresh with lightweight nginx image
# This image only contains nginx (10MB), not Node!
FROM nginx:alpine

# Copy nginx configuration
# This tells nginx how to serve the React app
# Without this, React routing (React Router) won't work properly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
# --from=builder: Reference the "builder" stage from above
# /app/build: Folder created by "npm run build" in builder stage
# /usr/share/nginx/html: Where nginx serves files from
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
# This tells Docker the container listens on port 80
# (doesn't actually expose it, just documentation)
EXPOSE 80

# Start nginx
# "daemon off;" keeps nginx running in foreground
# Important: Docker needs a foreground process, not background daemon
CMD ["nginx", "-g", "daemon off;"]

# ============================================
# LEARNING: What Happens When Built
# ============================================
# 1. docker build -t web:latest .
#    ↓
# 2. Stage 1 (builder):
#    - Download node:20-alpine (80MB)
#    - COPY package*.json
#    - RUN npm ci (installs 200+ packages)
#    - COPY . . (your source code)
#    - RUN npm run build (creates /app/build)
#    - Image size: 500MB (but will be discarded!)
#    ↓
# 3. Stage 2 (final):
#    - Download nginx:alpine (10MB)
#    - COPY nginx.conf
#    - COPY --from=builder /app/build /usr/share/nginx/html
#      (takes only the 5MB built files)
#    - EXPOSE 80
#    - Final size: 15MB ✓
#
# 4. Old builder image is automatically discarded
#    You only have the final 15MB image!

# ============================================
# LEARNING: Why This Structure?
# ============================================
# Benefits:
# 1. Small Image: Final image is 15MB, not 515MB
# 2. Fast Startup: nginx starts instantly
# 3. No Build Tools: Attacker can't use npm/node to hack
# 4. Production Ready: Optimized for serving static files
# 5. Caching: Dependencies cached if package.json unchanged

# Comparison:
# Single Stage: npm install + code + build tools = 515MB
# Multi-Stage: Only built files + nginx = 15MB
# Savings: 97% size reduction! 🎉