# Build stage
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173
# Build the React app
CMD [ "npm", "run", "dev", "--", "--host" ]