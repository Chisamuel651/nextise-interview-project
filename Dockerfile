# Use Node.js image for building and running the app
FROM node:18-alpine AS builder


# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install all dependencies (development + production)
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Build the application using npm (generates a production-ready build)
RUN npm run build

# Production stage: Create a smaller image to serve the app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Install only production dependencies to keep the image lightweight
RUN npm install --only=production

# Expose the port your Next.js application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]