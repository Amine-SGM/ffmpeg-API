# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Install FFmpeg
# The '-y' flag automatically confirms the installation
RUN apt-get update && apt-get install -y ffmpeg

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Make your app's port available to the outside world
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]
