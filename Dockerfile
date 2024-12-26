# Stage 1: Build Angular 18 App
FROM node:21-alpine AS builder

WORKDIR /app

# Copy package files to install dependencies
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY src/ /app/src/
COPY public/ /app/public/ 
COPY tsconfig*.json /app/
COPY angular.json /app/

# Build the Angular app for production
RUN npm run build 

# Stage 3: Combine Angular and Node.js with NGINX
FROM nginx:alpine

# Copy the Angular build from the builder stage to NGINX
COPY --from=builder /app/dist/starter/browser /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/public 

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the necessary ports
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]