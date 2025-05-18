# Use the official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY ./frontend .

# Build the app
RUN npm run build

# --- Production image ---
# Serve using NGINX
FROM nginx:alpine AS runner

# Remove default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX config
COPY ./frontend/default.conf /etc/nginx/conf.d/default.conf

# Copy exported site from builder
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
