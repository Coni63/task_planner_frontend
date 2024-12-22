# Stage 1: Build Angular 18 App
FROM node:21-alpine AS builder

# Install Angular CLI globally
RUN npm install -g @angular/cli@18.0.0

WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app for production
RUN npm run build -- --output-path=dist --configuration=production

# Stage 3: Combine Angular and Node.js with NGINX
FROM nginx:alpine

# Copy the Angular build from the builder stage to NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /usr/local/nginx/conf

# Expose the necessary ports
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]