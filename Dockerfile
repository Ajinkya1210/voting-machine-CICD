# Step 1: Use a lightweight Node.js image
FROM node:18-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files first (better for Docker caching)
COPY package*.json ./

# Step 4: Install only production dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code
# This includes app.js and the 'public' folder
COPY . .

# Step 6: Expose the port your app listens on
EXPOSE 3000

# Step 7: Run the application
CMD ["node", "app.js"]