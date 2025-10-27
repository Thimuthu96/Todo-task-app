FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Install dev dependencies for ts-node
RUN npm install --save-dev typescript ts-node nodemon

# Copy source code
COPY src ./src
COPY .env ./

# Copy tsconfig.json
COPY tsconfig.json ./

# Expose port
EXPOSE 3001

# Run dev mode
CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts,json", "--exec", "ts-node", "--files", "src/index.ts"]
