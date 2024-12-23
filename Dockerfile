# Use the official Node.js image as the base image
FROM node:20.11-slim

# Set the working directory
WORKDIR /app

# Install only production dependencies by default
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV \
    PORT=4000 \
    LT='' \
    SUBDOMAIN='' \
    PROXY_URL='' \
    MFT_KEY='' \
    HST_KEY='' \
    WEBP_QUALITY=100

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Expose the port that the application will use
EXPOSE 4000 35729

# Define the command to run the application
CMD ["npm", "start"]
