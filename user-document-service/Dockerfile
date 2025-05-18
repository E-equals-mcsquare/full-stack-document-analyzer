# 1. Use Node base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY ./user-document-service/package*.json ./
RUN npm install

# 4. Copy the rest of the app
COPY ./user-document-service .

# 5. Build the TypeScript code
RUN npm run build

# 6. Expose port
EXPOSE 8001

# 7. Start the server
CMD ["node", "dist/index.js"]
